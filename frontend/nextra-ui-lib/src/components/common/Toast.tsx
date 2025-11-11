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
  return (
    <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded shadow z-50">
      {message}
    </div>
  );
}
