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
import React from "react";

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
    success: (
      <CheckCircle className="text-emerald-400 drop-shadow-lg" size={24} />
    ),
    error: <AlertCircle className="text-rose-400 drop-shadow-lg" size={24} />,
    info: <Info className="text-sky-400 drop-shadow-lg" size={24} />,
    warning: (
      <AlertTriangle className="text-yellow-400 drop-shadow-lg" size={24} />
    ),
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-4"
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
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.08,
              }}
              className={clsx(
                "relative flex items-center gap-3 px-4 py-1.5 rounded-xl border w-96 shadow-2xl backdrop-blur-lg min-h-0 h-auto",
                "bg-[var(--card-background)] border border-opacity-40",
                {
                  "border-emerald-400/40": n.type === "success",
                  "border-rose-400/40": n.type === "error",
                  "border-sky-400/40": n.type === "info",
                  "border-yellow-400/40": n.type === "warning",
                }
              )}
              style={{ boxShadow: "var(--box-shadow-default)" }}
            >
              <div className="pt-0.5 flex-shrink-0">{iconMap[n.type]}</div>
              <span className="flex-1 text-base font-semibold text-[var(--foreground)] drop-shadow-sm">
                {n.message}
              </span>
              <button
                onClick={() => removeNotification(n.id)}
                title="Close notification"
                aria-label="Close notification"
                className="ml-2 rounded-full p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--text-link-color)] hover:bg-[var(--background)]/30 hover:scale-110"
              >
                <X className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </NotificationContext.Provider>
  );
};
