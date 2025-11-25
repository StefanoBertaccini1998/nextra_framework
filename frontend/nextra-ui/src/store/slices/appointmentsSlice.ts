import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ApiClient } from '@nextra/ui-lib';

// Backend API response wrapper
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// Appointment status enum matching backend
export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

// Define the Appointment type matching backend AppointmentResponse
export interface Appointment {
    id: number;
    title: string;
    startTime: string; // ISO 8601 datetime
    endTime: string;
    location?: string;
    notes?: string;
    status: AppointmentStatus;
    userId: number;
    clientId?: number;
    propertyId?: number;
    client?: {
        id: number;
        name: string;
        email: string;
        phone: string;
    };
    property?: {
        id: number;
        title: string;
        address: string;
        price: number;
    };
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

// Request DTO for creating appointments
export interface AppointmentCreateRequest {
    title: string;
    startTime: string;
    endTime: string;
    location?: string;
    notes?: string;
    status: AppointmentStatus;
    userId: number;
    clientId?: number;
    propertyId?: number;
}

// Request DTO for updating appointments
export interface AppointmentUpdateRequest {
    title?: string;
    startTime?: string;
    endTime?: string;
    location?: string;
    notes?: string;
    status?: AppointmentStatus;
    clientId?: number;
    propertyId?: number;
}

// Define the slice state
export interface AppointmentsState {
    appointments: Appointment[];
    selectedAppointment: Appointment | null;
    loading: boolean;
    error: string | null;
    // Filter state
    filterUserId?: number;
    filterStatus?: AppointmentStatus;
    filterStartDate?: string;
    filterEndDate?: string;
}

const initialState: AppointmentsState = {
    appointments: [],
    selectedAppointment: null,
    loading: false,
    error: null,
};

// Initialize API client
const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
});

// Async thunks
export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAll',
    async (params?: { userId?: number; status?: AppointmentStatus; startDate?: string; endDate?: string }) => {
        let url = '/appointments';

        if (params?.userId) {
            url = `/appointments/user/${params.userId}`;
        } else if (params?.status) {
            url = `/appointments/status/${params.status}`;
        }

        const response = await apiClient.get<ApiResponse<Appointment[]>>(url);
        return response.data;
    }
);

export const fetchAppointmentById = createAsyncThunk(
    'appointments/fetchById',
    async (id: number) => {
        const response = await apiClient.get<ApiResponse<Appointment>>(`/appointments/${id}`);
        return response.data;
    }
);

export const fetchAppointmentsByDateRange = createAsyncThunk(
    'appointments/fetchByDateRange',
    async (params: { startDate: string; endDate: string }) => {
        const response = await apiClient.get<ApiResponse<Appointment[]>>(
            `/appointments/range?start=${params.startDate}&end=${params.endDate}`
        );
        return response.data;
    }
);

export const createAppointment = createAsyncThunk(
    'appointments/create',
    async (appointment: AppointmentCreateRequest) => {
        const response = await apiClient.post<ApiResponse<Appointment>>('/appointments/create', appointment);
        return response.data;
    }
);

export const updateAppointment = createAsyncThunk(
    'appointments/update',
    async ({ id, data }: { id: number; data: AppointmentUpdateRequest }) => {
        const response = await apiClient.put<ApiResponse<Appointment>>(`/appointments/${id}/update`, data);
        return response.data;
    }
);

export const deleteAppointment = createAsyncThunk(
    'appointments/delete',
    async (id: number) => {
        await apiClient.delete(`/appointments/${id}/delete`);
        return id;
    }
);

// Slice
const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setSelectedAppointment: (state, action: PayloadAction<Appointment | null>) => {
            state.selectedAppointment = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setFilters: (state, action: PayloadAction<{
            userId?: number;
            status?: AppointmentStatus;
            startDate?: string;
            endDate?: string;
        }>) => {
            state.filterUserId = action.payload.userId;
            state.filterStatus = action.payload.status;
            state.filterStartDate = action.payload.startDate;
            state.filterEndDate = action.payload.endDate;
        },
    },
    extraReducers: (builder) => {
        // Fetch all appointments
        builder
            .addCase(fetchAppointments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch appointments';
            });

        // Fetch by ID
        builder
            .addCase(fetchAppointmentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointmentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAppointment = action.payload;
            })
            .addCase(fetchAppointmentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch appointment';
            });

        // Fetch by date range
        builder
            .addCase(fetchAppointmentsByDateRange.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAppointmentsByDateRange.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchAppointmentsByDateRange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch appointments';
            });

        // Create appointment
        builder
            .addCase(createAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments.push(action.payload);
            })
            .addCase(createAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create appointment';
            });

        // Update appointment
        builder
            .addCase(updateAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppointment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.appointments.findIndex(a => a.id === action.payload.id);
                if (index !== -1) {
                    state.appointments[index] = action.payload;
                }
                if (state.selectedAppointment?.id === action.payload.id) {
                    state.selectedAppointment = action.payload;
                }
            })
            .addCase(updateAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update appointment';
            });

        // Delete appointment
        builder
            .addCase(deleteAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAppointment.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = state.appointments.filter(a => a.id !== action.payload);
                if (state.selectedAppointment?.id === action.payload) {
                    state.selectedAppointment = null;
                }
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete appointment';
            });
    },
});

export const { setSelectedAppointment, clearError, setFilters } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
