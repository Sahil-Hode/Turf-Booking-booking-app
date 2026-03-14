import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import React from 'react';
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export default function PrimaryButton({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
    fullWidth = false,
    icon,
}: PrimaryButtonProps) {
    // Smooth press feedback scale
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,     // 5% scale down for satisfying snap
            useNativeDriver: true,
            friction: 6,
            tension: 100,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 6,
            tension: 100,
        }).start();
    };

    const isPrimary = variant === 'primary';

    const containerStyles = [
        styles.container,
        fullWidth && styles.fullWidth,
    ];

    const buttonStyles = [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        (disabled || loading) && styles.disabled,
        // Add subtle shadow elevation
        !disabled && isPrimary && shadows.sm,
        // (Optional) Add green glow for specific dark-mode primary states here later via context
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`text_${variant}`],
        styles[`textSize_${size}`],
        textStyle,
    ];

    return (
        <Animated.View style={[containerStyles, { transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity
                style={buttonStyles}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled || loading}
                activeOpacity={1} // use animation scale entirely
            >
                {loading ? (
                    <ActivityIndicator
                        color={isPrimary ? colors.surface : colors.primary}
                        size="small"
                    />
                ) : (
                    <>
                        {icon && icon}
                        <Text style={textStyles}>{title}</Text>
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        // Wrapper to ensure layout shifts don't happen on scale
    },
    fullWidth: {
        width: '100%',
    },
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: layout.borderRadius.md, // Target 12-16px
        gap: spacing.sm,    // Icon and text gap (12)
    },
    disabled: {
        opacity: 0.5,
    },

    // Color Variants
    primary: {
        backgroundColor: colors.primary, // The modern green (#16A34A)
    },
    secondary: {
        backgroundColor: colors.backgroundSecondary, // Soft gray
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.border,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    danger: {
        backgroundColor: colors.errorBg,
    },

    // Sizes / Paddings (Based on our 8-pt spacing scales)
    size_sm: {
        paddingVertical: spacing.xs,    // 8
        paddingHorizontal: spacing.sm,  // 12
        borderRadius: layout.borderRadius.sm, // 8
    },
    size_md: {
        paddingVertical: spacing.sm,    // 12
        paddingHorizontal: spacing.md,  // 16
        borderRadius: layout.borderRadius.md, // 12
    },
    size_lg: {
        paddingVertical: spacing.md,    // 16
        paddingHorizontal: spacing.lg,  // 24
        borderRadius: layout.borderRadius.lg, // 16
    },

    // Text Typography
    text: {
        fontWeight: typography.weights.medium, // Subheading defaults to Medium
        letterSpacing: typography.letterSpacing.normal,
    },
    text_primary: {
        color: colors.surface,
        fontWeight: typography.weights.bold, // Primary bold
    },
    text_secondary: {
        color: colors.textPrimary,
    },
    text_outline: {
        color: colors.textPrimary,
    },
    text_ghost: {
        color: colors.textSecondary,
    },
    text_danger: {
        color: colors.error,
    },

    // Text Font Sizes
    textSize_sm: {
        fontSize: typography.sizes.sm,
    },
    textSize_md: {
        fontSize: typography.sizes.base,
    },
    textSize_lg: {
        fontSize: typography.sizes.base, // Often keep base font on large buttons, just scale padding
    },
});
