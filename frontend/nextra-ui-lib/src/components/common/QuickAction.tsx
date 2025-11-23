import React from 'react';

type Props = {
  readonly onClick: () => void;
  readonly children: React.ReactNode;
  readonly className?: string;
};

export default function QuickAction({ onClick, children, className }: Readonly<Props>) {
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded bg-indigo-600 text-white ${className ?? ''}`}>
      {children}
    </button>
  );
}
