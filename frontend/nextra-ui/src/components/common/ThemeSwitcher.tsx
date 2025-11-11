import { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";
import { baseTheme, darkTheme, darkRedTheme, accessibleTheme, type NextraTheme } from "../../theme/theme";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SunIcon, 
  MoonIcon,
  EyeIcon,
  FireIcon,
  SwatchIcon
} from '@heroicons/react/24/solid';

const themes = [
  { theme: baseTheme, icon: SunIcon, label: "Light Theme" },
  { theme: darkTheme, icon: MoonIcon, label: "Dark Theme" },
  { theme: darkRedTheme, icon: FireIcon, label: "Dark Red Theme" },
  { theme: accessibleTheme, icon: EyeIcon, label: "Accessible Theme" }
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: NextraTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-surface border border-border shadow-lg hover:bg-surface-hover transition-all duration-200 flex items-center justify-center"
        >
          <SwatchIcon className="w-8 h-8 text-text" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 0.9, y: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-2 bg-surface rounded-lg shadow-lg border border-border p-2 min-w-[180px]"
            >
              {themes.map(({ theme: themeOption, icon: Icon, label }) => (
                <button
                  key={themeOption.name}
                  onClick={() => handleThemeChange(themeOption)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                    ${theme.name === themeOption.name 
                      ? 'bg-primary/15 text-primary font-medium' 
                      : 'text-text-secondary hover:bg-surface-hover hover:text-text'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
