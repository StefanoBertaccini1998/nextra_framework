/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include UI library sources so Tailwind scans component classes
    "../nextra-ui-lib/src/**/*.{js,ts,jsx,tsx}",
    // Also include built files in case the library is imported from dist
    "../nextra-ui-lib/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primaryHover)",
          active: "var(--color-primaryActive)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondaryHover)",
          active: "var(--color-secondaryActive)",
        },
        accent: "var(--color-accent)",
        navbar: {
          DEFAULT: "var(--color-navbar)",
          text: "var(--color-navbarText)",
          hover: "var(--color-navbarHover)",
        },
        background: "var(--color-background)",
        surface: {
          DEFAULT: "var(--color-surface)",
          hover: "var(--color-surfaceHover)",
          active: "var(--color-surfaceActive)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-textSecondary)",
          disabled: "var(--color-textDisabled)",
          inverse: "var(--color-textInverse)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          hover: "var(--color-borderHover)",
          focus: "var(--color-borderFocus)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          light: "var(--color-successLight)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          light: "var(--color-warningLight)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          light: "var(--color-errorLight)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          light: "var(--color-infoLight)",
        },
      },
    },
  },
  plugins: [],
  // Keep some commonly used icon/size/stroke utilities that may be built dynamically
  safelist: [
    "w-4",
    "w-5",
    "w-6",
    "h-4",
    "h-5",
    "h-6",
    "stroke-1",
    "stroke-2",
    "shrink-0",
    "opacity-0",
    "opacity-100",
    "p-2",
    "px-2",
    "py-1",
    "rounded",
    "rounded-lg",
  ],
};
