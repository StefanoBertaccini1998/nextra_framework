import { useEffect, useState } from 'react';
import { DetailView, Button } from '@nextra/ui-lib';
import { useToast } from '../components/common/ToastProvider';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchClients, deleteClient as deleteClientThunk, setSelectedClient, createClient as createClientThunk } from '../store/slices/clientsSlice';
import type { Client } from '../store/slices/clientsSlice';
import { ClientForm } from '../components/forms/ClientForm';
import OffCanvas from '../components/common/OffCanvas';

export function ClientsPage() {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const { clients, selectedClient, loading, error, sortColumn, sortDirection } = useAppSelector(
    (state) => state.clients
  );

  // Fetch clients on mount and when sort changes
  useEffect(() => {
    dispatch(fetchClients({ sortColumn, sortDirection }))
      .unwrap()
      .catch((err) => {
        addToast('error', 'Failed to load clients', err.message || 'Connection error');
      });
  }, [dispatch, sortColumn, sortDirection, addToast]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      addToast('error', 'Failed to load clients', error);
    }
  }, [error, addToast]);

  const handleDeleteClient = async () => {
    if (!selectedClient) return;
    
    try {
      await dispatch(deleteClientThunk(selectedClient.id)).unwrap();
      addToast('success', 'Client deleted', 'The client was successfully deleted');
    } catch (err: any) {
      addToast('error', 'Failed to delete client', err.message || 'Delete failed');
    }
  };

  const handleCreateClient = async (values: Partial<Client>) => {
    try {
      await dispatch(createClientThunk(values as any)).unwrap();
      addToast('success', 'Client created', 'The client was successfully created');
      setShowCreateModal(false);
      // Refresh the list
      dispatch(fetchClients({ sortColumn, sortDirection }));
    } catch (err: any) {
      addToast('error', 'Failed to create client', err.message || 'Create failed');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'fiscalId', label: 'Fiscal ID' },
    { key: 'address', label: 'Address' },
    { key: 'preferredBudgetMin', label: 'Budget Min', render: (client: Client) => `€${client.preferredBudgetMin?.toLocaleString() || 'N/A'}` },
    { key: 'preferredBudgetMax', label: 'Budget Max', render: (client: Client) => `€${client.preferredBudgetMax?.toLocaleString() || 'N/A'}` },
    { key: 'createdAt', label: 'Created', render: (client: Client) => new Date(client.createdAt).toLocaleDateString() }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">Clients</h1>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>Add Client</Button>
      </div>

      {/* Inline error banner as a visible fallback when toast isn't visible */}
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 6, marginTop: 8 }}>
          Failed to load clients: {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        {/* Render table or placeholder when empty/error */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {(!clients || clients.length === 0) ? (
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
                    {clients.map((row) => (
                      <tr key={row.id} onClick={() => dispatch(setSelectedClient(row))} className={'cursor-pointer hover:bg-gray-50'}>
                        {columns.map((c) => (
                          <td key={c.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {c.render ? c.render(row) : (row as any)[c.key]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {selectedClient && (
          <DetailView title="Client Details">
            <div className="space-y-3">
              <div><strong>Name:</strong> {selectedClient.name}</div>
              <div><strong>Email:</strong> {selectedClient.email}</div>
              <div><strong>Phone:</strong> {selectedClient.phone}</div>
              <div><strong>Fiscal ID:</strong> {selectedClient.fiscalId}</div>
              <div><strong>Address:</strong> {selectedClient.address}</div>
              <div><strong>Budget Range:</strong> €{selectedClient.preferredBudgetMin?.toLocaleString()} - €{selectedClient.preferredBudgetMax?.toLocaleString()}</div>
              <div><strong>Preferred Locations:</strong> {selectedClient.preferredLocations || 'N/A'}</div>
              <div><strong>Preferred Types:</strong> {selectedClient.preferredPropertyTypes || 'N/A'}</div>
              <div><strong>Size Range:</strong> {selectedClient.preferredSizeMin}m² - {selectedClient.preferredSizeMax}m²</div>
              {selectedClient.notes && <div><strong>Notes:</strong> {selectedClient.notes}</div>}
              <div><strong>Created:</strong> {new Date(selectedClient.createdAt).toLocaleDateString()}</div>

              <div className="flex gap-2 pt-3">
                <Button variant="primary" size="sm">Edit</Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDeleteClient}
                  disabled={loading}
                  className="text-error hover:bg-error/10"
                >
                  Delete
                </Button>
              </div>
            </div>
          </DetailView>
        )}
      </div>

      {/* Create Client Modal */}
      <OffCanvas
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Client"
      >
        <ClientForm
          onSubmit={handleCreateClient}
          onCancel={() => setShowCreateModal(false)}
          loading={loading}
        />
      </OffCanvas>
    </div>
  );
}