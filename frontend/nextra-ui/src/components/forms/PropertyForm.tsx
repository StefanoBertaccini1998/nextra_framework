import React, { useState } from 'react';
import { ImageUpload } from '@nextra/ui-lib';
import type { Property } from '../../store/slices/propertiesSlice';

interface PropertyFormProps {
  initialValues?: Partial<Property>;
  onSubmit: (values: Partial<Property>, files?: File[]) => void | Promise<void>;
  onCancel?: () => void;
}

export function PropertyForm({ initialValues, onSubmit, onCancel }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>(initialValues || {});
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? (value === '' ? undefined : Number(value)) : value;
    
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
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData, imageFiles.length > 0 ? imageFiles : undefined);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Basic Information</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Title - Full Width */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Property Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="Modern Apartment in City Center"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

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
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Price (€) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                placeholder="250000"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Size (m²) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="size"
                name="size"
                value={formData.size || ''}
                onChange={handleChange}
                placeholder="85"
                min="0"
                step="1"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.size && <p className="mt-1 text-sm text-red-500">{errors.size}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Location</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                City/Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                placeholder="Milan"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
                Full Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                placeholder="Via Roma 123, 20100 Milano"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Property Details</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms || ''}
              onChange={handleChange}
              placeholder="2"
              min="0"
              step="1"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms || ''}
              onChange={handleChange}
              placeholder="1"
              min="0"
              step="1"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
          </div>

          <div>
            <label htmlFor="floors" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Floors
            </label>
            <input
              type="number"
              id="floors"
              name="floors"
              value={formData.floors || ''}
              onChange={handleChange}
              placeholder="1"
              min="0"
              step="1"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
          </div>

          <div>
            <label htmlFor="yearBuilt" className="block text-sm font-medium mb-1" style={{ color: 'var(--color-textSecondary)' }}>
              Year Built
            </label>
            <input
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              value={formData.yearBuilt || ''}
              onChange={handleChange}
              placeholder="2020"
              min="1800"
              max={new Date().getFullYear()}
              step="1"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Description</h3>
        
        <div className="space-y-4">
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
        </div>
      </div>

      {/* Images Section */}
      <div className="rounded-lg p-6 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'white' }}>Images</h3>
        <ImageUpload
          value={formData.images || []}
          onChange={handleImagesChange}
          maxImages={10}
          maxFileSize={5 * 1024 * 1024}
          label="Upload Property Images"
          helperText="Drag and drop images here, or click to select files (Max 10 images, 5MB each)"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80"
            style={{ backgroundColor: 'var(--color-surfaceHover)', color: 'var(--color-text)' }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600"
          style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
        >
          {isSubmitting ? 'Saving...' : (initialValues?.id ? 'Update Property' : 'Create Property')}
        </button>
      </div>
    </form>
  );
}
