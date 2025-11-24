import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ClientsPage } from '../pages/ClientsPage';
import { PropertiesPage } from '../pages/PropertiesPage';
import { PropertyDetailPage } from '../pages/PropertyDetailPage';
import { AgendaPage } from '../pages/AgendaPage';

interface RouteGuardProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<RouteGuardProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute: React.FC<RouteGuardProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

import { SettingsPage } from '../pages/SettingsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes - no layout */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      
      {/* Private routes wrapped in shared Layout */}
      <Route path="/*" element={
        <PrivateRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="agenda" element={<AgendaPage />} />
              <Route path="properties" element={<PropertiesPage />} />
              <Route path="properties/:id" element={<PropertyDetailPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  );
};
