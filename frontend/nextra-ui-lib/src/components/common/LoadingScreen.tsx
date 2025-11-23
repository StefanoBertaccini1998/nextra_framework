import React from 'react';

type Props = {
  readonly isLoading?: boolean;
  readonly message?: string;
};

export default function LoadingScreen({ isLoading = true, message }: Readonly<Props>) {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" style={{ backgroundColor: 'var(--color-overlay)' }}>
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        {message && <div className="text-sm text-secondary">{message}</div>}
      </div>
    </div>
  );
}
