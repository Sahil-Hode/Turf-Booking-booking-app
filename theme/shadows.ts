import { colors } from './colors';

export const shadows = {
    none: {},
    // Minimalist button / slight elevation
    sm: {
        shadowColor: colors.textPrimary, // Usually #09090B
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    // Default card shadow (very soft, wide)
    md: {
        shadowColor: colors.textPrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
    },
    // Floating action items / Navbars / Expanded Modals
    lg: {
        shadowColor: colors.textPrimary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08, // Slightly higher opacity for higher float
        shadowRadius: 24,
        elevation: 6,
    },
    // Primary green glowing shadow (Dark Mode / Active Call-to-actions)
    glow: {
        shadowColor: colors.primary, // #16A34A (Green)
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,  // Higher opacity for glow effect
        shadowRadius: 16,
        elevation: 8,
    }
};
