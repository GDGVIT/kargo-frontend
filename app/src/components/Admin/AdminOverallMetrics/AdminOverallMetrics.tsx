"use client";

import React, { useEffect, useState } from "react";
import axios from "../../../utils/api";
import Card from "../../ui/Card/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Color variables
const COLORS = {
  axis: "#64748b",
  grid: "gray",
  line: "#06b6d4",
  tooltipBg: "bg-gray-900",
  tooltipText: "text-gray-100",
  tooltipBorder: "border-gray-700",
  currentValue: "text-cyan-500",
  cardBorder: "var(--card-border,theme(colors.gray.700))",
};

const metricLabels: Record<string, string> = {
  cpu: "CPU Usage (cores)",
  memory: "Memory Usage (bytes)",
  pods: "Pod Count",
  storage: "Storage Usage (bytes)",
  network_rx: "Network Receive (bytes/sec)",
  network_tx: "Network Transmit (bytes/sec)",
  nodes: "Node Count",
  apiserver_uptime: "API Server Uptime (seconds)",
};

interface MetricHistory {
  current: string | null;
  history: [number, string][];
}

interface Metrics {
  [key: string]: MetricHistory;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`${COLORS.tooltipBg} ${COLORS.tooltipText} rounded-lg shadow-lg px-4 py-2 border ${COLORS.tooltipBorder} max-w-xs break-words`}
      >
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

export default function AdminOverallMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await axios.get("/api/metrics/overall");
        setMetrics(data.metrics);
      } catch {
        setMetrics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Card className="mb-8">Loading overall metrics...</Card>;
  if (!metrics) return <Card className="mb-8">Failed to load metrics.</Card>;

  // Group metrics for layout
  const metricGroups = [
    ["cpu", "memory", "storage"],
    ["pods", "nodes", "apiserver_uptime"],
    ["network_rx", "network_tx"],
  ];

  return (
    <div className="flex flex-col gap-8 mb-8">
      {metricGroups.map((group, rowIdx) => (
        <div
          key={rowIdx}
          className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full"
        >
          {group.map((key) => {
            const metric = metrics[key];
            if (!metric) return null;
            const formattedData = metric.history.map(([timestamp, val]) => ({
              time: new Date(timestamp * 1000).toLocaleTimeString(),
              value: Number(parseFloat(val).toFixed(2)),
            }));
            return (
              <Card
                key={key}
                className={`p-4 md:p-6 flex-1 text-primary border border-[${COLORS.cardBorder}] min-w-0`}
              >
                <div className="mb-4 flex flex-col gap-1">
                  <h3 className="text-base md:text-lg font-semibold text-primary truncate">
                    {metricLabels[key] || key}
                  </h3>
                  <div
                    className={`text-xl md:text-2xl font-bold ${COLORS.currentValue} truncate`}
                  >
                    {metric.current
                      ? Number(
                          parseFloat(metric.current).toFixed(2)
                        ).toLocaleString()
                      : "N/A"}
                  </div>
                </div>
                {formattedData.length > 0 && (
                  <div className="h-40 md:h-48 w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={formattedData}
                        style={{ background: "transparent", borderRadius: 12 }}
                      >
                        <XAxis
                          dataKey="time"
                          stroke={COLORS.axis}
                          tick={{ fill: COLORS.axis, fontSize: 10 }}
                          minTickGap={20}
                        />
                        <YAxis
                          stroke={COLORS.axis}
                          tick={{ fill: COLORS.axis, fontSize: 10 }}
                          tickFormatter={(val) => {
                            if (typeof val !== "number") return val;
                            const rounded = Number(val.toFixed(2));
                            if (Math.abs(rounded) >= 1e12)
                              return (rounded / 1e12).toFixed(2) + "T";
                            if (Math.abs(rounded) >= 1e9)
                              return (rounded / 1e9).toFixed(2) + "G";
                            if (Math.abs(rounded) >= 1e6)
                              return (rounded / 1e6).toFixed(2) + "M";
                            if (Math.abs(rounded) >= 1e3)
                              return (rounded / 1e3).toFixed(2) + "K";
                            return rounded.toLocaleString();
                          }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <CartesianGrid
                          stroke={COLORS.grid}
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={COLORS.line}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ))}
    </div>
  );
}
