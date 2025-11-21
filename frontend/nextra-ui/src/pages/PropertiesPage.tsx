import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/common/ToastProvider';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchProperties,
  createProperty as createPropertyThunk,
  updateProperty as updatePropertyThunk,
  uploadPropertyImages,
  type Property,
} from '../store/slices/propertiesSlice';
import { PropertyForm } from '../components/forms/PropertyForm';
import OffCanvas from '../components/common/OffCanvas';

export function PropertiesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const { properties, loading, error } = useAppSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties({}))
      .unwrap()
      .catch((err) => {
        addToast('error', 'Failed to load properties', err.message || 'Connection error');
      });
  }, [dispatch, addToast]);

  useEffect(() => {
    if (error) {
      addToast('error', 'Failed to load properties', error);
    }
  }, [error, addToast]);

  const handleCreateProperty = async (values: Partial<Property>, files?: File[]) => {
    try {
      const createdProperty = await dispatch(createPropertyThunk(values as any)).unwrap();
      
      // Upload images if provided
      if (files && files.length > 0 && createdProperty.id) {
        await dispatch(uploadPropertyImages({ propertyId: createdProperty.id, files })).unwrap();
      }
      
      addToast('success', 'Property created', 'The property was successfully created');
      setShowCreateModal(false);
      dispatch(fetchProperties({}));
    } catch (err: any) {
      addToast('error', 'Failed to create property', err.message || 'Create failed');
    }
  };

  const handleUpdateProperty = async (values: Partial<Property>, files?: File[]) => {
    if (!editingProperty) return;
    try {
      await dispatch(updatePropertyThunk({ id: editingProperty.id, data: values })).unwrap();
      
      // Upload new images if provided
      if (files && files.length > 0) {
        await dispatch(uploadPropertyImages({ propertyId: editingProperty.id, files })).unwrap();
      }
      
      addToast('success', 'Property updated', 'The property was successfully updated');
      setEditingProperty(null);
      dispatch(fetchProperties({}));
    } catch (err: any) {
      addToast('error', 'Failed to update property', err.message || 'Update failed');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'SOLD':
        return 'bg-red-100 text-red-800';
      case 'RESERVED':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">Properties</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-success hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
        >
          Add Property
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          Failed to load properties: {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No properties found. Click "Add Property" to create one.
            </div>
          ) : (
            properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                {/* Image */}
                <div
                  className="h-48 bg-gray-200 bg-cover bg-center relative"
                  style={{
                    backgroundImage: property.mainImage
                      ? `url(${property.mainImage})`
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                        property.status
                      )}`}
                    >
                      {property.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4" onClick={() => navigate(`/properties/${property.id}`)}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                          />
                        </svg>
                        {property.size}m²
                      </span>
                      {property.bedrooms && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                          {property.bedrooms} beds
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                            />
                          </svg>
                          {property.bathrooms} baths
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-xl font-bold text-blue-600">
                      €{property.price ? property.price.toLocaleString() : '0'}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProperty(property);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Property Modal */}
      <OffCanvas
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Property"
      >
        <PropertyForm
          onSubmit={handleCreateProperty}
          onCancel={() => setShowCreateModal(false)}
        />
      </OffCanvas>

      {/* Edit Property Modal */}
      <OffCanvas
        open={!!editingProperty}
        onClose={() => setEditingProperty(null)}
        title="Edit Property"
      >
        {editingProperty && (
          <PropertyForm
            initialValues={editingProperty}
            onSubmit={handleUpdateProperty}
            onCancel={() => setEditingProperty(null)}
          />
        )}
      </OffCanvas>
    </div>
  );
}
