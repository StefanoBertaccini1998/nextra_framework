import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import type { ColorScheme } from '../../theme/theme';

// SVG icons as components for better rendering and styling
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const AccessibleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="2"/>
    <path d="M12 8v13"/>
    <path d="M8 14l4-4 4 4"/>
  </svg>
);

const themes: { name: ColorScheme; label: string; Icon: () => React.JSX.Element }[] = [
  { name: 'light', label: 'Light', Icon: SunIcon },
  { name: 'dark', label: 'Dark', Icon: MoonIcon },
  { name: 'dark-red', label: 'Dark Red', Icon: FlameIcon },
  { name: 'accessible', label: 'Accessible', Icon: AccessibleIcon },
];

export default function ThemeSwitcher() {
  const { theme, setThemeByName } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const currentTheme = themes.find((t) => t.name === theme.name) || themes[0];

  const handleThemeSelect = (themeName: ColorScheme) => {
    setThemeByName(themeName);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          borderRadius: 8,
          border: 'none',
          background: 'var(--color-primary)',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 500,
        }}
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        <currentTheme.Icon />
        <span>{currentTheme.label}</span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            marginBottom: 8,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: 160,
            zIndex: 10000,
          }}
        >
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => handleThemeSelect(t.name)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                background: theme.name === t.name ? 'var(--color-surfaceActive)' : 'transparent',
                color: 'var(--color-text)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                borderRadius: theme.name === t.name ? 6 : 0,
              }}
              onMouseEnter={(e) => {
                if (theme.name !== t.name) {
                  e.currentTarget.style.background = 'var(--color-surfaceHover)';
                }
              }}
              onMouseLeave={(e) => {
                if (theme.name !== t.name) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <t.Icon />
              <span>{t.label}</span>
              {theme.name === t.name && <span style={{ marginLeft: 'auto' }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
