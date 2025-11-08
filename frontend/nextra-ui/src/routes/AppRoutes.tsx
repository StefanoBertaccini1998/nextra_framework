import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

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

// Placeholder Pages
const PropertiesPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-text">Properties</h1>
    <div className="bg-surface rounded-lg shadow p-6">
      <p className="text-text-secondary text-center py-12">
        Properties management coming soon
      </p>
    </div>
  </div>
);

const ClientsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-text">Clients</h1>
    <div className="bg-surface rounded-lg shadow p-6">
      <p className="text-text-secondary text-center py-12">
        Client management coming soon
      </p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-semibold text-text">Settings</h1>
    <div className="bg-surface rounded-lg shadow p-6">
      <p className="text-text-secondary text-center py-12">
        Settings panel coming soon
      </p>
    </div>
  </div>
);

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
              <Route path="properties" element={<PropertiesPage />} />
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
