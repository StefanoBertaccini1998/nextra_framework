import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { AiHelper } from './AiHelper';
import ThemeSwitcher from '../common/ThemeSwitcher';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAiHelperOpen, setAiHelperOpen] = useState(false);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <main 
          className="flex-1 transition-all duration-200 overflow-hidden p-6"
          style={{ 
            marginRight: isAiHelperOpen ? '320px' : '0',
            width: `calc(100% - ${isAiHelperOpen ? '320px' : '0px'})`
          }}
        >
          <div className="container mx-auto h-full">
            {children}
          </div>
        </main>

        <div 
          className="flex-none transition-all duration-200"
          style={{ 
            marginRight: isAiHelperOpen ? '320px' : '0',
            width: `calc(100% - ${isAiHelperOpen ? '320px' : '0px'})`
          }}
        >
          <Footer />
        </div>
      </div>

      {/* AI Helper */}
      <AiHelper 
        isOpen={isAiHelperOpen} 
        onClose={() => setAiHelperOpen(!isAiHelperOpen)} // Toggle the state when clicking the handle or close button
      />

      {/* Theme Switcher - positioned to move with AI Helper */}
      <div 
        className="transition-all duration-200"
        style={{ 
          position: 'fixed',
          bottom: '1.5rem',
          right: isAiHelperOpen ? '336px' : '1.5rem' // 320px + 16px when AiHelper is open
        }}
      >
        <ThemeSwitcher />
      </div>
    </div>
  );
};