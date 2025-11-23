import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast, Button } from '@nextra/ui-lib';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchPropertyById,
  updateProperty as updatePropertyThunk,
  deleteProperty as deletePropertyThunk,
  setSelectedProperty,
  type Property,
} from '../store/slices/propertiesSlice';
import { PropertyForm } from '../components/forms/PropertyForm';
import OffCanvas from '../components/common/OffCanvas';

export function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { selectedProperty, loading } = useAppSelector((state) => state.properties);

  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(Number.parseInt(id, 10)))
        .unwrap()
        .catch((err) => {
          addToast('error', 'Failed to load property', err.message || 'Connection error');
          navigate('/properties');
        });
    }

    return () => {
      dispatch(setSelectedProperty(null));
    };
  }, [id, dispatch, addToast, navigate]);

  const handleUpdateProperty = async (values: Partial<Property>) => {
    if (!selectedProperty) return;
    try {
      await dispatch(updatePropertyThunk({ id: selectedProperty.id, data: values })).unwrap();
      addToast('success', 'Property updated', 'The property was successfully updated');
      setShowEditModal(false);
      dispatch(fetchPropertyById(selectedProperty.id));
    } catch (err: any) {
      addToast('error', 'Failed to update property', err.message || 'Update failed');
    }
  };

  const handleDeleteProperty = async () => {
    if (!selectedProperty) return;
    try {
      await dispatch(deletePropertyThunk(selectedProperty.id)).unwrap();
      addToast('success', 'Property deleted', 'The property was successfully deleted');
      navigate('/properties');
    } catch (err: any) {
      addToast('error', 'Failed to delete property', err.message || 'Delete failed');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'SOLD':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'RESERVED':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PENDING':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading || !selectedProperty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="primary"
          onClick={() => navigate('/properties')}
          startIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          }
        >
          Back to Properties
        </Button>
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => setShowEditModal(true)}
          >
            Edit Property
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Property
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div
            className="h-96 bg-gray-200 rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: selectedProperty.mainImage
                ? `url(${selectedProperty.mainImage})`
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          ></div>
          <div className="grid grid-cols-2 gap-4">
            {selectedProperty.images && selectedProperty.images.length > 0 ? (
              selectedProperty.images.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="h-44 bg-gray-200 rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
              ))
            ) : (
              <>
                <div className="h-44 bg-gray-200 rounded-lg"></div>
                <div className="h-44 bg-gray-200 rounded-lg"></div>
                <div className="h-44 bg-gray-200 rounded-lg"></div>
                <div className="h-44 bg-gray-200 rounded-lg"></div>
              </>
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className="p-6 border-t">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h1>
              <p className="text-xl text-gray-600">{selectedProperty.location}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusBadgeColor(
                selectedProperty.status
              )}`}
            >
              {selectedProperty.status}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600 mb-6">
            €{selectedProperty.price.toLocaleString()}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Size</div>
              <div className="text-xl font-semibold text-gray-900">{selectedProperty.size}m²</div>
            </div>
            {selectedProperty.bedrooms && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Bedrooms</div>
                <div className="text-xl font-semibold text-gray-900">{selectedProperty.bedrooms}</div>
              </div>
            )}
            {selectedProperty.bathrooms && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Bathrooms</div>
                <div className="text-xl font-semibold text-gray-900">{selectedProperty.bathrooms}</div>
              </div>
            )}
            {selectedProperty.yearBuilt && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Year Built</div>
                <div className="text-xl font-semibold text-gray-900">{selectedProperty.yearBuilt}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedProperty.description}
            </p>
          </div>

          {/* Property Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium text-gray-900">{selectedProperty.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Address</span>
                  <span className="font-medium text-gray-900">{selectedProperty.address}</span>
                </div>
                {selectedProperty.floors && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Floors</span>
                    <span className="font-medium text-gray-900">{selectedProperty.floors}</span>
                  </div>
                )}
              </div>
            </div>

            {selectedProperty.features && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.features.split(',').map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {feature.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timestamps */}
          <div className="text-sm text-gray-500 pt-6 border-t">
            <div className="flex gap-6">
              <span>Created: {new Date(selectedProperty.createdAt).toLocaleString()}</span>
              <span>Updated: {new Date(selectedProperty.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <OffCanvas open={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Property">
        <PropertyForm
          initialValues={selectedProperty}
          onSubmit={handleUpdateProperty}
          onCancel={() => setShowEditModal(false)}
        />
      </OffCanvas>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)}></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteProperty}
                isLoading={loading}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Property'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
