"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import axios from "../../../../utils/api";
import Select from "../../../ui/Select/Select";
import Resources from "../../../../types/Application/Resources/Resources";
import Loader from "../../../ui/Loader/Loader";
import type { TooltipProps } from "recharts";

const metricLabels: Record<string, string> = {
  cpu: "CPU Usage (cores)",
  memory: "Memory Usage (bytes)",
  storage: "Storage Usage (bytes)",
};

interface MetricHistory {
  current: string | null;
  history: [number, string][];
}

interface Metrics {
  [key: string]: MetricHistory;
}

interface MetricsSectionProps {
  appId: string;
  metricType?: "cpu" | "memory" | "storage";
  resources?: Resources;
}

const WINDOW_OPTIONS = [
  { label: "15min", value: "15" },
  { label: "1hr", value: "60" },
  { label: "All", value: "-1" },
];

const MetricsSection: React.FC<MetricsSectionProps> = ({
  appId,
  metricType = "cpu",
  resources,
}) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState<string>("60");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    async function fetchMetrics() {
      try {
        const { data } = await axios.get(`/api/applications/${appId}/metrics`);
        if (!isMounted) return;
        setMetrics(data.metrics);
      } catch {
        if (!isMounted) return;
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [appId]);

  // Extract requests and limits for the selected metric
  let requestValue: number | undefined = undefined;
  let limitValue: number | undefined = undefined;
  let requestLabel = "";
  let limitLabel = "";
  if (resources) {
    if (metricType === "cpu") {
      if (resources.requests?.cpuMilli) {
        requestValue = Number(resources.requests.cpuMilli) / 1000;
        requestLabel = `CPU Request (${resources.requests.cpuMilli}m)`;
      }
      if (resources.limits?.cpuMilli) {
        limitValue = Number(resources.limits.cpuMilli) / 1000;
        limitLabel = `CPU Limit (${resources.limits.cpuMilli}m)`;
      }
    } else if (metricType === "memory") {
      if (resources.requests?.memoryMB) {
        requestValue = Number(resources.requests.memoryMB) * 1024 * 1024;
        requestLabel = `Memory Request (${resources.requests.memoryMB} MiB)`;
      }
      if (resources.limits?.memoryMB) {
        limitValue = Number(resources.limits.memoryMB) * 1024 * 1024;
        limitLabel = `Memory Limit (${resources.limits.memoryMB} MiB)`;
      }
    } else if (metricType === "storage") {
      if (resources.requests?.storageGB) {
        requestValue =
          Number(resources.requests.storageGB) * 1024 * 1024 * 1024;
        requestLabel = `Storage Request (${resources.requests.storageGB} GiB)`;
      }
      if (resources.limits?.storageGB) {
        limitValue = Number(resources.limits.storageGB) * 1024 * 1024 * 1024;
        limitLabel = `Storage Limit (${resources.limits.storageGB} GiB)`;
      }
    }
  }

  // Prepare chart data
  const metric = metrics?.[metricType];
  let formattedData: { time: string; value: number }[] = [];
  if (metric?.history) {
    formattedData = metric.history.map(([timestamp, val]) => ({
      time: new Date(timestamp * 1000).toLocaleTimeString(),
      value: parseFloat(val),
    }));
    // Apply window size
    const win = parseInt(windowSize, 10);
    if (win > 0) {
      formattedData = formattedData.slice(-win);
    }
  }

  // Helper to format metric value with units
  function formatMetricValue(value: string | null, type: string): string {
    if (!value || isNaN(Number(value))) return "N/A";
    const num = parseFloat(value);
    if (type === "cpu") {
      // Show up to 3 decimal places for CPU cores
      return `${num.toLocaleString(undefined, {
        maximumFractionDigits: 3,
      })} cores`;
    } else if (type === "memory" || type === "storage") {
      // Convert bytes to MiB or GiB as appropriate
      if (num >= 1024 * 1024 * 1024) {
        return `${(num / (1024 * 1024 * 1024)).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} GiB`;
      } else if (num >= 1024 * 1024) {
        return `${(num / (1024 * 1024)).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} MiB`;
      } else if (num >= 1024) {
        return `${(num / 1024).toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} KiB`;
      } else {
        return `${num.toLocaleString()} bytes`;
      }
    }
    return num.toLocaleString();
  }

  // Custom dark themed tooltip for Recharts
  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-gray-100 rounded-lg shadow-lg px-4 py-2 border border-gray-700 max-w-xs break-words">
          <div className="font-semibold text-sm mb-1">{label}</div>
          {payload.map((entry, idx) => (
            <div key={idx} className="text-base">
              <span className="font-medium">{entry.name}: </span>
              <span>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-8 px-2 md:px-6 py-10 rounded-2xl w-full min-h-[60vh] flex flex-col items-center animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 w-full max-w-7xl">
        <span className="text-xl text-gray-800 dark:text-gray-300 font-medium mb-4 md:mb-0">
          <b>{metricLabels[metricType]}</b>
        </span>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <label
            className="text-lg text-gray-600 dark:text-gray-400 whitespace-nowrap mr-2"
            htmlFor="metrics-window-select"
          >
            Time Window:
          </label>
          <div className="flex-1 min-w-[100px] max-w-[160px]">
            <Select
              value={windowSize}
              onChange={setWindowSize}
              options={WINDOW_OPTIONS}
              label={undefined}
              className="w-full"
              aria-label="Time Window"
            />
          </div>
        </div>
      </div>
      <div className="mb-4 text-2xl font-bold">
        {formatMetricValue(metric?.current ?? null, metricType)}
      </div>
      <div className="h-64 w-full max-w-4xl">
        {loading ? (
          <Loader />
        ) : formattedData.length === 0 ? (
          <div className="text-2xl text-gray-400 dark:text-gray-500 mt-24">
            No metrics available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ left: 0, right: 0 }}>
              <XAxis
                dataKey="time"
                minTickGap={20}
                interval="preserveStartEnd"
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
              />
              {typeof requestValue === "number" && (
                <ReferenceLine
                  y={requestValue}
                  stroke="#fbbf24"
                  strokeDasharray="3 3"
                  label={{
                    value: requestLabel,
                    position: "right",
                    fill: "#fbbf24",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                />
              )}
              {typeof limitValue === "number" && (
                <ReferenceLine
                  y={limitValue}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{
                    value: limitLabel,
                    position: "right",
                    fill: "#ef4444",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MetricsSection;
