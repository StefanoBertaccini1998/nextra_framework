import React from 'react';

type Props = {
  readonly title?: string;
  readonly children: React.ReactNode;
  readonly onClose?: () => void;
};

export default function DetailView({ title, children, onClose }: Readonly<Props>) {
  return (
    <div className="p-4 rounded shadow" style={{ backgroundColor: 'var(--color-surface)' }}>
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium" style={{ color: 'var(--color-text)' }}>{title}</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Close details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="text-sm" style={{ color: 'var(--color-text)' }}>{children}</div>
    </div>
  );
}
