import React from 'react';

// Lightweight Layout and Navbar components — minimal implementations that
// allow consumers of the library to import layout primitives without
// bringing the entire app bundle or depending on the app internals.

export const Navbar: React.FC<{ title?: string }> = ({ title = 'App' }) => (
  <nav className="w-full bg-gray-800 text-white p-4">
    <div className="container mx-auto font-medium">{title}</div>
  </nav>
);

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
};

export default Layout;
