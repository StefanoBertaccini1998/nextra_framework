import React from 'react';

const STORAGE_KEY = 'nextra_ui_theme';

export default function ThemeSwitcher() {
  const [theme, setTheme] = React.useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    } catch {
      return 'light';
    }
  });

  React.useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="px-2 py-1 rounded border"
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
