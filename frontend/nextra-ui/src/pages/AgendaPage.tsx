import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DetailView, Button, useToast, Modal, WeeklyCalendar, AppointmentForm } from '@nextra/ui-lib';
import type { CalendarEvent, AppointmentFormData } from '@nextra/ui-lib';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchAppointmentsByDateRange,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  setSelectedAppointment,
} from '../store/slices/appointmentsSlice';
import type { AppointmentCreateRequest, AppointmentUpdateRequest } from '../store/slices/appointmentsSlice';
import { fetchClients } from '../store/slices/clientsSlice';
import { fetchProperties } from '../store/slices/propertiesSlice';

export function AgendaPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  // Get current week's Monday
  const getMonday = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(getMonday(new Date()));

  const { appointments, selectedAppointment, loading, error } = useAppSelector(
    (state) => state.appointments
  );
  const { clients } = useAppSelector((state) => state.clients);
  const { properties } = useAppSelector((state) => state.properties);

  // Fetch appointments for the current week
  useEffect(() => {
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    dispatch(
      fetchAppointmentsByDateRange({
        startDate: currentWeekStart.toISOString(),
        endDate: weekEnd.toISOString(),
      })
    )
      .unwrap()
      .catch((err) => {
        addToast('error', 'Failed to load appointments', err.message || 'Connection error');
      });
  }, [dispatch, currentWeekStart, addToast]);

  // Fetch clients and properties for dropdowns
  useEffect(() => {
    dispatch(fetchClients({}));
    dispatch(fetchProperties({}));
  }, [dispatch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      addToast('error', 'Failed to load appointments', error);
    }
  }, [error, addToast]);

  const handleWeekChange = (date: Date) => {
    setCurrentWeekStart(date);
  };

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = appointments.find((a) => a.id === event.id);
    if (appointment) {
      dispatch(setSelectedAppointment(appointment));
    }
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    setSelectedDate(date);
    setSelectedHour(hour);
    setShowCreateModal(true);
  };

  const handleCreateAppointment = async (values: AppointmentFormData) => {
    try {
      const request: AppointmentCreateRequest = {
        title: values.title,
        startTime: values.startTime,
        endTime: values.endTime,
        location: values.location,
        notes: values.notes,
        status: values.status,
        userId: values.userId,
        clientId: values.clientId,
        propertyId: values.propertyId,
      };

      await dispatch(createAppointment(request)).unwrap();
      addToast('success', 'Appointment created', 'The appointment was successfully created');
      setShowCreateModal(false);
      setSelectedDate(null);
      setSelectedHour(null);

      // Refresh the list
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      dispatch(
        fetchAppointmentsByDateRange({
          startDate: currentWeekStart.toISOString(),
          endDate: weekEnd.toISOString(),
        })
      );
    } catch (err: any) {
      addToast('error', 'Failed to create appointment', err.message || 'Create failed');
    }
  };

  const handleUpdateAppointment = async (values: AppointmentFormData) => {
    if (!selectedAppointment) return;

    try {
      const request: AppointmentUpdateRequest = {
        title: values.title,
        startTime: values.startTime,
        endTime: values.endTime,
        location: values.location,
        notes: values.notes,
        status: values.status,
        clientId: values.clientId,
        propertyId: values.propertyId,
      };

      await dispatch(updateAppointment({ id: selectedAppointment.id, data: request })).unwrap();
      addToast('success', 'Appointment updated', 'The appointment was successfully updated');
      setShowEditModal(false);

      // Refresh the list
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      dispatch(
        fetchAppointmentsByDateRange({
          startDate: currentWeekStart.toISOString(),
          endDate: weekEnd.toISOString(),
        })
      );
    } catch (err: any) {
      addToast('error', 'Failed to update appointment', err.message || 'Update failed');
    }
  };

  const handleDeleteAppointment = async () => {
    if (!selectedAppointment) return;

    try {
      await dispatch(deleteAppointment(selectedAppointment.id)).unwrap();
      addToast('success', 'Appointment deleted', 'The appointment was successfully deleted');
      dispatch(setSelectedAppointment(null));

      // Refresh the list
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      dispatch(
        fetchAppointmentsByDateRange({
          startDate: currentWeekStart.toISOString(),
          endDate: weekEnd.toISOString(),
        })
      );
    } catch (err: any) {
      addToast('error', 'Failed to delete appointment', err.message || 'Delete failed');
    }
  };

  // Convert appointments to calendar events
  const calendarEvents: CalendarEvent[] = appointments.map((apt) => ({
    id: apt.id,
    title: apt.title,
    startTime: new Date(apt.startTime),
    endTime: new Date(apt.endTime),
    status: apt.status,
    client: apt.client,
    property: apt.property,
  }));

  // Prepare initial form values when creating from time slot
  const getInitialCreateValues = (): Partial<AppointmentFormData> | undefined => {
    if (!selectedDate || selectedHour === null) return undefined;

    const startTime = new Date(selectedDate);
    startTime.setHours(selectedHour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    return {
      startTime: startTime.toISOString().slice(0, 16),
      endTime: endTime.toISOString().slice(0, 16),
      status: 'SCHEDULED',
    };
  };

  // Prepare initial form values for editing
  const getInitialEditValues = (): Partial<AppointmentFormData> | undefined => {
    if (!selectedAppointment) return undefined;

    return {
      title: selectedAppointment.title,
      startTime: new Date(selectedAppointment.startTime).toISOString().slice(0, 16),
      endTime: new Date(selectedAppointment.endTime).toISOString().slice(0, 16),
      location: selectedAppointment.location,
      notes: selectedAppointment.notes,
      status: selectedAppointment.status,
      userId: selectedAppointment.userId,
      clientId: selectedAppointment.clientId,
      propertyId: selectedAppointment.propertyId,
    };
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'NO_SHOW':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">Agenda</h1>
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Add Appointment
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 6 }}>
          Failed to load appointments: {error}
        </div>
      )}

      {/* Loading state */}
      {loading && <div>Loading appointments...</div>}

      {/* Calendar */}
      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        <WeeklyCalendar
          events={calendarEvents}
          currentWeekStart={currentWeekStart}
          onWeekChange={handleWeekChange}
          onEventClick={handleEventClick}
          onTimeSlotClick={handleTimeSlotClick}
        />

        {/* Detail View */}
        {selectedAppointment && (
          <DetailView title="Appointment Details">
            <div className="space-y-3">
              <div>
                <strong>Title:</strong> {selectedAppointment.title}
              </div>
              
              <div>
                <strong>Status:</strong>{' '}
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status}
                </span>
              </div>

              <div>
                <strong>Start:</strong>{' '}
                {new Date(selectedAppointment.startTime).toLocaleString()}
              </div>

              <div>
                <strong>End:</strong>{' '}
                {new Date(selectedAppointment.endTime).toLocaleString()}
              </div>

              {selectedAppointment.location && (
                <div>
                  <strong>Location:</strong> {selectedAppointment.location}
                </div>
              )}

              {selectedAppointment.client && (
                <div>
                  <strong>Client:</strong>{' '}
                  <button
                    onClick={() => navigate(`/clients?id=${selectedAppointment.clientId}`)}
                    className="text-primary hover:underline"
                  >
                    {selectedAppointment.client.name}
                  </button>
                  <div className="text-sm text-textSecondary ml-4">
                    📧 {selectedAppointment.client.email}
                    <br />
                    📞 {selectedAppointment.client.phone}
                  </div>
                </div>
              )}

              {selectedAppointment.property && (
                <div>
                  <strong>Property:</strong>{' '}
                  <button
                    onClick={() => navigate(`/properties/${selectedAppointment.propertyId}`)}
                    className="text-primary hover:underline"
                  >
                    {selectedAppointment.property.title}
                  </button>
                  <div className="text-sm text-textSecondary ml-4">
                    📍 {selectedAppointment.property.address}
                    <br />
                    💰 €{selectedAppointment.property.price.toLocaleString()}
                  </div>
                </div>
              )}

              {selectedAppointment.notes && (
                <div>
                  <strong>Notes:</strong>
                  <p className="text-sm text-textSecondary mt-1 whitespace-pre-wrap">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div className="text-xs text-textSecondary pt-2 border-t">
                <div>Created: {new Date(selectedAppointment.createdAt).toLocaleString()}</div>
                <div>Updated: {new Date(selectedAppointment.updatedAt).toLocaleString()}</div>
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDeleteAppointment}
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

      {/* Create Appointment Modal */}
      <Modal
        open={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedDate(null);
          setSelectedHour(null);
        }}
        title="Add New Appointment"
      >
        <AppointmentForm
          initialValues={getInitialCreateValues()}
          clients={clients.map((c) => ({ id: c.id, name: c.name }))}
          properties={properties.map((p) => ({ id: p.id, title: p.title }))}
          onSubmit={handleCreateAppointment}
          onCancel={() => {
            setShowCreateModal(false);
            setSelectedDate(null);
            setSelectedHour(null);
          }}
        />
      </Modal>

      {/* Edit Appointment Modal */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Appointment"
      >
        <AppointmentForm
          initialValues={getInitialEditValues()}
          clients={clients.map((c) => ({ id: c.id, name: c.name }))}
          properties={properties.map((p) => ({ id: p.id, title: p.title }))}
          onSubmit={handleUpdateAppointment}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
}
