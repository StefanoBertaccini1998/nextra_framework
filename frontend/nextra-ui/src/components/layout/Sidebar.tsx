
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
        <img src="/assets/logo/icon/logo-icon.svg" alt="Nextra" className="w-8 h-8" />
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
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text'
                }
              `}
            >
              <Icon className={`w-6 h-6 shrink-0 transition-all duration-200 ${isActive ? 'stroke-2 text-primary' : 'text-text-secondary group-hover:text-text'}`} />
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto flex flex-col gap-4">
        {/* User Profile */}
        <div className="px-3 py-2 rounded-lg bg-surface-hover">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="w-8 h-8 text-primary" />
            <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
              <div className="font-medium text-text">John Doe</div>
              <div className="text-sm text-text-secondary">Administrator</div>
            </div>
          </div>
        </div>

        {/* Version info */}
        <div className="text-sm text-text-secondary px-2">
          <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
            v0.1 · MVP
          </span>
          <span className={`transition-opacity duration-300 ${!isOpen ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
            v0.1
          </span>
        </div>

        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center w-full h-9 rounded-lg transition-colors duration-200
                   bg-primary/10 hover:bg-primary/20 text-primary"
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeftIcon className="w-5 h-5 stroke-2" />
          ) : (
            <ChevronRightIcon className="w-5 h-5 stroke-2" />
          )}
        </button>
      </div>
    </aside>
  );
};
