interface PageHeaderProps {
  title: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => (
  <div className="mb-4">
    <h1 className="text-2xl font-semibold text-text">{title}</h1>
    {description && <p className="text-sm text-textSecondary">{description}</p>}
  </div>
);
