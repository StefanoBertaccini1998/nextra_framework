import { useTheme } from '../../theme/ThemeProvider';
import ThemeSwitcher from '../ThemeSwitcher';

export const Topbar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header className="w-full flex items-center justify-between gap-4 px-4 py-3 bg-surface border-b border-border">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-md hover:bg-surfaceHover">☰</button>
        <h2 className="text-lg font-semibold text-text">{theme.name.toUpperCase()}</h2>
      </div>

      <div className="flex items-center gap-3">
        <ThemeSwitcher />
      </div>
    </header>
  );
};
