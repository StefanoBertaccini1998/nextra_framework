import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="bg-surface rounded-lg shadow p-6 col-span-full">
          <h2 className="text-lg font-medium text-text mb-2">Welcome to Nextra</h2>
          <p className="text-text-secondary">
            This is your dashboard. Here you'll find an overview of your properties,
            clients, and important metrics. Use the sidebar to navigate to different sections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-surface rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-text mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors">
              ➕ Add New Property
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors">
              👤 Add New Client
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-surface-hover text-text-secondary transition-colors">
              📊 Generate Report
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface rounded-lg shadow p-6 md:col-span-2">
          <h3 className="text-lg font-medium text-text mb-4">Recent Activity</h3>
          <p className="text-text-secondary text-center py-8">
            Your recent activity will appear here
          </p>
        </div>
      </div>
    </div>
  );
};