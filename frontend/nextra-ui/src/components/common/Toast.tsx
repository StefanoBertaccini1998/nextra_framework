import React from 'react';

type Props = {
  message?: string;
  open?: boolean;
  onClose?: () => void;
};

export default function Toast({ message, open, onClose }: Props) {
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(t);
  }, [open]);

  if (!open || !message) return null;
  // Inline style fallback in case Tailwind classes are not applied at runtime
  const style: React.CSSProperties = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    background: '#111827', // gray-900
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 8,
    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
    zIndex: 9999,
  };

  return (
    <div style={style} role="status" aria-live="polite">
      {message}
    </div>
  );
}
