import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button, ThemedInput, FormSection, ErrorAlert } from './common';

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

interface FormErrors {
  [key: string]: string;
}

export function AppointmentForm({
  initialValues,
  clients = [],
  properties = [],
  onSubmit,
  onCancel,
  loading: externalLoading,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<Partial<AppointmentFormData>>(
    initialValues || { status: 'SCHEDULED' }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<any>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (!formData.endTime) newErrors.endTime = 'End time is required';
    if (!formData.status) newErrors.status = 'Status is required';

    // Validate end time is after start time
    if (formData.startTime && formData.endTime) {
      if (new Date(formData.endTime) <= new Date(formData.startTime)) {
        newErrors.endTime = 'End time must be after start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        userId: formData.userId || initialValues?.userId || 1,
        clientId: formData.clientId ? Number(formData.clientId) : undefined,
        propertyId: formData.propertyId ? Number(formData.propertyId) : undefined,
      } as AppointmentFormData;
      await onSubmit(submitData);
    } catch (error) {
      console.error('Appointment form submission error:', error);
      setSubmitError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loading = externalLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {submitError && (
        <ErrorAlert
          title="Failed to save appointment"
          error={submitError}
          onDismiss={() => setSubmitError(null)}
        />
      )}

      {/* Basic Information Section */}
      <FormSection title="Appointment Details">
        {/* Title */}
        <ThemedInput
          label="Title"
          type="text"
          id="title"
          name="title"
          value={formData.title || ''}
          onChange={handleChange}
          placeholder="Meeting with client"
          required
          error={errors.title}
        />

        {/* Start and End Time */}
        <div className="grid grid-cols-2 gap-4">
          <ThemedInput
            label="Start Time"
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime || ''}
            onChange={handleChange}
            required
            error={errors.startTime}
          />

          <ThemedInput
            label="End Time"
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime || ''}
            onChange={handleChange}
            required
            error={errors.endTime}
          />
        </div>

        {/* Location */}
        <ThemedInput
          label="Location"
          type="text"
          id="location"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          placeholder="Office, Client site, etc."
        />

        {/* Status */}
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary"
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text)',
              borderColor: errors.status ? 'var(--color-error)' : 'var(--color-border)'
            }}
            required
          >
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No Show</option>
          </select>
          {errors.status && (
            <p className="mt-1 text-sm text-red-500">{errors.status}</p>
          )}
        </div>
      </FormSection>

      {/* Related Entities Section */}
      <FormSection title="Related To">
        <div className="grid grid-cols-2 gap-4">
          {/* Client */}
          <div>
            <label
              htmlFor="clientId"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Client
            </label>
            <select
              id="clientId"
              name="clientId"
              value={formData.clientId || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)'
              }}
            >
              <option value="">-- Select --</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Property */}
          <div>
            <label
              htmlFor="propertyId"
              className="block text-sm font-medium mb-1"
              style={{ color: 'var(--color-textSecondary)' }}
            >
              Property
            </label>
            <select
              id="propertyId"
              name="propertyId"
              value={formData.propertyId || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text)',
                borderColor: 'var(--color-border)'
              }}
            >
              <option value="">-- Select --</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
        </div>
      </FormSection>

      {/* Notes Section */}
      <FormSection title="Additional Notes">
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            placeholder="Additional notes..."
            rows={3}
            className="w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary"
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)'
            }}
          />
        </div>
      </FormSection>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Appointment'}
        </Button>
      </div>
    </form>
  );
}
