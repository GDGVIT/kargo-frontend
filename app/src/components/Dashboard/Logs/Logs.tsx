"use client";

import { useEffect, useRef, useState } from "react";
import api from "../../../utils/api";
import type LogsProps from "../../../types/Application/LogsProps/LogsProps";

export default function Logs({ id }: LogsProps) {
  const [logs, setLogs] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>("");
  const logsRef = useRef<HTMLPreElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!id) return;
    setLogs("");
    setError("");
    setConnected(false);

    const url = api.getUri({ url: `/api/applications/${id}/logs` });

    const es = new EventSource(url, {
      withCredentials: true,
    } as EventSourceInit);
    eventSourceRef.current = es;
    es.onopen = () => setConnected(true);
    es.onmessage = (e) => {
      setLogs((prev) => prev + e.data + "\n");
    };
    es.onerror = () => {
      setConnected(false);
      setError("Connection lost or log stream ended.");
      es.close();
    };
    return () => {
      es.close();
    };
  }, [id]);

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  function getLogLineColor(line: string) {
    if (/error|fail|exception/i.test(line)) return "text-red-400";
    if (/warn/i.test(line)) return "text-yellow-400";
    if (/info/i.test(line)) return "text-blue-400";
    if (/debug/i.test(line)) return "text-purple-400";
    return "text-green-400";
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto p-6 bg-gray-900 rounded-lg shadow-md mt-8 border border-gray-800 max-w-6xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-100 text-center">
          Application Logs
        </h1>
        <div className="mb-2 text-sm text-gray-400 text-center">
          {connected ? "Streaming logs..." : error || "Connecting..."}
        </div>
        <pre
          ref={logsRef}
          className="bg-gray-950 rounded p-4 overflow-auto h-96 text-xs border border-gray-800 font-mono"
        >
          {logs
            ? logs.split("\n").map((line, idx) =>
                line ? (
                  <span key={idx} className={getLogLineColor(line)}>
                    {line}
                    <br />
                  </span>
                ) : null
              )
            : "No logs yet."}
        </pre>
      </div>
    </div>
  );
}
