
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/dashboard', icon: HomeIcon, label: 'Dashboard' },
  { path: '/analytics', icon: ChartBarIcon, label: 'Analytics' },
  { path: '/clients', icon: UserGroupIcon, label: 'Clients' },
  { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  return (
    <aside className={`w-20 lg:w-64 h-full bg-surface border-r border-border p-4 flex flex-col gap-4 transition-all duration-300 ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center gap-3 px-2">
        <img src="/assets/logo/icon/logo-icon.svg" alt="Nextra" className="w-8 h-8" />
        <span className="text-xl font-semibold text-primary hidden lg:block">Nextra</span>
        <button onClick={onToggle} className="ml-auto lg:hidden">
          <span className="sr-only">Toggle Sidebar</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path}
              to={item.path}
              title={item.label}
              className={`
                group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface-hover'
                }
              `}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto text-sm text-text-secondary px-2">
        <span className="hidden lg:inline">v0.1 · MVP</span>
        <span className="lg:hidden">v0.1</span>
      </div>
    </aside>
  );
};
