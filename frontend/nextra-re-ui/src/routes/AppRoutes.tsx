import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'nextra-ui/components/layout';
import ClientsList from './pages/clients/ClientsList';
import PropertiesList from './pages/properties/PropertiesList';
import { SettingsPage } from 'nextra-ui/pages/settings/SettingsPage';
import { DashboardPage } from 'nextra-ui/pages/dashboard/DashboardPage';

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
              <Route path="properties" element={<PropertiesList />} />
              <Route path="clients" element={<ClientsList />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  );
};