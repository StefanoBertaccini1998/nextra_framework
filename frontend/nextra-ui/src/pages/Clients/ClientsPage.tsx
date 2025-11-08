import React from 'react';
import { Button } from '../../components/common/Button';

export const ClientsPage: React.FC = () => {
  const clients = [
    {
      id: 1,
      name: 'Tech Innovators Inc.',
      email: 'contact@techinnovators.com',
      properties: 3,
      status: 'active',
      contractEnd: '2025-12-20'
    },
    {
      id: 2,
      name: 'Global Retail Solutions',
      email: 'business@globalretail.com',
      properties: 2,
      status: 'active',
      contractEnd: '2025-12-21'
    },
    {
      id: 3,
      name: 'Creative Studios Co.',
      email: 'hello@creativestudios.com',
      properties: 1,
      status: 'pending',
      contractEnd: '2025-12-22'
    },
    {
      id: 4,
      name: 'Data Analytics Pro',
      email: 'info@dataanalytics.com',
      properties: 4,
      status: 'active',
      contractEnd: '2025-12-23'
    },
    {
      id: 5,
      name: 'Startup Hub Ltd.',
      email: 'admin@startuphub.com',
      properties: 2,
      status: 'inactive',
      contractEnd: '2025-12-24'
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-text">Clients</h1>
          <p className="text-text-secondary mt-1">Manage your client relationships</p>
        </div>
        <Button variant="primary">Add Client</Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface rounded-lg shadow p-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search clients..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
        />
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text">
          <option>All Properties</option>
          <option>1-2 Properties</option>
          <option>3+ Properties</option>
        </select>
      </div>

      {/* Clients Table */}
      <div className="bg-surface rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Properties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Contract Until
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-background/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-lg">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text">
                          {client.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-text">{client.properties} properties</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {new Date(client.contractEnd).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
          <span className="font-medium">12</span> results
        </p>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Previous</Button>
          <Button variant="primary" size="sm">1</Button>
          <Button variant="ghost" size="sm">2</Button>
          <Button variant="ghost" size="sm">3</Button>
          <Button variant="ghost" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};