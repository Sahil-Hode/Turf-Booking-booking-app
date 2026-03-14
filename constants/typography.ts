import { TextStyle } from 'react-native';

export const Typography = {
    // Font sizes
    fontSize: {
        xs: 11,
        sm: 13,
        base: 15,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 22,
        '3xl': 26,
        '4xl': 30,
    },

    // Font weights
    fontWeight: {
        regular: '400' as TextStyle['fontWeight'],
        medium: '500' as TextStyle['fontWeight'],
        semibold: '600' as TextStyle['fontWeight'],
        bold: '700' as TextStyle['fontWeight'],
        extrabold: '800' as TextStyle['fontWeight'],
    },

    // Line heights
    lineHeight: {
        tight: 1.2,
        normal: 1.4,
        relaxed: 1.6,
        loose: 1.8,
    },
};

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
};

export const BorderRadius = {
    sm: 6,
    md: 10,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
};

export const Shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
    },
};
