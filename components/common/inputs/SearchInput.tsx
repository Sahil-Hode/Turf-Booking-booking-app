import { colors } from '@/theme/colors';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Search, SlidersHorizontal, XCircle } from 'lucide-react-native';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface SearchInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFilterPress?: () => void;
    style?: ViewStyle;
}

export default function SearchInput({
    value,
    onChangeText,
    placeholder = 'Search turfs, locations...',
    onFilterPress,
    style,
}: SearchInputProps) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.inputWrapper}>
                <Search
                    size={18}
                    color={colors.textTertiary}
                    style={styles.searchIcon}
                    strokeWidth={2.5}
                />
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textTertiary}
                    style={styles.input}
                    returnKeyType="search"
                    selectionColor={colors.primary}
                    autoCorrect={false}
                />
                {value.length > 0 && (
                    <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearBtn} activeOpacity={0.6}>
                        <XCircle size={16} color={colors.textTertiary} strokeWidth={2} />
                    </TouchableOpacity>
                )}
            </View>
            {onFilterPress && (
                <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress} activeOpacity={0.8}>
                    <SlidersHorizontal size={18} color={colors.textPrimary} strokeWidth={2} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm, // 12px
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary, // Neutral gray like Notion/Stripe
        borderRadius: layout.borderRadius.lg, // 16px soft radius
        paddingHorizontal: spacing.md, // 16
        paddingVertical: spacing.sm,   // 12
        height: 48,                    // Standard touch target
        borderWidth: 1,
        borderColor: 'transparent',
    },
    searchIcon: {
        marginRight: spacing.sm, // 8px
    },
    input: {
        flex: 1,
        fontSize: typography.sizes.base, // 15
        color: colors.textPrimary,
        fontWeight: typography.weights.medium,
        padding: 0,
        letterSpacing: typography.letterSpacing.wide,
    },
    clearBtn: {
        marginLeft: spacing.xs,
        padding: spacing.xs,
    },
    filterBtn: {
        backgroundColor: colors.backgroundSecondary,
        borderRadius: layout.borderRadius.lg,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
});
