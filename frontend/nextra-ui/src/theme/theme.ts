export type ColorScheme = 'light' | 'dark' | 'dark-red' | 'accessible';

export type NextraTheme = {
    name: ColorScheme;
    colors: {
        // Brand colors
        primary: string;
        primaryHover: string;
        primaryActive: string;
        secondary: string;
        secondaryHover: string;
        secondaryActive: string;
        accent: string;

        // Navbar colors
        navbar: string;
        navbarText: string;
        navbarHover: string;

        // Surface colors
        background: string;
        surface: string;
        surfaceHover: string;
        surfaceActive: string;
        overlay: string;

        // Text colors
        text: string;
        textSecondary: string;
        textDisabled: string;
        textInverse: string;

        // Border colors
        border: string;
        borderHover: string;
        borderFocus: string;

        // Status colors
        success: string;
        successLight: string;
        warning: string;
        warningLight: string;
        error: string;
        errorLight: string;
        info: string;
        infoLight: string;
    };
    radius: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    font: {
        body: string;
        heading: string;
        monospace: string;
    };
};

/* === 🟢 Light Theme === */
export const baseTheme: NextraTheme = {
    name: "light",
    colors: {
        // Brand colors
        primary: "#0066CC",
        primaryHover: "#0052A3",
        primaryActive: "#004080",
        secondary: "#6B46C1",
        secondaryHover: "#553C9A",
        secondaryActive: "#44337A",
        accent: "#F59E0B",

        // Navbar colors
        navbar: "#0066CC",
        navbarText: "#FFFFFF",
        navbarHover: "#0052A3",

        // Surface colors
        background: "#F8FAFC",
        surface: "#FFFFFF",
        surfaceHover: "#F1F5F9",
        surfaceActive: "#E2E8F0",
        overlay: "rgba(0, 0, 0, 0.5)",

        // Text colors
        text: "#1E293B",
        textSecondary: "#64748B",
        textDisabled: "#94A3B8",
        textInverse: "#FFFFFF",

        // Border colors
        border: "#E2E8F0",
        borderHover: "#CBD5E1",
        borderFocus: "#0066CC",

        // Status colors
        success: "#16A34A",
        successLight: "#DCFCE7",
        warning: "#FBBF24",
        warningLight: "#FEF3C7",
        error: "#DC2626",
        errorLight: "#FEE2E2",
        info: "#0EA5E9",
        infoLight: "#E0F2FE",
    },
    radius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
    },
    font: {
        body: "system-ui, -apple-system, sans-serif",
        heading: "Inter, system-ui, sans-serif",
        monospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    },
};

/* === 🌙 Dark Theme === */
export const darkTheme: NextraTheme = {
    name: "dark",
    colors: {
        // Brand colors
        primary: "#3B82F6",
        primaryHover: "#2563EB",
        primaryActive: "#1D4ED8",
        secondary: "#A855F7",
        secondaryHover: "#9333EA",
        secondaryActive: "#7E22CE",
        accent: "#FBBF24",

        // Navbar colors
        navbar: "#3B82F6",
        navbarText: "#FFFFFF",
        navbarHover: "#2563EB",

        // Surface colors
        background: "#0F172A",
        surface: "#1E293B",
        surfaceHover: "#334155",
        surfaceActive: "#475569",
        overlay: "rgba(0, 0, 0, 0.75)",

        // Text colors
        text: "#E2E8F0",
        textSecondary: "#94A3B8",
        textDisabled: "#64748B",
        textInverse: "#0F172A",

        // Border colors
        border: "#334155",
        borderHover: "#475569",
        borderFocus: "#3B82F6",

        // Status colors
        success: "#22C55E",
        successLight: "#064E3B",
        warning: "#EAB308",
        warningLight: "#451A03",
        error: "#EF4444",
        errorLight: "#450A0A",
        info: "#0EA5E9",
        infoLight: "#082F49",
    },
    radius: baseTheme.radius,
    font: baseTheme.font,
};

/* === 🔴 Dark Red Theme === */
export const darkRedTheme: NextraTheme = {
    name: "dark-red",
    colors: {
        ...darkTheme.colors,
        // Brand colors
        primary: "#FF3B30",
        primaryHover: "#E0321F",
        primaryActive: "#C02D1D",
        secondary: "#FF6B6B",
        secondaryHover: "#FF5252",
        secondaryActive: "#FF3838",
        accent: "#FF9500",

        // Navbar colors
        navbar: "#FF3B30",
        navbarText: "#FFFFFF",
        navbarHover: "#E0321F",

        // Override dark theme colors
        background: "#1A0F0F",
        surface: "#2D1F1F",
        surfaceHover: "#3D2929",
        surfaceActive: "#4D3333"
    },
    radius: baseTheme.radius,
    font: baseTheme.font,
};

/* === ♿ Accessible Theme (High Contrast) === */
export const accessibleTheme: NextraTheme = {
    name: "accessible",
    colors: {
        // Brand colors
        primary: "#0051BA",
        primaryHover: "#003F8F",
        primaryActive: "#002D66",
        secondary: "#7209B7",
        secondaryHover: "#5B0A91",
        secondaryActive: "#44066D",
        accent: "#FFB300",

        // Navbar colors
        navbar: "#0051BA",
        navbarText: "#FFFFFF",
        navbarHover: "#003F8F",

        // Surface colors
        background: "#FFFFFF",
        surface: "#F5F5F5",
        surfaceHover: "#E5E5E5",
        surfaceActive: "#D4D4D4",
        overlay: "rgba(0, 0, 0, 0.9)",

        // Text colors
        text: "#000000",
        textSecondary: "#2C2C2C",
        textDisabled: "#595959",
        textInverse: "#FFFFFF",

        // Border colors
        border: "#2C2C2C",
        borderHover: "#000000",
        borderFocus: "#0051BA",

        // Status colors
        success: "#006E1C",
        successLight: "#D9F2DD",
        warning: "#B35C00",
        warningLight: "#FFE5CC",
        error: "#AB0000",
        errorLight: "#FFD6D6",
        info: "#004B8F",
        infoLight: "#D6E8FF",
    },
    radius: baseTheme.radius,
    font: baseTheme.font,
};
