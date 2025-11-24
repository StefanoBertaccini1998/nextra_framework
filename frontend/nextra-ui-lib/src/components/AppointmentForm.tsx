import React from 'react';
import { DynamicForm, type FormField } from './common';

interface AppointmentFormProps {
  initialValues?: Partial<AppointmentFormData>;
  clients?: Array<{ id: number; name: string }>;
  properties?: Array<{ id: number; title: string }>;
  onSubmit: (values: AppointmentFormData) => void | Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export interface AppointmentFormData {
  title: string;
  startTime: string; // ISO 8601 datetime-local format
  endTime: string;
  location?: string;
  notes?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  userId: number;
  clientId?: number;
  propertyId?: number;
}

export function AppointmentForm({
  initialValues,
  clients = [],
  properties = [],
  onSubmit,
  onCancel,
  loading,
}: AppointmentFormProps) {
  const appointmentFormFields: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Meeting with client',
      required: true,
    },
    {
      name: 'startTime',
      label: 'Start Time',
      type: 'datetime-local',
      required: true,
    },
    {
      name: 'endTime',
      label: 'End Time',
      type: 'datetime-local',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Office, Client site, etc.',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'SCHEDULED', label: 'Scheduled' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
        { value: 'NO_SHOW', label: 'No Show' },
      ],
    },
    {
      name: 'clientId',
      label: 'Client',
      type: 'select',
      options: [
        { value: '', label: '-- Select --' },
        ...clients.map(c => ({ value: String(c.id), label: c.name })),
      ],
    },
    {
      name: 'propertyId',
      label: 'Property',
      type: 'select',
      options: [
        { value: '', label: '-- Select --' },
        ...properties.map(p => ({ value: String(p.id), label: p.title })),
      ],
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      placeholder: 'Additional notes...',
      rows: 3,
    },
  ];

  // Add userId to form data if not present
  const handleSubmit = (values: any) => {
    const submitData = {
      ...values,
      userId: values.userId || initialValues?.userId || 1,
      clientId: values.clientId ? Number(values.clientId) : undefined,
      propertyId: values.propertyId ? Number(values.propertyId) : undefined,
    };
    return onSubmit(submitData as AppointmentFormData);
  };

  return (
    <DynamicForm
      fields={appointmentFormFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitLabel="Save Appointment"
      cancelLabel="Cancel"
      loading={loading}
      columns={2}
    />
  );
}
