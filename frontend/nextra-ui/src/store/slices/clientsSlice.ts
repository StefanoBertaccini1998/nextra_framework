import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApiClient } from '@nextra/ui-lib';

// Define the Client type matching backend response
export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  fiscalId: string;
  address: string;
  preferredBudgetMin: number;
  preferredBudgetMax: number;
  preferredLocations: string;
  preferredPropertyTypes: string;
  preferredSizeMin: number;
  preferredSizeMax: number;
  notes: string;
  assignedAgent: any | null;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

// Backend API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Paginated response
export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// Define the slice state
export interface ClientsState {
  clients: Client[];
  selectedClient: Client | null;
  loading: boolean;
  error: string | null;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
  // Pagination
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLastPage: boolean;
}

const initialState: ClientsState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
  sortColumn: 'name',
  sortDirection: 'asc',
  page: 0,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  isLastPage: false,
};

// Create an API client instance
const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api'
});

// Async thunks for API calls
export const fetchClients = createAsyncThunk<
  { clients: Client[]; pagination: PagedResponse<Client> },
  { sortColumn?: string; sortDirection?: string; page?: number; size?: number }
>(
  'clients/fetchClients',
  async ({ sortColumn = 'name', sortDirection = 'asc', page = 0, size = 10 }) => {
    const response = await apiClient.get<ApiResponse<PagedResponse<Client>>>(
      `/clients?sort=${sortColumn},${sortDirection}&page=${page}&size=${size}`
    );
    return {
      clients: response.data.content,
      pagination: response.data,
    };
  }
);

export const createClient = createAsyncThunk<Client, Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy' | 'deleted'>>(
  'clients/createClient',
  async (clientData) => {
    // Map Client to ClientRequest DTO expected by backend
    const requestData: any = {
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      fiscalId: clientData.fiscalId,
      address: clientData.address,
      preferredBudgetMin: clientData.preferredBudgetMin,
      preferredBudgetMax: clientData.preferredBudgetMax,
      preferredLocations: clientData.preferredLocations,
      preferredPropertyTypes: clientData.preferredPropertyTypes,
      preferredSizeMin: clientData.preferredSizeMin,
      preferredSizeMax: clientData.preferredSizeMax,
      notes: clientData.notes,
    };

    // Only include assignedAgentId if it exists
    if (clientData.assignedAgent && typeof clientData.assignedAgent === 'object' && 'id' in clientData.assignedAgent) {
      requestData.assignedAgentId = clientData.assignedAgent.id;
    }

    const response = await apiClient.post<ApiResponse<Client>>('/clients/new', requestData);
    return response.data;
  }
);

export const updateClient = createAsyncThunk<Client, { id: number; data: Partial<Client> }>(
  'clients/updateClient',
  async ({ id, data }) => {
    // Map Client to ClientRequest DTO expected by backend
    const requestData: any = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      fiscalId: data.fiscalId,
      address: data.address,
      preferredBudgetMin: data.preferredBudgetMin,
      preferredBudgetMax: data.preferredBudgetMax,
      preferredLocations: data.preferredLocations,
      preferredPropertyTypes: data.preferredPropertyTypes,
      preferredSizeMin: data.preferredSizeMin,
      preferredSizeMax: data.preferredSizeMax,
      notes: data.notes,
    };

    // Only include assignedAgentId if it exists
    if (data.assignedAgent && typeof data.assignedAgent === 'object' && 'id' in data.assignedAgent) {
      requestData.assignedAgentId = data.assignedAgent.id;
    }

    const response = await apiClient.put<ApiResponse<Client>>(`/clients/${id}/update`, requestData);
    return response.data;
  }
);

export const deleteClient = createAsyncThunk<number, number>(
  'clients/deleteClient',
  async (id) => {
    await apiClient.delete(`/clients/${id}`);
    return id;
  }
);

// Create the slice
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClient: (state, action: PayloadAction<Client | null>) => {
      state.selectedClient = action.payload;
    },
    setSortColumn: (state, action: PayloadAction<string>) => {
      state.sortColumn = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch clients
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload.clients;
        state.page = action.payload.pagination.page;
        state.size = action.payload.pagination.size;
        state.totalElements = action.payload.pagination.totalElements;
        state.totalPages = action.payload.pagination.totalPages;
        state.isLastPage = action.payload.pagination.last;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clients';
      })

      // Create client
      .addCase(createClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create client';
      })

      // Update client
      .addCase(updateClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.clients.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
        if (state.selectedClient?.id === action.payload.id) {
          state.selectedClient = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update client';
      })

      // Delete client
      .addCase(deleteClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = state.clients.filter((c) => c.id !== action.payload);
        if (state.selectedClient?.id === action.payload) {
          state.selectedClient = null;
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete client';
      });
  },
});

export const { setSelectedClient, setSortColumn, setSortDirection, clearError } = clientsSlice.actions;
export default clientsSlice.reducer;
