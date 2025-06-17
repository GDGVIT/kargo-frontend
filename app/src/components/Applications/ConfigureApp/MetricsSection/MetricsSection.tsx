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
import axios from "../../../../utils/api";

interface PodMetric {
  pod: string;
  cpu: number;
  memory: number;
  time: string;
  network?: number;
}

const WINDOW_OPTIONS = [
  { label: "15s", value: 15 },
  { label: "1min", value: 60 },
  { label: "5min", value: 300 },
  { label: "All", value: -1 },
];

const MetricsSection: React.FC<{ appId: string }> = ({ appId }) => {
  const [metrics, setMetrics] = useState<PodMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState<number>(15); // default 15s
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setMetrics([]);
    // Poll every 1s
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
          if (windowSize > 0) {
            return updated.slice(-windowSize);
          }
          return updated;
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

  // Custom dark mode recharts theme
  const chartTheme = {
    axis: {
      stroke: "#888",
      tick: { fill: "#bbb" },
    },
    grid: {
      stroke: "#444",
    },
    tooltip: {
      backgroundColor: "#222",
      color: "#fff",
      border: "1px solid #444",
    },
    legend: {
      color: "#eee",
    },
  };

  // Group metrics by pod for multi-line chart
  const pods = Array.from(new Set(metrics.map((m) => m.pod)));
  // Use only the latest fetch for running pods count
  const latestMetrics = metrics.length > 0 ? metrics.slice(-pods.length) : [];
  const runningPodsCount = new Set(latestMetrics.map((m) => m.pod)).size;

  return (
    <div className="mb-8 p-12 rounded-2xl transition-colors duration-300 w-full min-h-[80vh] flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Application Metrics
        </h2>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
          <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            Running Pods: <span className="font-bold">{runningPodsCount}</span>
          </span>
          <div>
            <label
              className="mr-4 text-lg text-gray-400"
              htmlFor="metrics-window-select"
            >
              Window:
            </label>
            <select
              id="metrics-window-select"
              aria-label="Select time window"
              value={windowSize}
              onChange={(e) => setWindowSize(Number(e.target.value))}
              className="bg-gray-800 text-gray-100 border border-gray-700 rounded px-4 py-2 text-lg"
            >
              {WINDOW_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="text-2xl text-gray-400 dark:text-gray-500 mt-24">
          Loading metrics...
        </div>
      ) : metrics.length === 0 ? (
        <div className="text-2xl text-gray-400 dark:text-gray-500 mt-24">
          No metrics available
        </div>
      ) : (
        <div className="flex flex-col gap-16 w-full max-w-4xl">
          <div className="h-[400px] w-full">
            <h3 className="font-semibold mb-4 text-2xl text-gray-800 dark:text-gray-200">
              CPU Usage (mCPU)
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
                  tick={{ fill: chartTheme.axis.tick.fill, fontSize: 16 }}
                />
                <YAxis
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill, fontSize: 16 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltip.backgroundColor,
                    color: chartTheme.tooltip.color,
                    border: chartTheme.tooltip.border,
                    fontSize: 16,
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: chartTheme.legend.color,
                    fontSize: 18,
                  }}
                />
                {pods.map((pod) => (
                  <Line
                    key={pod}
                    type="monotone"
                    dataKey="cpu"
                    data={metrics.filter((m) => m.pod === pod)}
                    name={pod}
                    stroke="#4f8cff"
                    strokeWidth={3}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[400px] w-full">
            <h3 className="font-semibold mb-4 text-2xl text-gray-800 dark:text-gray-200">
              Memory Usage (MiB)
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
                  tick={{ fill: chartTheme.axis.tick.fill, fontSize: 16 }}
                />
                <YAxis
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill, fontSize: 16 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltip.backgroundColor,
                    color: chartTheme.tooltip.color,
                    border: chartTheme.tooltip.border,
                    fontSize: 16,
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: chartTheme.legend.color,
                    fontSize: 18,
                  }}
                />
                {pods.map((pod) => (
                  <Line
                    key={pod}
                    type="monotone"
                    dataKey="memory"
                    data={metrics.filter((m) => m.pod === pod)}
                    name={pod}
                    stroke="#82e299"
                    strokeWidth={3}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[400px] w-full">
            <h3 className="font-semibold mb-4 text-2xl text-gray-800 dark:text-gray-200">
              Network Traffic (Mbps)
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
                  tick={{ fill: chartTheme.axis.tick.fill, fontSize: 16 }}
                />
                <YAxis
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill, fontSize: 16 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltip.backgroundColor,
                    color: chartTheme.tooltip.color,
                    border: chartTheme.tooltip.border,
                    fontSize: 16,
                  }}
                />
                <Legend
                  wrapperStyle={{
                    color: chartTheme.legend.color,
                    fontSize: 18,
                  }}
                />
                {/* No network data yet */}
                <Line
                  type="monotone"
                  dataKey="network"
                  stroke="#ffc658"
                  strokeWidth={3}
                  dot={false}
                  name="Network (not available)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsSection;
