import React from 'react';
import { Button } from '../../components/common/Button';

export const DashboardPage: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    {
      id: 1,
      name: 'Active Properties',
      value: '45',
      change: '+5%',
      changeType: 'increase'
    },
    {
      id: 2,
      name: 'Total Clients',
      value: '182',
      change: '+12%',
      changeType: 'increase'
    },
    {
      id: 3,
      name: 'Pending Requests',
      value: '8',
      change: '-2%',
      changeType: 'decrease'
    },
    {
      id: 4,
      name: 'Revenue (MTD)',
      value: '$48,295',
      change: '+18%',
      changeType: 'increase'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'property_added',
      message: 'New property added: Luxury Villa',
      timestamp: '30 minutes ago',
      user: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'client_signed',
      message: 'New client contract signed',
      timestamp: '2 hours ago',
      user: 'Mike Chen'
    },
    {
      id: 3,
      type: 'maintenance_request',
      message: 'Maintenance request submitted for Property #1234',
      timestamp: '4 hours ago',
      user: 'Emily Davis'
    },
    {
      id: 4,
      type: 'payment_received',
      message: 'Payment received from Client #789',
      timestamp: '6 hours ago',
      user: 'System'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Property Inspection',
      dueDate: '2024-02-25',
      priority: 'high',
      assignee: 'John Smith'
    },
    {
      id: 2,
      title: 'Contract Renewal',
      dueDate: '2024-02-28',
      priority: 'medium',
      assignee: 'Lisa Wong'
    },
    {
      id: 3,
      title: 'Client Meeting',
      dueDate: '2024-03-01',
      priority: 'low',
      assignee: 'David Brown'
    }
  ];

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
        <p className="text-text-secondary mt-1">Welcome back! Here's your overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-surface p-6 rounded-lg shadow">
            <dt className="text-text-secondary text-sm">{stat.name}</dt>
            <dd className="mt-1">
              <div className="flex justify-between items-baseline">
                <div className="flex items-baseline text-2xl font-semibold text-text">
                  {stat.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-surface rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-text">Recent Activity</h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-border">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text truncate">
                          {activity.message}
                        </p>
                        <p className="text-sm text-text-secondary">
                          by {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Button variant="ghost" className="w-full">View all activity</Button>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-surface rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-text">Upcoming Tasks</h2>
              <Button variant="primary" size="sm">Add Task</Button>
            </div>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-border">
                {upcomingTasks.map((task) => (
                  <li key={task.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text truncate">
                          {task.title}
                        </p>
                        <div className="mt-1 flex items-center space-x-2 text-sm text-text-secondary">
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Assigned to {task.assignee}</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityBadgeClass(
                            task.priority
                          )}`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Button variant="ghost" className="w-full">View all tasks</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};