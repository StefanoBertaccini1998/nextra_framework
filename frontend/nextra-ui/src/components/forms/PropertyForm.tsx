import { useState } from 'react';
import { Button, ThemedInput, FormSection, ImageUpload, ErrorAlert } from '@nextra/ui-lib';
import type { Property } from '../../store/slices/propertiesSlice';

interface PropertyFormProps {
  readonly initialValues?: Partial<Property>;
  readonly onSubmit: (values: Partial<Property>, files?: File[]) => void | Promise<void>;
  readonly onCancel?: () => void;
}

export function PropertyForm({ initialValues, onSubmit, onCancel }: Readonly<PropertyFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>(initialValues || {});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | undefined = value;
    if (type === 'number') {
      finalValue = value === '' ? undefined : Number(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImagesChange = (files: File[]) => {
    setImageFiles(files);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.size || formData.size <= 0) newErrors.size = 'Valid size is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData, imageFiles.length > 0 ? imageFiles : undefined);
    } catch (error) {
      console.error('Property form submission error:', error);
      setSubmitError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {submitError && (
        <ErrorAlert
          title="Failed to save property"
          error={submitError}
          onDismiss={() => setSubmitError(null)}
        />
      )}

      {/* Basic Information Section */}
      <FormSection title="Basic Information">
          {/* Title - Full Width */}
          <ThemedInput
            label="Property Title"
            type="text"
            id="title"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            placeholder="Modern Apartment in City Center"
            required
            error={errors.title}
          />

          {/* Type and Status - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              >
                <option value="">Select Type</option>
                <option value="APARTMENT">Apartment</option>
                <option value="VILLA">Villa</option>
                <option value="HOUSE">House</option>
                <option value="LAND">Land</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
              {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              >
                <option value="">Select Status</option>
                <option value="AVAILABLE">Available</option>
                <option value="SOLD">Sold</option>
                <option value="RESERVED">Reserved</option>
                <option value="PENDING">Pending</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
            </div>
          </div>

          {/* Price and Size - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="Price (€)"
              type="number"
              id="price"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              placeholder="250000"
              min="0"
              step="1000"
              required
              error={errors.price}
            />

            <ThemedInput
              label="Size (m²)"
              type="number"
              id="size"
              name="size"
              value={formData.size || ''}
              onChange={handleChange}
              placeholder="85"
              min="0"
              step="1"
              required
              error={errors.size}
            />
          </div>
      </FormSection>

      {/* Location Section */}
      <FormSection title="Location">
        <div className="grid grid-cols-2 gap-4">
            <ThemedInput
              label="City/Location"
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="Milan"
              required
              error={errors.location}
            />

            <ThemedInput
              label="Full Address"
              type="text"
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              placeholder="Via Roma 123, 20100 Milano"
              required
              error={errors.address}
            />
          </div>
      </FormSection>

      {/* Property Details Section */}
      <FormSection title="Property Details">
        <div className="grid grid-cols-4 gap-4">
          <ThemedInput
            label="Bedrooms"
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms || ''}
            onChange={handleChange}
            placeholder="2"
            min="0"
            step="1"
          />

          <ThemedInput
            label="Bathrooms"
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms || ''}
            onChange={handleChange}
            placeholder="1"
            min="0"
            step="1"
          />

          <ThemedInput
            label="Floors"
            type="number"
            id="floors"
            name="floors"
            value={formData.floors || ''}
            onChange={handleChange}
            placeholder="1"
            min="0"
            step="1"
          />

          <ThemedInput
            label="Year Built"
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            value={formData.yearBuilt || ''}
            onChange={handleChange}
            placeholder="2020"
            min="1800"
            max={new Date().getFullYear()}
            step="1"
          />
        </div>
      </FormSection>

      {/* Description Section */}
      <FormSection title="Description">
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Detailed description of the property..."
              rows={5}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary resize-y" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="features" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Features
            </label>
            <textarea
              id="features"
              name="features"
              value={formData.features || ''}
              onChange={handleChange}
              placeholder="Parking, Garden, Swimming Pool, Air Conditioning, etc. (comma-separated)"
              rows={3}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary resize-y" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
          </div>
      </FormSection>

      {/* Images Section */}
      <FormSection title="Images">
        <ImageUpload
          value={formData.images || []}
          onChange={handleImagesChange}
          maxImages={10}
          maxFileSize={5 * 1024 * 1024}
          label="Upload Property Images"
          helperText="Drag and drop images here, or click to select files (Max 10 images, 5MB each)"
        />
      </FormSection>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {(() => {
            if (isSubmitting) return 'Saving...';
            return initialValues?.id ? 'Update Property' : 'Create Property';
          })()}
        </Button>
      </div>
    </form>
  );
}
