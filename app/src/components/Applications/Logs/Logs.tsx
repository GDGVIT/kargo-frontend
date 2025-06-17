"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import api from "../../../utils/api";
import type LogsProps from "../../../types/Application/LogsProps/LogsProps";

// Generate a dark professional HSL background from pod string
function generateProfessionalHSLColor(pod: string): string {
  let hash = 0;
  for (let i = 0; i < pod.length; i++) {
    hash = pod.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 45%, 20%)`; // dark, professional tone
}

export default function Logs({ id }: LogsProps) {
  const [logs, setLogs] = useState<
    Array<{ timestamp: string; pod: string; line: string }>
  >([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>("");
  const [podColorMap, setPodColorMap] = useState<Record<string, string>>({});
  const [showScrollButton, setShowScrollButton] = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!id) return;

    setLogs([]);
    setError("");
    setConnected(false);
    setPodColorMap({});

    const url = api.getUri({ url: `/api/applications/${id}/logs` });
    const es = new EventSource(url, {
      withCredentials: true,
    } as EventSourceInit);
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      const match = e.data.match(/^(\S+) \[(.+?)\] (.*)$/);
      if (match) {
        const [, timestamp, pod, line] = match;

        setPodColorMap((prev) => {
          if (!prev[pod]) {
            return { ...prev, [pod]: generateProfessionalHSLColor(pod) };
          }
          return prev;
        });

        setLogs((prev) => [...prev, { timestamp, pod, line }]);
      } else {
        setLogs((prev) => [...prev, { timestamp: "", pod: "", line: e.data }]);
      }
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
      // On initial load, always scroll to bottom
      if (logs.length === 1) {
        logsRef.current.scrollTop = logsRef.current.scrollHeight;
        setShowScrollButton(false);
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = logsRef.current;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10; // 10px threshold
      if (isAtBottom) {
        logsRef.current.scrollTop = logsRef.current.scrollHeight;
      }
      setShowScrollButton(!isAtBottom);
    }
  }, [logs]);

  // Show/hide scroll button on manual scroll
  const handleScroll = () => {
    if (logsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logsRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
      setShowScrollButton(!isAtBottom);
    }
  };

  const scrollToBottom = () => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
      setShowScrollButton(false);
    }
  };

  function getLogTextColor(line: string): string {
    if (/error|fail|exception/i.test(line)) return "text-red-500";
    if (/warn/i.test(line)) return "text-yellow-400";
    if (/info/i.test(line)) return "text-blue-400";
    if (/debug/i.test(line)) return "text-purple-400";
    return "text-white";
  }

  function getPodStyle(pod: string): React.CSSProperties {
    const bg = podColorMap[pod];
    return bg ? { backgroundColor: bg } : {};
  }

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto p-6 bg-[var(--card-background)] rounded-lg shadow-md border border-gray-800 max-w-6xl w-full">
        <div className="mb-2 text-sm text-gray-400 text-center">
          {connected ? "Streaming logs..." : error || "Connecting..."}
        </div>
        <div
          ref={logsRef}
          className="bg-gray-700 rounded overflow-auto h-96 text-xs font-mono flex flex-col gap-1 p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 relative"
          onScroll={handleScroll}
        >
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <div
                key={idx}
                className="w-full rounded px-2 py-1 flex items-start gap-2 break-words"
                style={getPodStyle(log.pod)}
              >
                {log.timestamp && (
                  <span className="min-w-[130px] font-medium whitespace-nowrap text-gray-400">
                    {log.timestamp}
                  </span>
                )}
                {log.pod && (
                  <span className="px-2 py-0.5 bg-white/20 text-white font-semibold rounded min-w-[120px] text-center">
                    {log.pod}
                  </span>
                )}
                <span
                  className={`${getLogTextColor(log.line)} flex-1 break-words`}
                >
                  {log.line}
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-400">No logs yet.</span>
          )}
        </div>
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-12 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            aria-label="Scroll to bottom"
          >
            <FaArrowDown size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
