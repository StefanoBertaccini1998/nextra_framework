import React from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentIcon,
  CalendarIcon,
  CogIcon,
  ClipboardIcon,
  ChartPieIcon,
  UsersIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  InboxIcon,
} from '@heroicons/react/24/solid';

export interface QuickActionItem {
  icon: 'plus' | 'team' | 'reports' | 'document' | 'calendar' | 'settings' | 
        'clipboard' | 'chart' | 'users' | 'office' | 'finance' | 'inbox';
  label: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

const iconMap = {
  plus: PlusIcon,
  team: UsersIcon,
  reports: ChartPieIcon,
  document: DocumentIcon,
  calendar: CalendarIcon,
  settings: CogIcon,
  clipboard: ClipboardIcon,
  chart: ChartBarIcon,
  users: UserGroupIcon,
  office: BuildingOfficeIcon,
  finance: CurrencyDollarIcon,
  inbox: InboxIcon,
};

interface QuickActionProps {
  action: QuickActionItem;
  index?: number;
}

export const QuickAction: React.FC<QuickActionProps> = ({ action, index = 0 }) => {
  const Icon = iconMap[action.icon];
  const variant = action.variant || 'default';

  const variantClasses = {
    default: 'bg-surface hover:bg-surface-hover text-text-secondary fill-current',
    primary: 'bg-primary hover:bg-primary-dark text-white fill-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-white fill-white'
  };

  return (
    <motion.button
      className={`w-full px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${variantClasses[variant]}`}
      whileHover={{ x: 4 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 + (index * 0.1) }}
      onClick={action.onClick}
    >
      <Icon className={`w-5 h-5 ${variant === 'default' ? 'text-primary' : 'text-white'}`} />
      <span className="font-medium">{action.label}</span>
    </motion.button>
  );
};