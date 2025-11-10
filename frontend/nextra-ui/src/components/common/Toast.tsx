import React, { createContext, useCallback, useContext, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  addToast: (type: ToastType, title: string, message?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
});

export const useToast = () => useContext(ToastContext);

const ToastItem: React.FC<Toast & { onClose: () => void }> = ({
  type,
  title,
  message,
  onClose,
}) => {
  const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
  };

  const styles = {
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      icon: 'text-blue-500',
      closeHover: 'bg-blue-100'
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      icon: 'text-green-500',
      closeHover: 'bg-green-100'
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      icon: 'text-yellow-500',
      closeHover: 'bg-yellow-100'
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      icon: 'text-red-500',
      closeHover: 'bg-red-100'
    },
  };

  const Icon = icons[type];
  const style = styles[type];

  return (
    <Transition
      appear={true}
      show={true}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`
          flex items-start gap-3 p-4 rounded-lg shadow-md border
          ${style.bg} ${style.text} ${style.border}
        `}
        role="alert"
      >
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.icon}`} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">{title}</h4>
          {message && <p className="mt-1 text-sm">{message}</p>}
        </div>
        <button
          onClick={onClose}
          className={`
            shrink-0 -mt-1 -mr-1 p-1.5 rounded-lg 
            transition-colors duration-200
            ${style.text} hover:bg-opacity-100
            bg-opacity-10 bg-current
          `}
          aria-label="Close notification"
        >
          <XMarkIcon className="w-4 h-4 text-white" />
        </button>
      </div>
    </Transition>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto remove after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container - Now positioned top-right */}
      <div className="fixed top-4 right-4 z-100 flex flex-col gap-3 max-w-md w-full px-4">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};