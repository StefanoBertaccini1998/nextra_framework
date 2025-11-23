import React from 'react';

type Tab<T = string> = { id: T; label: string };

type Props<T = string> = {
  readonly tabs: Tab<T>[];
  readonly value?: T;
  readonly onChange?: (id: T) => void;
};

export default function Tabs<T>({ tabs, value, onChange }: Readonly<Props<T>>) {
  const [active, setActive] = React.useState<T | undefined>(value ?? tabs[0]?.id);

  React.useEffect(() => {
    if (value !== undefined) setActive(value);
  }, [value]);

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((t) => (
          <button
            key={String(t.id)}
            onClick={() => {
              setActive(t.id);
              onChange?.(t.id);
            }}
            className={`py-4 px-1 border-b-2 ${active === t.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500'}`}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
