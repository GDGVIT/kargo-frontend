"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../../utils/api";
import Select from "../../../ui/Select/Select";
import Resources from "../../../../types/Application/Resources/Resources";

interface PodMetric {
  pod: string;
  cpu: number;
  memory: number;
  storage?: number;
  time: string;
}

const WINDOW_OPTIONS = [
  { label: "15s", value: "15" },
  { label: "1min", value: "60" },
  { label: "5min", value: "300" },
  { label: "All", value: "-1" },
];

interface MetricsSectionProps {
  appId: string;
  metricType?: "cpu" | "memory" | "storage";
  resources?: Resources; // <-- add resources prop
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
  appId,
  metricType = "cpu",
  resources,
}) => {
  const [metrics, setMetrics] = useState<PodMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState<string>("15");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setMetrics([]);
    async function fetchMetrics() {
      try {
        const { data } = await axios.get(`/api/applications/${appId}/metrics`);
        const now = Date.now();
        // Format time in 12-hour format with AM/PM based on user locale
        const timeStr = new Date(now).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const newMetrics: PodMetric[] = (data.metrics || []).map(
          (m: PodMetric) => ({
            ...m,
            time: timeStr,
          })
        );
        if (!isMounted) return;
        setMetrics((prev) => {
          const updated = [...prev, ...newMetrics];
          const win = parseInt(windowSize, 10);
          return win > 0 ? updated.slice(-win) : updated;
        });
        setLoading(false);
      } catch {
        if (!isMounted) return;
        setLoading(false);
      }
    }
    fetchMetrics();
    intervalRef.current = setInterval(fetchMetrics, 1000);
    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [appId, windowSize]);

  const chartTheme = {
    axis: { stroke: "#aaa", tick: { fill: "#ccc" } },
    grid: { stroke: "#444" },
    tooltip: {
      backgroundColor: "#222",
      color: "#fff",
      border: "1px solid #444",
    },
    legend: { color: "#ddd" },
  };

  const pods = Array.from(new Set(metrics.map((m) => m.pod)));
  const latestMetrics = metrics.length > 0 ? metrics.slice(-pods.length) : [];
  const runningPodsCount = new Set(latestMetrics.map((m) => m.pod)).size;

  const metricConfig = {
    cpu: { label: "CPU Usage (mCPU)", key: "cpu", color: "#4f8cff" },
    memory: { label: "Memory Usage (MiB)", key: "memory", color: "#82e299" },
    storage: { label: "Storage Usage (MiB)", key: "storage", color: "#ff7f50" },
  }[metricType];

  // Extract requests and limits for the selected metric
  let requestValue: number | undefined = undefined;
  let limitValue: number | undefined = undefined;
  let requestLabel = "";
  let limitLabel = "";
  if (resources) {
    if (metricType === "cpu") {
      if (resources.requests?.cpuMilli) {
        requestValue = Number(resources.requests.cpuMilli);
        requestLabel = `CPU Request (${resources.requests.cpuMilli})`;
      }
      if (resources.limits?.cpuMilli) {
        limitValue = Number(resources.limits.cpuMilli);
        limitLabel = `CPU Limit (${resources.limits.cpuMilli})`;
      }
    } else if (metricType === "memory") {
      if (resources.requests?.memoryMB) {
        requestValue = Number(resources.requests.memoryMB);
        requestLabel = `Memory Request (${resources.requests.memoryMB})`;
      }
      if (resources.limits?.memoryMB) {
        limitValue = Number(resources.limits.memoryMB);
        limitLabel = `Memory Limit (${resources.limits.memoryMB})`;
      }
    } else if (metricType === "storage") {
      if (resources.requests?.storageGB) {
        requestValue = Number(resources.requests.storageGB);
        requestLabel = `Storage Request (${resources.requests.storageGB})`;
      }
      if (resources.limits?.storageGB) {
        limitValue = Number(resources.limits.storageGB);
        limitLabel = `Storage Limit (${resources.limits.storageGB})`;
      }
    }
  }

  return (
    <div className="mb-8 px-6 md:px-12 py-10 rounded-2xl w-full min-h-[80vh] flex flex-col items-center animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 w-full max-w-7xl">
        <span className="text-xl text-gray-800 dark:text-gray-300 font-medium mb-4 md:mb-0">
          🟢 Running Pods: <span className="font-bold">{runningPodsCount}</span>
        </span>
        <div className="flex items-center space-x-3">
          <label
            className="text-lg text-gray-600 dark:text-gray-400"
            htmlFor="metrics-window-select"
          >
            Time Window:
          </label>
          <div className="min-w-[120px]">
            <Select
              value={windowSize}
              onChange={setWindowSize}
              options={WINDOW_OPTIONS}
              label={undefined}
              className="w-[120px]"
              aria-label="Time Window"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {loading ? (
          <motion.div
            className="text-2xl text-gray-400 dark:text-gray-500 mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading metrics...
          </motion.div>
        ) : metrics.length === 0 ? (
          <motion.div
            className="text-2xl text-gray-400 dark:text-gray-500 mt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No metrics available
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col gap-16 w-full max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-[400px] w-full">
              <h3 className="font-semibold mb-4 text-2xl text-gray-900 dark:text-gray-200">
                {metricConfig.label}
              </h3>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart
                  data={metrics}
                  margin={{ top: 20, right: 40, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={chartTheme.grid.stroke}
                  />
                  <XAxis
                    dataKey="time"
                    stroke={chartTheme.axis.stroke}
                    tick={{ fill: chartTheme.axis.tick.fill, fontSize: 14 }}
                  />
                  <YAxis
                    stroke={chartTheme.axis.stroke}
                    tick={{ fill: chartTheme.axis.tick.fill, fontSize: 14 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: chartTheme.tooltip.backgroundColor,
                      color: chartTheme.tooltip.color,
                      border: chartTheme.tooltip.border,
                      fontSize: 14,
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      color: chartTheme.legend.color,
                      fontSize: 16,
                    }}
                  />
                  {/* Reference lines for requests and limits */}
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
                  {pods.map((pod) => (
                    <Area
                      key={pod}
                      type="monotone"
                      dataKey={metricConfig.key}
                      data={metrics.filter((m) => m.pod === pod)}
                      name={pod}
                      stroke={metricConfig.color}
                      fill={metricConfig.color}
                      fillOpacity={0.25}
                      strokeWidth={3}
                      dot={false}
                    />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetricsSection;
