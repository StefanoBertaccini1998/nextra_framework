import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AiHelper } from './AiHelper';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAiHelperOpen, setAiHelperOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar 
          onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
          onAiHelperClick={() => setAiHelperOpen(!isAiHelperOpen)} 
        />
        
        <main className="flex-1 p-6 transition-all duration-200">
          <div className="container mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </div>

      {/* AI Helper */}
      <AiHelper isOpen={isAiHelperOpen} onClose={() => setAiHelperOpen(false)} />
    </div>
  );
};