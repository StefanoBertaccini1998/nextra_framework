import React from 'react';
import { Button } from '../../components/common/Button';
import {
  Cog6ToothIcon,
  BellIcon,
  UserCircleIcon,
  KeyIcon,
  ShieldCheckIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

export const SettingsPage: React.FC = () => {
  const settingsSections = [
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your account details and preferences',
      icon: UserCircleIcon,
      items: [
        {
          id: 'profile',
          title: 'Profile Information',
          description: 'Update your profile details and photo'
        },
        {
          id: 'password',
          title: 'Password',
          description: 'Change your password and security settings'
        },
        {
          id: 'preferences',
          title: 'Preferences',
          description: 'Set your application preferences and defaults'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Configure how you want to be notified',
      icon: BellIcon,
      items: [
        {
          id: 'email',
          title: 'Email Notifications',
          description: 'Choose which emails you want to receive'
        },
        {
          id: 'app',
          title: 'App Notifications',
          description: 'Manage your in-app notification preferences'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Enhance your account security',
      icon: ShieldCheckIcon,
      items: [
        {
          id: '2fa',
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account'
        },
        {
          id: 'sessions',
          title: 'Active Sessions',
          description: 'View and manage your active sessions'
        },
        {
          id: 'activity',
          title: 'Security Activity',
          description: 'Review your recent security activity'
        }
      ]
    }
  ];

  const [activeSection, setActiveSection] = React.useState('account');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-text">Settings</h1>
          <p className="text-text-secondary mt-1">Manage your account and application settings</p>
        </div>
        <Button variant="primary">Save Changes</Button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <nav className="w-64 shrink-0">
          <div className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg 
                    ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-text hover:bg-background'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  {section.title}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {settingsSections
            .find((section) => section.id === activeSection)
            ?.items.map((item) => (
              <div
                key={item.id}
                className="bg-surface p-6 rounded-lg shadow space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-text">{item.title}</h3>
                    <p className="text-text-secondary mt-1">{item.description}</p>
                  </div>
                  <Button variant="ghost">Edit</Button>
                </div>

                {/* Example form fields - you'll need to customize these based on the setting type */}
                <div className="space-y-4 pt-4">
                  {item.id === 'profile' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">
                          Display Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
                          placeholder="your@email.com"
                        />
                      </div>
                    </>
                  )}

                  {item.id === 'password' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
                        />
                      </div>
                    </>
                  )}

                  {item.id === '2fa' && (
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheckIcon className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium text-text">Two-Factor Authentication</p>
                          <p className="text-sm text-text-secondary">Not configured</p>
                        </div>
                      </div>
                      <Button variant="primary">Configure</Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};