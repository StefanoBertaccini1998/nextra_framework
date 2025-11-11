import React from 'react';

type Props = {
  onClick?: () => void;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
};

export default function IconButton({ onClick, icon, title, className }: Props) {
  return (
    <button type="button" onClick={onClick} title={title} className={`p-2 rounded ${className ?? ''}`}>
      {icon}
    </button>
  );
}
