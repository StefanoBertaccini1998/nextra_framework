import React, { useCallback, useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface ImageUploadProps {
  /**
   * Current image URLs
   */
  readonly value?: string[];
  
  /**
   * Callback when images change
   */
  readonly onChange: (files: File[]) => void;
  
  /**
   * Maximum number of images allowed
   */
  readonly maxImages?: number;
  
  /**
   * Maximum file size in bytes (default: 10MB)
   */
  readonly maxFileSize?: number;
  
  /**
   * Whether the upload is disabled
   */
  readonly disabled?: boolean;
  
  /**
   * Label text
   */
  readonly label?: string;
  
  /**
   * Helper text shown below the upload area
   */
  readonly helperText?: string;
}

/**
 * ImageUpload Component
 * 
 * A reusable drag-and-drop image upload component with preview.
 * Features:
 * - Drag and drop support
 * - Multiple file selection
 * - Image preview
 * - File validation
 * - Remove uploaded images
 */
export function ImageUpload({
  value = [],
  onChange,
  maxImages = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
  label = 'Property Images',
  helperText = 'Drag and drop images here, or click to select files',
}: Readonly<ImageUploadProps>) {
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<string[]>(value);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = (files: FileList | null): File[] => {
    if (!files || files.length === 0) {
      return [];
    }

    const validFiles: File[] = [];
    let errorMessage = '';

    // Check total count
    if (previews.length + files.length > maxImages) {
      errorMessage = `Maximum ${maxImages} images allowed`;
      setError(errorMessage);
      return [];
    }

    // Validate each file
    for (const file of Array.from(files)) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        errorMessage = 'Only image files are allowed';
        continue;
      }

      // Check file size
      if (file.size > maxFileSize) {
        errorMessage = `File size must not exceed ${Math.round(maxFileSize / 1024 / 1024)}MB`;
        continue;
      }

      validFiles.push(file);
    }

    if (errorMessage) {
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
    }

    return validFiles;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    const validFiles = validateFiles(files);
    
    if (validFiles.length > 0) {
      // Create previews
      const newPreviews: string[] = [];
      for (const file of validFiles) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === validFiles.length) {
            setPreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      }

      onChange(validFiles);
    }
  }, [onChange, maxImages, maxFileSize, previews.length]);

  const handleDrag = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles, disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeImage = useCallback((index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    // Note: You'll need to implement file removal logic in the parent component
  }, []);

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium" style={{ color: 'var(--color-textSecondary)' }}>
          {label}
        </label>
      )}

      {/* Upload Area */}
      <button
        type="button"
        className={`
          w-full relative border-2 border-dashed rounded-lg p-6 transition-colors
          ${dragActive ? 'border-gray-400' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}
        `}
        style={{
          borderColor: dragActive ? 'var(--color-border)' : 'var(--color-border)',
          backgroundColor: dragActive ? 'var(--color-surface-hover)' : 'transparent'
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
        disabled={disabled}
        aria-label="Upload images"
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />

        <div className="text-center">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">{helperText}</p>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to {Math.round(maxFileSize / 1024 / 1024)}MB
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {previews.length} / {maxImages} images
          </p>
        </div>
      </button>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div
              key={preview}
              className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square"
            >
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
