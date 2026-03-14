// Typography scale for clear hierarchy (Headings: Bold, Sub: Medium, Body: Regular)
export const typography = {
    // Mobile UI fonts
    sizes: {
        xs: 12,      // Captions, Input labels, Metadata
        sm: 14,      // Secondary body, small buttons
        base: 16,    // Main Body text, Standard inputs, Standard buttons
        md: 18,      // Large buttons, primary body
        lg: 20,      // Section titles, App Headers
        xl: 24,      // Main Screen Headers (H2)
        '2xl': 28,   // Main H1 heading
        '3xl': 32,   // Display, Large Number
        '4xl': 40,   // Hero text
    },

    // Clean weight mappings
    weights: {
        regular: '400' as const,  // Body text
        medium: '500' as const,   // Subheadings, secondary buttons
        semibold: '600' as const, // Standard Button text, Titles
        bold: '700' as const,     // Headings
        extrabold: '800' as const // Hero statements
    },

    // Line Heights
    lineHeights: {
        none: 1,       // Icon only
        tight: 1.25,   // Headings
        normal: 1.5,   // Base body standard
        relaxed: 1.75  // Long paragraphs
    },

    // Tracking
    letterSpacing: {
        tighter: -0.4, // Display headings
        tight: -0.2,   // normal headings
        normal: 0,
        wide: 0.2,     // small labels
        wider: 0.5,    // ALL CAPS tags
    }
};
