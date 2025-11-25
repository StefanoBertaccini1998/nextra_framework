import React from 'react';

interface Props {
  readonly message?: string;
  readonly open?: boolean;
  readonly onClose?: () => void;
}

export default function Toast({ message, open, onClose }: Readonly<Props>) {
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(t);
  }, [open]);

  if (!open || !message) return null;
  return (
    <div 
      className="fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg max-w-md" 
      style={{ 
        zIndex: 10000,
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text)',
        border: '1px solid var(--color-border)'
      }}
    >
      <div className="flex items-center gap-3">
        <svg className="w-5 h-5 shrink-0" style={{ color: 'var(--color-primary)' }} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}
