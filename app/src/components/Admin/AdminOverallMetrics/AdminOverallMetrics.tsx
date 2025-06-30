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

  return (
    <div className="flex flex-col gap-8 mb-8">
      {Object.entries(metrics).map(([key, metric]) => {
        const formattedData = metric.history.map(([timestamp, val]) => ({
          time: new Date(timestamp * 1000).toLocaleTimeString(),
          value: parseFloat(val),
        }));

        return (
          <Card key={key} className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {metricLabels[key] || key}
              </h3>
              <div className="text-2xl font-bold">
                {metric.current
                  ? parseFloat(metric.current).toLocaleString()
                  : "N/A"}
              </div>
            </div>
            {formattedData.length > 0 && (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formattedData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#38bdf8"
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
  );
}
