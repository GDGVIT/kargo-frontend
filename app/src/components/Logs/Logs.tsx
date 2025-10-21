'use client';

import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaSearch } from 'react-icons/fa';
import { Input, Select, Loader } from '@/components/ui';
import api from '@/utils/api';
import type LogsProps from '@/types/Application/LogsProps/LogsProps';

function generateProfessionalHSLColor(pod: string): string {
  let hash = 0;
  for (let i = 0; i < pod.length; i++) {
    hash = pod.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 45%, 20%)`;
}

export default function Logs({ id }: LogsProps) {
  const [logs, setLogs] = useState<Array<{ timestamp: string; pod: string; line: string }>>([]);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string>('');
  const [podColorMap, setPodColorMap] = useState<Record<string, string>>({});
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedPod, setSelectedPod] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const logsRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!id) return;

    setLogs([]);
    setError('');
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
        setLogs((prev) => [...prev, { timestamp: '', pod: '', line: e.data }]);
      }
    };

    es.onerror = () => {
      setConnected(false);
      setError('Connection lost or log stream ended.');
      es.close();
    };

    return () => {
      es.close();
    };
  }, [id]);

  useEffect(() => {
    if (logsRef.current) {
      if (logs.length === 1) {
        logsRef.current.scrollTop = logsRef.current.scrollHeight;
        setShowScrollButton(false);
        setIsAutoScroll(true);
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = logsRef.current;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
      if (isAutoScroll) {
        logsRef.current.scrollTop = logsRef.current.scrollHeight;
      }
      setShowScrollButton(!isAtBottom);
    }
  }, [logs, isAutoScroll]);

  const handleScroll = () => {
    if (logsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = logsRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
      setShowScrollButton(!isAtBottom);
      setIsAutoScroll(isAtBottom);
    }
  };

  const scrollToBottom = () => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
      setShowScrollButton(false);
      setIsAutoScroll(true);
    }
  };

  function getLogTextColor(line: string): string {
    if (/error|fail|exception/i.test(line)) return 'text-red-500';
    if (/warn/i.test(line)) return 'text-yellow-400';
    if (/info/i.test(line)) return 'text-blue-400';
    if (/debug/i.test(line)) return 'text-purple-400';
    return 'text-white';
  }

  function getPodStyle(pod: string): React.CSSProperties {
    const bg = podColorMap[pod];
    return bg ? { backgroundColor: bg } : {};
  }

  const podList = Object.keys(podColorMap);

  function getLogLevel(line: string): string {
    if (/error|fail|exception/i.test(line)) return 'error';
    if (/warn/i.test(line)) return 'warn';
    if (/info/i.test(line)) return 'info';
    if (/debug/i.test(line)) return 'debug';
    return 'other';
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !searchText ||
      log.line.toLowerCase().includes(searchText.toLowerCase()) ||
      log.pod.toLowerCase().includes(searchText.toLowerCase());
    const matchesPod = selectedPod === 'all' || log.pod === selectedPod;
    const matchesLevel = selectedLevel === 'all' || getLogLevel(log.line) === selectedLevel;
    return matchesSearch && matchesPod && matchesLevel;
  });

  const podOptions = [
    { value: 'all', label: 'All Pods' },
    ...podList.map((pod) => ({ value: pod, label: pod })),
  ];
  const levelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'error', label: 'Error' },
    { value: 'warn', label: 'Warn' },
    { value: 'info', label: 'Info' },
    { value: 'debug', label: 'Debug' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="mx-auto p-6 bg-[var(--card-background)] rounded-lg shadow-md border border-gray-800 max-w-6xl w-full">
        <div className="flex flex-row gap-2 mb-4 items-center w-full">
          <Input
            type="text"
            placeholder="Search logs..."
            value={searchText}
            onChange={setSearchText}
            icon={<FaSearch className="text-gray-400" />}
            className="flex-1 min-w-[160px]"
            aria-label="Search logs"
          />
          <Select
            value={selectedPod}
            onChange={setSelectedPod}
            options={podOptions}
            placeholder="All Pods"
            className="min-w-[140px]"
          />
          <Select
            value={selectedLevel}
            onChange={setSelectedLevel}
            options={levelOptions}
            placeholder="All Levels"
            className="min-w-[120px]"
          />
        </div>

        {!connected && !error ? (
          <Loader />
        ) : error ? (
          <div className="mb-2 text-sm text-red-400 text-center">{error}</div>
        ) : null}
        <div
          ref={logsRef}
          className="bg-gray-700 rounded overflow-auto h-[75vh] text-xs font-mono flex flex-col gap-1 p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 relative"
          onScroll={handleScroll}
        >
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, idx) => (
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
                <span className={`${getLogTextColor(log.line)} flex-1 break-words`}>
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
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            aria-label="Scroll to bottom"
          >
            <FaArrowDown size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
