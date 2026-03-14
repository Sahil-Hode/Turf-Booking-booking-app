import { colors } from '@/theme/colors';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Heart } from 'lucide-react-native';
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.72; // Wide frame for top-rated scroll

interface TurfCardHorizontalProps {
    turf: {
        id: string;
        name: string;
        location: string;
        rating: number;
        price: number;
        priceUnit: string;
        image: string;
        isAvailableNow: boolean;
        isFavorite: boolean;
        distance?: string;
    };
    onPress: () => void;
    onFavoriteToggle?: () => void;
}

export default function TurfCardHorizontal({ turf, onPress, onFavoriteToggle }: TurfCardHorizontalProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: turf.image }} style={styles.image} />

                {/* Soft floating badge matching the theme scale */}
                {turf.isAvailableNow && (
                    <View style={styles.availableBadge}>
                        <View style={styles.availableDot} />
                        <Text style={styles.availableText}>Available</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.heartBtn}
                    onPress={onFavoriteToggle}
                    activeOpacity={0.8}
                >
                    <Heart
                        size={16}
                        color={turf.isFavorite ? colors.error : colors.textPrimary}
                        fill={turf.isFavorite ? colors.error : 'transparent'}
                        strokeWidth={turf.isFavorite ? 2 : 1.5}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.info}>
                <View style={styles.topRow}>
                    <Text style={styles.name} numberOfLines={1}>{turf.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{turf.rating}</Text>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <Text style={styles.location} numberOfLines={1}>{turf.location}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.distance}>{turf.distance || '2.4 km'}</Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{turf.price}</Text>
                    <Text style={styles.priceUnit}>/ {turf.priceUnit}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: colors.surface,
        marginRight: spacing.md,
        // Stripped all outer padding and borders for minimal layout
    },
    imageContainer: {
        position: 'relative',
        borderRadius: layout.borderRadius.lg, // 16 target outer radius
        overflow: 'hidden',
        height: 140, // Static rigid frame
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    availableBadge: {
        position: 'absolute',
        top: spacing.sm,    // 12px
        left: spacing.sm,   // 12px
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: layout.borderRadius.full, // Pill sweep
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    availableDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary, // #16A34A
    },
    availableText: {
        color: colors.textPrimary, // Almost black
        fontSize: 10,
        fontWeight: typography.weights.bold,
        letterSpacing: typography.letterSpacing.wide,
    },
    heartBtn: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: layout.borderRadius.full,
        padding: 6,
    },
    info: {
        paddingVertical: spacing.sm, // Uber strips left/right padding so text aligns to the photo edge perfectly
        gap: 2,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
    },
    name: {
        flex: 1,
        fontSize: typography.sizes.base, // 16 Heavy Text
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    ratingBadge: {
        backgroundColor: colors.backgroundSecondary, // #F5F5F5
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    ratingText: {
        color: colors.textPrimary,
        fontSize: typography.sizes.xs, // 12
        fontWeight: typography.weights.bold,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: spacing.xs,
    },
    location: {
        fontSize: typography.sizes.sm, // 14
        color: colors.textSecondary,    // 500 fade
        fontWeight: typography.weights.medium,
    },
    dot: {
        fontSize: typography.sizes.xs,
        color: colors.textTertiary,
    },
    distance: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        fontWeight: typography.weights.medium,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 2,
    },
    price: {
        fontSize: typography.sizes.md, // 18 
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tighter,
    },
    priceUnit: {
        fontSize: typography.sizes.xs, // 12 
        color: colors.textSecondary,
        fontWeight: typography.weights.medium,
    },
});
