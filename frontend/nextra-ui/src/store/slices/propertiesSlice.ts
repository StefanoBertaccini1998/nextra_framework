import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApiClient } from '@nextra/ui-lib';

const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

export type PropertyStatus = 'AVAILABLE' | 'SOLD' | 'RESERVED' | 'PENDING';
export type PropertyType = 'APARTMENT' | 'VILLA' | 'HOUSE' | 'LAND' | 'COMMERCIAL';

export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  size: number;
  location: string;
  address: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  yearBuilt?: number;
  features?: string;
  images?: string[];
  mainImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertiesState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

const initialState: PropertiesState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
  sortColumn: 'createdAt',
  sortDirection: 'desc',
};

// Async thunks
export const fetchProperties = createAsyncThunk<Property[], { sortColumn?: string; sortDirection?: 'asc' | 'desc'; page?: number; size?: number } | void>(
  'properties/fetchProperties',
  async (params) => {
    const { page = 0, size = 100 } = params || {};
    const response = await apiClient.get<{ data: { content: Property[] } }>(`/properties?page=${page}&size=${size}`);
    // Backend returns ApiResponse<PagedResponse<Property>>
    return response.data.content || [];
  }
);

export const fetchPropertyById = createAsyncThunk<Property, number>(
  'properties/fetchPropertyById',
  async (id: number) => {
    const response = await apiClient.get<{ data: Property }>(`/properties/${id}`);
    // Backend returns ApiResponse<Property>
    return response.data;
  }
);

export const createProperty = createAsyncThunk<Property, Partial<Property>>(
  'properties/createProperty',
  async (propertyData: Partial<Property>) => {
    const response = await apiClient.post<{ data: Property }>('/properties', propertyData);
    // Backend returns ApiResponse<Property>
    return response.data;
  }
);

export const updateProperty = createAsyncThunk<Property, { id: number; data: Partial<Property> }>(
  'properties/updateProperty',
  async ({ id, data }: { id: number; data: Partial<Property> }) => {
    const response = await apiClient.put<{ data: Property }>(`/properties/${id}`, data);
    // Backend returns ApiResponse<Property>
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (id: number) => {
    await apiClient.delete(`/properties/${id}`);
    return id;
  }
);

export const uploadPropertyImages = createAsyncThunk<string[], { propertyId: number; files: File[] }>(
  'properties/uploadImages',
  async ({ propertyId, files }) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await apiClient.post<{ data: string[] }>(`/properties/${propertyId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    setSortColumn: (state, action: PayloadAction<string>) => {
      state.sortColumn = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortDirection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch properties';
      })
      // Fetch property by ID
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch property';
      })
      // Create property
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create property';
      })
      // Update property
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.properties.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.properties[index] = action.payload;
        }
        if (state.selectedProperty?.id === action.payload.id) {
          state.selectedProperty = action.payload;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update property';
      })
      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter((p) => p.id !== action.payload);
        if (state.selectedProperty?.id === action.payload) {
          state.selectedProperty = null;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete property';
      });
  },
});

export const { setSelectedProperty, setSortColumn, setSortDirection } = propertiesSlice.actions;
export default propertiesSlice.reducer;
