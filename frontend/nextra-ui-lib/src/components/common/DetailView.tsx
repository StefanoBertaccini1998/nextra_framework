import React from 'react';

type Props = {
  readonly title?: string;
  readonly children: React.ReactNode;
};

export default function DetailView({ title, children }: Readonly<Props>) {
  return (
    <div className="p-4 bg-white rounded shadow">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>}
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
