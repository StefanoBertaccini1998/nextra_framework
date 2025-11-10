import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { baseTheme, darkTheme, accessibleTheme, type NextraTheme, type ColorScheme } from "./theme";

type ThemeContextType = {
  theme: NextraTheme;
  setTheme: (t: NextraTheme) => void;
  setThemeByName: (name: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: baseTheme,
  setTheme: () => {},
  setThemeByName: () => {},
});

const STORAGE_KEY = 'nextra-theme';

const getThemeByName = (name: ColorScheme): NextraTheme => {
  switch (name) {
    case 'dark':
      return darkTheme;
    case 'accessible':
      return accessibleTheme;
    default:
      return baseTheme;
  }
};

const getInitialTheme = (): NextraTheme => {
  try {
    // Check localStorage first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return getThemeByName(parsed.name);
    }

    // Check system preference
    if (globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return darkTheme;
    }

    // Default to light theme
    return baseTheme;
  } catch {
    return baseTheme;
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<NextraTheme>(getInitialTheme);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (!savedTheme) {
        setTheme(e.matches ? darkTheme : baseTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply theme colors as CSS variables
    for (const [key, value] of Object.entries(theme.colors)) {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    }

    // Apply theme class
    document.documentElement.classList.remove('light', 'dark', 'accessible');
    document.documentElement.classList.add(theme.name);

    // Save theme to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const setThemeByName = (name: ColorScheme) => {
    setTheme(getThemeByName(name));
  };

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    setThemeByName,
  }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
