import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { QuickAction, type QuickActionItem } from '../components/common/QuickAction/QuickAction';

export const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <img src="/assets/logo/icon/nextra-icon.svg" alt="Nextra" className="w-8 h-8" />
          <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Welcome Card */}
          <motion.div
            className="bg-surface rounded-lg shadow p-6 col-span-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-medium text-text mb-2">Welcome to Nextra</h2>
            <p className="text-text-secondary">
              This is your dashboard. Here you'll find an overview of your properties,
              clients, and important metrics. Use the sidebar to navigate to different sections.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Quick Actions */}
          <motion.div 
            className="bg-surface rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-medium text-text mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {([
                { icon: 'plus' as const, label: 'Add New Item', variant: 'primary' as const },
                { icon: 'team' as const, label: 'Manage Team', variant: 'primary' as const },
                { icon: 'reports' as const, label: 'View Reports', variant: 'primary' as const }
              ]).map((action, index) => (
                <QuickAction
                  key={action.label}
                  action={action}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            className="bg-surface rounded-lg shadow p-6 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-medium text-text mb-4">Recent Activity</h3>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              {[
                { time: '2h ago', text: 'New feature added' },
                { time: '4h ago', text: 'System update completed' },
                { time: '1d ago', text: 'Database optimization finished' }
              ].map((activity, index) => (
                <motion.div
                  key={activity.text}
                  className="flex justify-between items-center border-b border-border pb-4 last:border-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <span className="text-text">{activity.text}</span>
                  <span className="text-sm text-text-secondary">{activity.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};