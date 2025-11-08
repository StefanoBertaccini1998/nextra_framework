import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'line' | 'enclosed' | 'pill';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'line',
  className = '',
}) => {
  const variantStyles = {
    line: {
      list: 'border-b border-border',
      tab: (isActive: boolean) =>
        `px-4 py-2 -mb-px border-b-2 ${
          isActive
            ? 'border-primary text-primary'
            : 'border-transparent text-textSecondary hover:text-text hover:border-borderHover'
        }`,
    },
    enclosed: {
      list: 'border-b border-border',
      tab: (isActive: boolean) =>
        `px-4 py-2 rounded-t-lg ${
          isActive
            ? 'bg-surface border border-b-0 border-border text-text'
            : 'text-textSecondary hover:text-text hover:bg-surfaceHover'
        }`,
    },
    pill: {
      list: 'gap-2',
      tab: (isActive: boolean) =>
        `px-4 py-2 rounded-full ${
          isActive
            ? 'bg-primary text-white'
            : 'text-textSecondary hover:text-text hover:bg-surfaceHover'
        }`,
    },
  };

  return (
    <div className={className}>
      {/* Tab List */}
      <div
        role="tablist"
        className={`flex items-center ${variantStyles[variant].list}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`flex items-center gap-2 transition-colors font-medium ${variantStyles[
              variant
            ].tab(activeTab === tab.id)}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          className="py-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};