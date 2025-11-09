import React, { createContext, useCallback, useContext, useState } from 'react';

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
    info: '💡',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  const bgColors = {
    info: 'bg-infoLight text-info border-info/20',
    success: 'bg-successLight text-success border-success/20',
    warning: 'bg-warningLight text-warning border-warning/20',
    error: 'bg-errorLight text-error border-error/20',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg shadow-md bg-white border ${bgColors[type]}`}
      role="alert"
    >
      <span className="text-lg">{icons[type]}</span>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        {message && <p className="mt-1 text-sm">{message}</p>}
      </div>
      <button
        onClick={onClose}
        className="text-current opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
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
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-md">
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