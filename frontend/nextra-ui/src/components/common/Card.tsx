export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div className={`bg-surface p-4 rounded-lg shadow ${className}`}>{children}</div>
);
