import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button, ThemedInput, FormSection, ErrorAlert } from '@nextra/ui-lib';
import type { Client } from '../../store/slices/clientsSlice';

interface ClientFormProps {
  readonly initialValues?: Partial<Client>;
  readonly onSubmit: (values: Partial<Client>) => void | Promise<void>;
  readonly onCancel?: () => void;
  readonly loading?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function ClientForm({ initialValues, onSubmit, onCancel, loading: externalLoading }: Readonly<ClientFormProps>) {
  const [formData, setFormData] = useState<Partial<Client>>(initialValues || {});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<any>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | undefined = value;
    if (type === 'number') {
      finalValue = value === '' ? undefined : Number(value);
    }
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.name?.trim()) newErrors.name = 'Full name is required';
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    if (!formData.fiscalId?.trim()) newErrors.fiscalId = 'Fiscal ID is required';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';

    // Budget validation
    if (formData.preferredBudgetMin && formData.preferredBudgetMin < 0) {
      newErrors.preferredBudgetMin = 'Budget must be positive';
    }
    if (formData.preferredBudgetMax && formData.preferredBudgetMax < 0) {
      newErrors.preferredBudgetMax = 'Budget must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Client form submission error:', error);
        setSubmitError(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const loading = externalLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {submitError && (
        <ErrorAlert
          title="Failed to save client"
          error={submitError}
          onDismiss={() => setSubmitError(null)}
        />
      )}

      {/* Basic Information Section */}
      <FormSection title="Basic Information">
          {/* Full Name - Full Width */}
          <ThemedInput
            label="Full Name"
            type="text"
            id="name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            placeholder="Mario Rossi"
            required
            error={errors.name}
          />

          {/* Email and Phone - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="mario.rossi@example.com"
              required
              error={errors.email}
            />

            <ThemedInput
              label="Phone"
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+39 333 111222"
              required
              error={errors.phone}
            />
          </div>

          {/* Fiscal ID and Address - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="Fiscal ID"
              type="text"
              id="fiscalId"
              name="fiscalId"
              value={formData.fiscalId || ''}
              onChange={handleChange}
              placeholder="MRSS80A01H501X"
              required
              error={errors.fiscalId}
            />

            <ThemedInput
              label="Address"
              type="text"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="Via Roma 1, Milano"
              required
              error={errors.address}
            />
          </div>
      </FormSection>

      {/* Budget Preferences Section */}
      <FormSection title="Budget Preferences">
          {/* Min and Max Budget - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="Minimum Budget (€)"
              type="number"
              id="preferredBudgetMin"
              name="preferredBudgetMin"
              value={formData.preferredBudgetMin || ''}
              onChange={handleChange}
              placeholder="150000"
              min="0"
              step="1000"
              error={errors.preferredBudgetMin}
            />

            <ThemedInput
              label="Maximum Budget (€)"
              type="number"
              id="preferredBudgetMax"
              name="preferredBudgetMax"
              value={formData.preferredBudgetMax || ''}
              onChange={handleChange}
              placeholder="300000"
              min="0"
              step="1000"
              error={errors.preferredBudgetMax}
            />
          </div>
      </FormSection>

      {/* Property Preferences Section */}
      <FormSection title="Property Preferences">
          {/* Preferred Locations and Property Types - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="Preferred Locations"
              type="text"
              id="preferredLocations"
              name="preferredLocations"
              value={formData.preferredLocations || ''}
              onChange={handleChange}
              placeholder="Milan, Rome (comma-separated)"
            />

            <ThemedInput
              label="Preferred Property Types"
              type="text"
              id="preferredPropertyTypes"
              name="preferredPropertyTypes"
              value={formData.preferredPropertyTypes || ''}
              onChange={handleChange}
              placeholder="Apartment, Villa (comma-separated)"
            />
          </div>

          {/* Min and Max Size - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="Minimum Size (m²)"
              type="number"
              id="preferredSizeMin"
              name="preferredSizeMin"
              value={formData.preferredSizeMin || ''}
              onChange={handleChange}
              placeholder="50"
              min="0"
              step="1"
            />

            <ThemedInput
              label="Maximum Size (m²)"
              type="number"
              id="preferredSizeMax"
              name="preferredSizeMax"
              value={formData.preferredSizeMax || ''}
              onChange={handleChange}
              placeholder="120"
              min="0"
              step="1"
            />
          </div>
      </FormSection>

      {/* Additional Information Section */}
      <FormSection title="Additional Information">
          {/* Notes - Full Width */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Additional notes or requirements..."
              rows={4}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary resize-none"
              style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
          </div>
      </FormSection>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          disabled={loading}
        >
          {(() => {
            if (loading) return 'Saving...';
            return initialValues?.id ? 'Update Client' : 'Create Client';
          })()}
        </Button>
      </div>
    </form>
  );
}
