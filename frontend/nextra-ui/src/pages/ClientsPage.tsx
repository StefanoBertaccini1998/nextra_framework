import { useState, useEffect } from 'react';
import { useFetch, useMutation } from '../hooks/useApi';
import { DetailView, Button } from '@nextra/ui-lib';
import { useToast } from '../components/common/ToastProvider';
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
  const [sortColumn] = useState<string>('name');
  const [sortDirection] = useState<'asc' | 'desc'>('asc');
  const { addToast } = useToast();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (client: Client) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            client.status === 'active' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
          }`}
        >
          {client.status}
        </span>
      )
    },
    { key: 'createdAt', label: 'Created', render: (client: Client) => new Date(client.createdAt).toLocaleDateString() }
  ];

  const { data: clients = [], error, isLoading } = useFetch<Client[]>(
    apiClient,
    `/clients?sort=${sortColumn},${sortDirection}`,
    {
      onError: (err) => {
        addToast('error', 'Failed to load clients', (err as Error).message);
      }
    }
  );

  const { mutate: deleteClient, isLoading: isDeleting } = useMutation<void, void>(
    apiClient,
    `/clients/${selectedClient?.id}`,
    'delete',
    {
      onSuccess: () => {
        addToast('success', 'Client deleted', 'The client was successfully deleted');
        setSelectedClient(null);
      },
      onError: (err) => {
        addToast('error', 'Failed to delete client', (err as Error).message);
      }
    }
  );

  // Ensure we show an error toast if useFetch reports an error later
  useEffect(() => {
    if (error) addToast('error', 'Failed to load clients', error.message);
  }, [error, addToast]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">Clients</h1>
        <Button variant="primary">Add Client</Button>
      </div>

      {/* Inline error banner as a visible fallback when toast isn't visible */}
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 6, marginTop: 8 }}>
          Failed to load clients: {error.message}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        {/* Render table or placeholder when empty/error */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (!clients || clients.length === 0) ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" colSpan={columns.length}>
                    Empty data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((c) => (
                    <th key={c.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((row, i) => (
                  <tr key={i} onClick={() => setSelectedClient(row)} className={'cursor-pointer hover:bg-gray-50'}>
                    {columns.map((c) => (
                      <td key={c.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {c.render ? c.render(row as Client) : (row as any)[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedClient && (
          <DetailView title="Client Details">
            <div className="space-y-3">
              <div><strong>Name:</strong> {selectedClient.name}</div>
              <div><strong>Email:</strong> {selectedClient.email}</div>
              <div><strong>Phone:</strong> {selectedClient.phone}</div>
              <div><strong>Status:</strong> {selectedClient.status}</div>
              <div><strong>Created:</strong> {new Date(selectedClient.createdAt).toLocaleDateString()}</div>

              <div className="flex gap-2 pt-3">
                <Button variant="primary" size="sm">Edit</Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => deleteClient()}
                  disabled={isDeleting}
                  className="text-error hover:bg-error/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </DetailView>
        )}
      </div>
    </div>
  );
}