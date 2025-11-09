import React, { useState } from 'react';
import { useFetch, useMutation } from '../hooks/useApi';
import { DataTable } from '../components/common/DataTable';
import { DetailView } from '../components/common/DetailView';
import { Button } from '../components/common/Button';
import { ApiClient } from '../services/api';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

export function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const { data: clients = [], isLoading, error } = useFetch<Client[]>(
    apiClient,
    `/clients?sort=${sortColumn},${sortDirection}`
  );

  const { mutate: deleteClient, isLoading: isDeleting } = useMutation<void, void>(
    apiClient,
    `/clients/${selectedClient?.id}`,
    'delete'
  );

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone' },
    {
      key: 'status',
      header: 'Status',
      render: (client: Client) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            client.status === 'active'
              ? 'bg-success/20 text-success'
              : 'bg-error/20 text-error'
          }`}
        >
          {client.status}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (client: Client) => new Date(client.createdAt).toLocaleDateString()
    }
  ];

  const detailFields = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status' },
    {
      key: 'createdAt',
      label: 'Created At',
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  if (error) {
    return (
      <div className="p-4 text-error">
        Error loading clients: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">Clients</h1>
        <Button variant="primary">Add Client</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        <DataTable
          data={clients}
          columns={columns}
          isLoading={isLoading}
          onRowClick={setSelectedClient}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
          className="bg-surface"
        />

        {selectedClient && (
          <DetailView
            data={selectedClient}
            fields={detailFields}
            title="Client Details"
            actions={
              <>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteClient()}
                  disabled={isDeleting}
                  className="text-error hover:bg-error/10"
                >
                  Delete
                </Button>
              </>
            }
          />
        )}
      </div>
    </div>
  );
}