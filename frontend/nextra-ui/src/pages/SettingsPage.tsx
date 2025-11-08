import React from 'react';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text">Settings</h1>

      {/* Profile Section */}
      <div className="bg-surface rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-text mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text"
              defaultValue="john@example.com"
            />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-surface rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-text mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text font-medium">Email Notifications</h3>
              <p className="text-sm text-text-secondary">
                Receive email updates about your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text font-medium">Dark Mode</h3>
              <p className="text-sm text-text-secondary">
                Use dark theme for the interface
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
};