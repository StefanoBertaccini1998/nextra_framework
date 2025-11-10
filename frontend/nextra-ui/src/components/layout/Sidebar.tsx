
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon,
  UserCircleIcon
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
    <aside className={`
      fixed lg:static top-0 left-0 z-50
      h-[100dvh] bg-surface border-r border-border
      transition-all duration-300 ease-in-out overflow-hidden
      ${isOpen ? 'w-64' : 'w-20'}
      flex flex-col p-4
    `}>
      <div className="flex items-center gap-3 px-2 mb-8">
        <img src="/assets/logo/icon/logo-icon.svg" alt="Nextra" className={`transition-all duration-200 ${isOpen ? 'w-10 h-10' : 'w-12 h-12'}`} />
        <span className={`text-xl font-semibold text-primary transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
          Nextra
        </span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1 justify-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link 
              key={item.path}
              to={item.path}
              title={item.label}
              className={`
                group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-primary/15 text-primary font-medium shadow-[0_0_12px_-3px] shadow-primary/40 ring-1 ring-primary/30 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-primary before:rounded-r-full' 
                  : 'hover:bg-surface-hover'
                }
              `}
            >
              <Icon className={`w-6 h-6 shrink-0 transition-all duration-200 ${isActive ? 'stroke-2 text-primary' : 'text-primary/60 group-hover:text-primary'}`} />
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto flex flex-col gap-4">
        {/* User Profile */}
        <Link 
          to="/settings" 
          title="Profile Settings"
          className="px-3 py-2 rounded-lg bg-surface-hover hover:bg-surface-hover/80 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <UserCircleIcon className={`shrink-0 text-primary transition-all duration-200 stroke-[1.5] ${isOpen ? 'w-8 h-8' : 'w-6 h-6'}`} />
            <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
              <div className="font-medium text-text">John Doe</div>
              <div className="text-sm text-text-secondary">Administrator</div>
            </div>
          </div>
        </Link>

        {/* Version info */}
        <div className="text-sm text-text-secondary px-2">
          <div className={`transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            v0.1 · MVP
          </div>
          <div className={`transition-all duration-300 ${!isOpen ? 'opacity-100 flex justify-center' : 'opacity-0 hidden'}`}>
            v0.1
          </div>
        </div>

        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center w-full h-9 rounded-lg transition-colors duration-200
                   bg-primary/10 hover:bg-primary/20 text-primary"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-5 h-5 stroke-2 text-primary" />
          ) : (
            <ChevronRightIcon className="w-5 h-5 stroke-[2.5] text-primary" />
          )}
        </button>
      </div>
    </aside>
  );
};
