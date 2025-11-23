import React from 'react';

type Props = {
  readonly title: string;
  readonly subtitle?: string;
  readonly actions?: React.ReactNode;
};

export default function PageHeader({ title, subtitle, actions }: Readonly<Props>) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div>{actions}</div>
    </div>
  );
}
