// theme/colors.ts
// Minimalist Startup Color System with Green Accent
// Supports Automatic Light/Dark Mode Mapping

export const palette = {
    // Brand
    green: {
        50: '#F0FDF4',
        100: '#DCFCE7',
        200: '#BBF7D0',
        300: '#86EFAC',
        400: '#4ADE80',
        500: '#22C55E',
        600: '#16A34A', // Primary Green
        700: '#15803D',
        800: '#166534',
        900: '#14532D',
    },
    // Neutrals (Zinc/Gray base for that "premium" look)
    neutral: {
        0: '#FFFFFF',
        50: '#FAFAFA',
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
        950: '#09090B', // Deep Black
    },
    // Status
    red: '#EF4444',
    yellow: '#F59E0B',
};

// Light Theme Mapping (Default)
export const lightColors = {
    primary: palette.green[600],
    primaryLight: palette.green[100],

    background: palette.neutral[0],
    backgroundSecondary: palette.neutral[50], // Very subtle off-white for cards

    textPrimary: palette.neutral[950],
    textSecondary: palette.neutral[500],
    textTertiary: palette.neutral[400],

    border: palette.neutral[200],
    borderLight: palette.neutral[100],

    error: palette.red,
    errorBg: '#FEF2F2',

    surface: palette.neutral[0], // pure white cards usually
};

// Dark Theme Mapping
export const darkColors = {
    primary: palette.green[500], // Slightly brighter green for dark mode punch
    primaryLight: 'rgba(34, 197, 94, 0.15)', // Green glow effect

    background: palette.neutral[950],
    backgroundSecondary: palette.neutral[900], // Elevated dark surface

    textPrimary: palette.neutral[50],
    textSecondary: palette.neutral[400],
    textTertiary: palette.neutral[500],

    border: palette.neutral[800],
    borderLight: palette.neutral[900],

    error: palette.red,
    errorBg: 'rgba(239, 68, 68, 0.1)',

    surface: palette.neutral[900], // dark gray cards
};

// We will export default 'colors' for now, but in a real app this would hook into `useColorScheme`
// For this static refactor, I will define 'colors' as light mode by default,
// but the architecture is here to easily swap it by creating a ThemeContext.
export const colors = lightColors;
