'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab, className = '' }) => {
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
  const tabCount = tabs.length;

  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      <div className="relative border-b border-[#353A48]">
        <div className="flex">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 relative py-3 text-sm font-medium text-gray-300 transition-colors text-center hover:text-[color:var(--theme-blue)] focus:text-[color:var(--theme-blue)]"
                style={{
                  color: tab.key === activeTab ? 'var(--theme-blue)' : undefined,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#353A48] pointer-events-none z-0" />

        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute bottom-0 h-0.5 z-10"
          style={{
            width: `${100 / tabCount}%`,
            left: `${(100 / tabCount) * activeIndex}%`,
            backgroundColor: 'var(--theme-blue)',
          }}
        />
      </div>

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {tabs[activeIndex]?.heading && (
              <h3 className="text-xl font-semibold">{tabs[activeIndex].heading}</h3>
            )}
            {tabs[activeIndex]?.subheading && (
              <p className="text-sm text-gray-400">{tabs[activeIndex].subheading}</p>
            )}
            <div>{tabs[activeIndex]?.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export function useDefaultTab(
  tabs: TabItem[],
  activeTab?: string
): [string, (key: string) => void] {
  const [currentTab, setCurrentTab] = React.useState(
    activeTab || (tabs.length > 0 ? tabs[0].key : '')
  );
  React.useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setCurrentTab(tabs[0].key);
    }
  }, [activeTab, tabs]);
  return [currentTab, setCurrentTab];
}

export default Tabs;
