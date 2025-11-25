import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingScreen, useToast, Button, OffCanvas } from '@nextra/ui-lib';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/redux';
import { PropertyForm } from '../components/forms/PropertyForm';
import { ClientForm } from '../components/forms/ClientForm';
import { logout } from '../store/slices/authSlice';
import {
  createProperty as createPropertyThunk,
  uploadPropertyImages,
  fetchProperties,
  type Property,
} from '../store/slices/propertiesSlice';
import {
  createClient as createClientThunk,
  fetchClients,
  type Client,
} from '../store/slices/clientsSlice';

export const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCreatePropertyModal, setShowCreatePropertyModal] = useState(false);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateProperty = async (values: Partial<Property>, files?: File[]) => {
    try {
      const createdProperty = await dispatch(createPropertyThunk(values as any)).unwrap();
      
      if (files && files.length > 0 && createdProperty.id) {
        await dispatch(uploadPropertyImages({ propertyId: createdProperty.id, files })).unwrap();
      }
      
      addToast('success', 'Property created', 'The property was successfully created');
      setShowCreatePropertyModal(false);
      dispatch(fetchProperties({}));
    } catch (err: any) {
      addToast('error', 'Failed to create property', err.message || 'Create failed');
    }
  };

  const handleCreateClient = async (values: Partial<Client>) => {
    try {
      await dispatch(createClientThunk(values as any)).unwrap();
      addToast('success', 'Client created', 'The client was successfully created');
      setShowCreateClientModal(false);
      dispatch(fetchClients({}));
    } catch (err: any) {
      addToast('error', 'Failed to create client', err.message || 'Create failed');
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to login
      navigate('/login');
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} message="Loading dashboard..." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-4">
            <img src="/assets/logo/icon/nextra-icon.svg" alt="Nextra" className="w-8 h-8" />
            <h1 className="text-2xl font-semibold text-text">Dashboard</h1>
          </div>
          <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Welcome Card */}
          <motion.div
            className="bg-surface rounded-lg shadow p-6 col-span-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-medium text-text mb-2">Welcome to Nextra</h2>
            <p className="text-text-secondary">
              This is your dashboard. Here you'll find an overview of your properties,
              clients, and important metrics. Use the sidebar to navigate to different sections.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Quick Actions */}
          <motion.div 
            className="bg-surface rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-medium text-text mb-4">Quick Actions</h3>
            <div className="flex gap-3">
              <Button
                variant="success"
                size="lg"
                fullWidth
                onClick={() => setShowCreatePropertyModal(true)}
                startIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Add Property
              </Button>
              <Button
                variant="success"
                size="lg"
                fullWidth
                onClick={() => setShowCreateClientModal(true)}
                startIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                Add Client
              </Button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            className="bg-surface rounded-lg shadow p-6 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-medium text-text mb-4">Recent Activity</h3>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              {[
                { time: '2h ago', text: 'New feature added' },
                { time: '4h ago', text: 'System update completed' },
                { time: '1d ago', text: 'Database optimization finished' }
              ].map((activity, index) => (
                <motion.div
                  key={activity.text}
                  className="flex justify-between items-center border-b border-border pb-4 last:border-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <span className="text-text">{activity.text}</span>
                  <span className="text-sm text-text-secondary">{activity.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Create Property Modal */}
      <OffCanvas open={showCreatePropertyModal} onClose={() => setShowCreatePropertyModal(false)} title="Add New Property">
        <PropertyForm
          onSubmit={handleCreateProperty}
          onCancel={() => setShowCreatePropertyModal(false)}
        />
      </OffCanvas>

      {/* Create Client Modal */}
      <OffCanvas open={showCreateClientModal} onClose={() => setShowCreateClientModal(false)} title="Add New Client">
        <ClientForm
          onSubmit={handleCreateClient}
          onCancel={() => setShowCreateClientModal(false)}
        />
      </OffCanvas>
    </>
  );
};