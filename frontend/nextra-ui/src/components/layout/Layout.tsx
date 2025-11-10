import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AiHelper } from './AiHelper';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAiHelperOpen, setAiHelperOpen] = useState(false);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex-none h-16">
          <Navbar 
            onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
            onAiHelperClick={() => setAiHelperOpen(!isAiHelperOpen)} 
          />
        </div>
        
        <main className="flex-1 transition-all duration-200 overflow-hidden">
          <div className="container mx-auto h-full">
            {children}
          </div>
        </main>

        <div className="flex-none">
          <Footer />
        </div>
      </div>

      {/* AI Helper */}
      <AiHelper isOpen={isAiHelperOpen} onClose={() => setAiHelperOpen(false)} />
    </div>
  );
};