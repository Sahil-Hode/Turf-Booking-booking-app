// theme/colors.ts
// Minimalist Startup Color System with Green Accent

export const palette = {
    // Brand
    green: {
        100: '#D1FAE5',
        500: '#10B981',
        600: '#059669', // Primary Emerald Green
        700: '#047857',
        800: '#065F46',
    },
    // Neutrals
    neutral: {
        0: '#FFFFFF',
        50: '#F8FAF0', // Soft off-white/light gray
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280', // Muted gray for secondary text
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937', // Dark charcoal for high-contrast readability
        900: '#111827',
    },
    // Status
    red: '#EF4444',
    yellow: '#F59E0B',
};

// Light Theme Mapping (Default)
export const lightColors = {
    primary: palette.green[600],
    primaryLight: palette.green[100],

    background: palette.neutral[50], // Very soft off-white/light gray for main app background
    backgroundSecondary: palette.neutral[100],

    textPrimary: palette.neutral[800], // Dark charcoal
    textSecondary: palette.neutral[500], // Muted gray
    textTertiary: palette.neutral[400],

    border: palette.neutral[200],
    borderLight: palette.neutral[100],

    error: palette.red,
    errorBg: '#FEF2F2',

    surface: palette.neutral[0], // Pure white for main containers/cards
};

// Dark Theme Mapping (Not fully supported in this refactor, but kept for structure)
export const darkColors = {
    primary: palette.green[500],
    primaryLight: 'rgba(5, 150, 105, 0.15)',

    background: palette.neutral[900],
    backgroundSecondary: '#18181B',

    textPrimary: palette.neutral[50],
    textSecondary: palette.neutral[400],
    textTertiary: palette.neutral[500],

    border: palette.neutral[700],
    borderLight: palette.neutral[800],

    error: palette.red,
    errorBg: 'rgba(239, 68, 68, 0.1)',

    surface: '#18181B', // dark gray cards
};

// We will export default 'colors' for now, but in a real app this would hook into `useColorScheme`
// For this static refactor, I will define 'colors' as light mode by default,
// but the architecture is here to easily swap it by creating a ThemeContext.
export const colors = lightColors;
