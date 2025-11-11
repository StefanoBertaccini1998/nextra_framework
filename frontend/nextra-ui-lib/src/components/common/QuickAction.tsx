import React from 'react';

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function QuickAction({ onClick, children, className }: Props) {
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded bg-indigo-600 text-white ${className ?? ''}`}>
      {children}
    </button>
  );
}
