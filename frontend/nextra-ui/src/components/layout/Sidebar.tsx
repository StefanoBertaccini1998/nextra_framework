
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../theme/ThemeProvider';

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
  { path: '/properties', icon: BuildingOfficeIcon, label: 'Properties' },
  { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
];

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();
  return (
    <aside 
      style={{
        backgroundColor: theme.colors.primary,
        borderRight: `1px solid ${theme.colors.primary}30`
      }}
      className={`
        fixed lg:static top-0 left-0 z-50 lg:z-auto
        h-dvh transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'w-64' : 'w-20'}
        flex flex-col p-4
      `}>
      <div className={`flex mb-8 w-full transition-all duration-300 ease-in-out ${isOpen ? 'flex-row items-center gap-3' : 'justify-center'}`}>
        <div 
          className="bg-white rounded-lg flex items-center justify-center p-0.5 overflow-hidden"
          style={{ 
            width: '48px',
            height: '48px'
          }}
        >
          <img 
            src="/assets/logo/icon/nextra_full_gradient_transparent.svg" 
            alt="Nextra" 
            style={{
              width: isOpen ? '120%' : '130%',
              height: isOpen ? '120%' : '130%',
              objectFit: 'contain',
              transform: `scale(${isOpen ? '1' : '1.05'})`,
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>
        <span 
          className="text-xl font-semibold text-white overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxWidth: isOpen ? '200px' : '0',
            opacity: isOpen ? 1 : 0,
            transform: `translateX(${isOpen ? '0' : '-10px'})`,
          }}
        >
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
              style={{
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)'
              }}
              className={`
                group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                font-medium hover:bg-white/10 hover:text-white
              `}
            >
              <Icon className={`w-6 h-6 shrink-0 transition-all duration-200 ${isActive ? 'stroke-2' : 'stroke-1'}`} />
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
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
          className={`rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center ${isOpen ? 'px-3 py-2' : 'p-2'}`}
        >
          <div className={`flex items-center gap-3 ${isOpen ? 'w-full' : 'justify-center'}`}>
            <div className="flex items-center justify-center">
              <UserCircleIcon className="w-8 h-8 shrink-0 text-white stroke-[1.5]" />
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}>
              <div className="font-medium text-white whitespace-nowrap">John Doe</div>
              <div className="text-sm text-white/70 whitespace-nowrap">Administrator</div>
            </div>
          </div>
        </Link>

        {/* Version info */}
        <div className="text-sm text-white/50 px-2">
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
          style={{
            backgroundColor: theme.colors.surface,
            color: theme.colors.primary,
            borderColor: theme.colors.border,
            borderWidth: '1px'
          }}
    // Make the collapse button always visible for now (helps debug responsive issues).
    // Change back to "hidden lg:flex" if you want it hidden on small screens.
    className="flex items-center justify-center w-full h-9 rounded-lg transition-all duration-200
         hover:bg-surfaceHover hover:border-borderHover"
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
