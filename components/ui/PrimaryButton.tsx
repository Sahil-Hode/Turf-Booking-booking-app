import React from 'react';
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../src/theme/colors';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'lg',
    fullWidth = true,
    icon,
    iconPosition = 'right',
    disabled = false,
    style,
    textStyle,
}) => {
    const buttonStyle = [
        styles.base,
        styles[`size_${size}`],
        styles[`variant_${variant}`],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
    ];

    const textStyles = [
        styles.text,
        styles[`textSize_${size}`],
        styles[`textVariant_${variant}`],
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.85}
        >
            {icon && iconPosition === 'left' && (
                <View style={styles.iconLeft}>{icon}</View>
            )}
            <Text style={textStyles}>{title}</Text>
            {icon && iconPosition === 'right' && (
                <View style={styles.iconRight}>{icon}</View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
    },
    fullWidth: {
        width: '100%',
    },
    disabled: {
        opacity: 0.5,
    },
    // Sizes
    size_sm: { paddingVertical: 10, paddingHorizontal: 16 },
    size_md: { paddingVertical: 12, paddingHorizontal: 20 },
    size_lg: { paddingVertical: 16, paddingHorizontal: 24 },
    // Variants
    variant_primary: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    variant_secondary: {
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    variant_ghost: {
        backgroundColor: 'transparent',
    },
    variant_outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.primary,
    },
    // Text
    text: {
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    textSize_sm: { fontSize: 13 },
    textSize_md: { fontSize: 14 },
    textSize_lg: { fontSize: 15 },
    textVariant_primary: { color: Colors.backgroundDark },
    textVariant_secondary: { color: Colors.primary },
    textVariant_ghost: { color: Colors.textSecondary },
    textVariant_outline: { color: Colors.primary },
    // Icon spacing
    iconLeft: { marginRight: 8 },
    iconRight: { marginLeft: 8 },
});
