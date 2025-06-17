import React from "react";

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
  className,
}) => {
  const active = tabs.find((tab) => tab.key === activeTab);
  return (
    <div className={className}>
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-6 py-1 font-semibold rounded-t-lg transition-all duration-200 focus:outline-none text-base shadow-sm
              ${
                activeTab === tab.key
                  ? "bg-[var(--card-background)] text-white shadow-lg z-10"
                  : "bg-gray-900 text-gray-400 hover:text-blue-300 hover:bg-gray-800 border-b-2 border-transparent"
              }
            `}
            onClick={() => setActiveTab(tab.key)}
            type="button"
            style={{
              boxShadow:
                activeTab === tab.key ? "0 2px 16px 0 #2563eb55" : undefined,
              marginBottom: 0,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="space-y-2 px-4 py-3 bg-[var(--card-background)] rounded-tr-lg rounded-bl-lg rounded-br-lg">
        {active?.heading && (
          <h3 className="text-gray-400 mb-2" style={{ margin: 0 }}>
            {active.heading}
          </h3>
        )}
        {active?.subheading && (
          <div className="text-sm text-gray-400 mb-3">{active.subheading}</div>
        )}
        {active?.content}
      </div>
    </div>
  );
};

export default Tabs;
