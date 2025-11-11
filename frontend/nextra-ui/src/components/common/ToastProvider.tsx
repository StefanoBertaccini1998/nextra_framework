import React from 'react';
import Toast from './Toast';

type ToastItem = {
  id: string;
  type?: string;
  title?: string;
  message: string;
};

type ToastContextType = {
  addToast: (type: string, title: string, message?: string) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const addToast = React.useCallback((type: string, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    const text = message ? `${title}${message ? `: ${message}` : ''}` : title;
  // Use console.log so messages appear even if debug-level logs are filtered
  // eslint-disable-next-line no-console
  console.log('[App ToastProvider] addToast', { id, type, title, message: text });
    setToasts((s: ToastItem[]) => [...s, { id, type, title, message: text }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((s: ToastItem[]) => s.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div aria-live="polite">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            open={true}
            onClose={() => {
              // eslint-disable-next-line no-console
              console.log('[App ToastProvider] removing toast', t.id);
              removeToast(t.id);
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

export default ToastProvider;
