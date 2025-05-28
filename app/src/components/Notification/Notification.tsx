"use client";

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import React from "react"; // Required for React.ReactElement typing

export type NotificationType = "success" | "error" | "info" | "warning";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const removalQueue = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      removalQueue.current.forEach(clearTimeout);
    };
  }, []);

  const notify = (message: string, type: NotificationType = "info") => {
    const id = crypto.randomUUID();
    setNotifications((prev) => [...prev, { id, message, type }]);

    const timeoutId = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      removalQueue.current = removalQueue.current.filter(
        (t) => t !== timeoutId
      );
    }, 4000 + notifications.length * 300);

    removalQueue.current.push(timeoutId);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const iconMap: Record<NotificationType, React.ReactElement> = {
    success: <CheckCircle className="text-emerald-400" size={20} />,
    error: <AlertCircle className="text-rose-400" size={20} />,
    info: <Info className="text-sky-400" size={20} />,
    warning: <AlertTriangle className="text-yellow-400" size={20} />,
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <motion.div
        className="fixed bottom-4 right-4 z-50 flex flex-col-reverse space-y-2 space-y-reverse"
        initial={false}
        animate="animate"
        exit="exit"
        layout
      >
        <AnimatePresence initial={false}>
          {notifications.map((n, index) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              className={clsx(
                "flex items-start gap-3 px-4 py-3 rounded-xl border w-80 shadow-xl backdrop-blur-md bg-neutral-900/90",
                {
                  "border-emerald-500/30": n.type === "success",
                  "border-rose-500/30": n.type === "error",
                  "border-sky-500/30": n.type === "info",
                  "border-yellow-400/30": n.type === "warning",
                }
              )}
            >
              <div className="pt-0.5">{iconMap[n.type]}</div>
              <span className="flex-1 text-sm text-zinc-200">{n.message}</span>
              <button
                onClick={() => removeNotification(n.id)}
                title="Close notification"
                aria-label="Close notification"
                className="opacity-80 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-zinc-400 hover:text-white" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </NotificationContext.Provider>
  );
};
