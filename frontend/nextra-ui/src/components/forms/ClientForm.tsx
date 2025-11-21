import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { Client } from '../../store/slices/clientsSlice';

interface ClientFormProps {
  initialValues?: Partial<Client>;
  onSubmit: (values: Partial<Client>) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function ClientForm({ initialValues, onSubmit, onCancel, loading: externalLoading }: ClientFormProps) {
  const [formData, setFormData] = useState<Partial<Client>>(initialValues || {});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value
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
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const loading = externalLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Basic Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Full Name - Full Width */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              placeholder="Mario Rossi"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
              style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Email and Phone - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="mario.rossi@example.com"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="+39 333 111222"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Fiscal ID and Address - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="fiscalId" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Fiscal ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fiscalId"
                name="fiscalId"
                value={formData.fiscalId || ''}
                onChange={handleChange}
                placeholder="MRSS80A01H501X"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.fiscalId && <p className="mt-1 text-sm text-red-500">{errors.fiscalId}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Via Roma 1, Milano"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Preferences Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Budget Preferences</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Min and Max Budget - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferredBudgetMin" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Minimum Budget (€)
              </label>
              <input
                type="number"
                id="preferredBudgetMin"
                name="preferredBudgetMin"
                value={formData.preferredBudgetMin || ''}
                onChange={handleChange}
                placeholder="150000"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.preferredBudgetMin && <p className="mt-1 text-sm text-red-500">{errors.preferredBudgetMin}</p>}
            </div>

            <div>
              <label htmlFor="preferredBudgetMax" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Maximum Budget (€)
              </label>
              <input
                type="number"
                id="preferredBudgetMax"
                name="preferredBudgetMax"
                value={formData.preferredBudgetMax || ''}
                onChange={handleChange}
                placeholder="300000"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.preferredBudgetMax && <p className="mt-1 text-sm text-red-500">{errors.preferredBudgetMax}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Property Preferences Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Property Preferences</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Preferred Locations and Property Types - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferredLocations" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Preferred Locations
              </label>
              <input
                type="text"
                id="preferredLocations"
                name="preferredLocations"
                value={formData.preferredLocations || ''}
                onChange={handleChange}
                placeholder="Milan, Rome (comma-separated)"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
            </div>

            <div>
              <label htmlFor="preferredPropertyTypes" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Preferred Property Types
              </label>
              <input
                type="text"
                id="preferredPropertyTypes"
                name="preferredPropertyTypes"
                value={formData.preferredPropertyTypes || ''}
                onChange={handleChange}
                placeholder="Apartment, Villa (comma-separated)"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
            </div>
          </div>

          {/* Min and Max Size - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="preferredSizeMin" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Minimum Size (m²)
              </label>
              <input
                type="number"
                id="preferredSizeMin"
                name="preferredSizeMin"
                value={formData.preferredSizeMin || ''}
                onChange={handleChange}
                placeholder="50"
                min="0"
                step="1"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
            </div>

            <div>
              <label htmlFor="preferredSizeMax" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Maximum Size (m²)
              </label>
              <input
                type="number"
                id="preferredSizeMax"
                name="preferredSizeMax"
                value={formData.preferredSizeMax || ''}
                onChange={handleChange}
                placeholder="120"
                min="0"
                step="1"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Additional Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
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
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
            style={{ backgroundColor: 'var(--color-surfaceHover)', color: 'var(--color-text)' }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          {loading ? 'Saving...' : (initialValues?.id ? 'Update Client' : 'Create Client')}
        </button>
      </div>
    </form>
  );
}
