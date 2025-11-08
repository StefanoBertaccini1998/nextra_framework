import type { PropsWithChildren } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { Footer } from '../components/layout/Footer';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-background text-text">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
        <Footer />
      </div>
      {/* Right area reserved for AI helper in future */}
      <aside className="w-96 border-l border-border hidden lg:block p-4">AI helper (coming)</aside>
    </div>
  );
};
