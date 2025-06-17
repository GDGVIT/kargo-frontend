import React, { useEffect, useState } from "react";
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
}

const MetricsSection: React.FC<{ appId: string }> = ({ appId }) => {
  const [metrics, setMetrics] = useState<PodMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/applications/${appId}/metrics`);
        // Optionally, add a timestamp or format for recharts
        const now = Date.now();
        const formatted = (data.metrics || []).map(
          (m: { pod: string; cpu: number; memory: number }, i: number) => ({
            ...m,
            time: new Date(
              now - (data.metrics.length - 1 - i) * 5 * 60 * 1000
            ).toLocaleTimeString(),
          })
        );
        setMetrics(formatted);
      } catch {
        setMetrics([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, [appId]);

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

  return (
    <div className="mb-8 p-6 rounded-lg transition-colors duration-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Application Metrics
      </h2>
      {loading ? (
        <div className="text-gray-400 dark:text-gray-500">
          Loading metrics...
        </div>
      ) : metrics.length === 0 ? (
        <div className="text-gray-400 dark:text-gray-500">
          No metrics available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              CPU Usage (mCPU)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={metrics}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartTheme.grid.stroke}
                />
                <XAxis
                  dataKey="time"
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill }}
                />
                <YAxis
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltip.backgroundColor,
                    color: chartTheme.tooltip.color,
                    border: chartTheme.tooltip.border,
                  }}
                />
                <Legend wrapperStyle={{ color: chartTheme.legend.color }} />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#4f8cff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Memory Usage (MiB)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={metrics}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartTheme.grid.stroke}
                />
                <XAxis
                  dataKey="time"
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill }}
                />
                <YAxis
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltip.backgroundColor,
                    color: chartTheme.tooltip.color,
                    border: chartTheme.tooltip.border,
                  }}
                />
                <Legend wrapperStyle={{ color: chartTheme.legend.color }} />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#82e299"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
              Network Traffic (Mbps)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={metrics}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={chartTheme.grid.stroke}
                />
                <XAxis
                  dataKey="time"
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill }}
                />
                <YAxis
                  stroke={chartTheme.axis.stroke}
                  tick={{ fill: chartTheme.axis.tick.fill }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltip.backgroundColor,
                    color: chartTheme.tooltip.color,
                    border: chartTheme.tooltip.border,
                  }}
                />
                <Legend wrapperStyle={{ color: chartTheme.legend.color }} />
                <Line
                  type="monotone"
                  dataKey="network"
                  stroke="#ffc658"
                  strokeWidth={2}
                  dot={false}
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
