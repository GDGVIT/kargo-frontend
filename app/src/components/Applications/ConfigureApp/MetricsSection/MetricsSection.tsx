"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../../utils/api";
import Select from "../../../ui/Select/Select";

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
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
  appId,
  metricType = "cpu",
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
        const timeStr = new Date(now).toLocaleTimeString();
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
                <LineChart
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
                  {pods.map((pod) => (
                    <Line
                      key={pod}
                      type="monotone"
                      dataKey={metricConfig.key}
                      data={metrics.filter((m) => m.pod === pod)}
                      name={pod}
                      stroke={metricConfig.color}
                      strokeWidth={3}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetricsSection;
