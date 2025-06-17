"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TabItem {
  key: string;
  label: React.ReactNode;
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (key: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  className = "",
}) => {
  const active = tabs.find((tab) => tab.key === activeTab);

  return (
    <div
      className={`flex flex-col md:flex-row w-full h-full rounded-xl overflow-hidden bg-gray-900 text-white min-h-[50vh] ${className}`}
    >
      <div className="flex md:flex-col bg-gray-800 md:min-w-[200px] w-full md:w-auto">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full px-4 py-3 text-left text-sm font-medium border-l-4 md:border-l-0 md:border-l-transparent transition-all
                ${
                  isActive
                    ? "bg-gray-700 text-blue-400 md:border-l-4 md:border-blue-500"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-[var(--card-background)] min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {active?.heading && (
              <h3 className="text-xl font-semibold" style={{ margin: 0 }}>
                {active.heading}
              </h3>
            )}
            {active?.subheading && (
              <p className="text-sm text-gray-400">{active.subheading}</p>
            )}
            <div>{active?.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;
