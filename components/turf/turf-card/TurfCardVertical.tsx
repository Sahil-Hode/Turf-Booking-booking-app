import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Activity, Heart } from 'lucide-react-native';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface TurfCardVerticalProps {
    turf: {
        id: string;
        name: string;
        location: string;
        distance: string;
        rating: number;
        reviewCount: number;
        price: number;
        priceUnit: string;
        image: string;
        isAvailableNow: boolean;
        isFavorite: boolean;
        sport: string;
    };
    onPress: () => void;
    onFavoriteToggle?: () => void;
}

export default function TurfCardVertical({ turf, onPress, onFavoriteToggle }: TurfCardVerticalProps) {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.9} // Gentle opacity for entire card
        >
            <View style={styles.imageWrapper}>
                <Image source={{ uri: turf.image }} style={styles.image} />

                {/* Absolute Favorite Button Top Right */}
                <TouchableOpacity
                    onPress={onFavoriteToggle}
                    style={styles.heartBtn}
                    activeOpacity={0.8}
                >
                    <Heart
                        size={18}
                        color={turf.isFavorite ? colors.error : colors.textPrimary}
                        fill={turf.isFavorite ? colors.error : 'transparent'}
                        strokeWidth={turf.isFavorite ? 2 : 1.5}
                    />
                </TouchableOpacity>

                {/* Floating availability pill on top of image */}
                {turf.isAvailableNow && (
                    <View style={styles.availableBadge}>
                        <View style={styles.availableDot} />
                        <Text style={styles.availableText}>Available Now</Text>
                    </View>
                )}
            </View>

            {/* Uber/Grab tight text grouping */}
            <View style={styles.content}>
                <View style={styles.topRow}>
                    <Text style={styles.name} numberOfLines={1}>{turf.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{turf.rating}</Text>
                        <Text style={styles.reviewCount}>({turf.reviewCount})</Text>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <Text style={styles.location}>{turf.location}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.distance}>{turf.distance}</Text>
                </View>

                <View style={styles.bottomRow}>
                    <View style={styles.sportTag}>
                        <Activity size={12} color={colors.textSecondary} strokeWidth={2} />
                        <Text style={styles.sportText}>{turf.sport}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹{turf.price}</Text>
                        <Text style={styles.priceUnit}>/{turf.priceUnit}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        marginBottom: spacing.xl, // Large spacing between massive cards
        // Remove rigid borders, Uber uses entirely shadow/bleed isolation
        overflow: 'hidden',
    },
    imageWrapper: {
        position: 'relative',
        height: 180, // Massive bleed image
        borderRadius: layout.borderRadius.xl, // 20px sweeping corners
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    availableBadge: {
        position: 'absolute',
        top: spacing.md, // 16px inset
        left: spacing.md,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: layout.borderRadius.full, // pill
        paddingHorizontal: 10,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    availableDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary, // #16A34A Gen-Z Green
    },
    availableText: {
        color: colors.textPrimary,
        fontSize: 11,
        fontWeight: typography.weights.bold,
        letterSpacing: typography.letterSpacing.wide,
    },
    heartBtn: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: layout.borderRadius.full,
        padding: 8,
        ...shadows.sm,
    },
    content: {
        paddingVertical: spacing.md, // only vertical spacing, image bleeds to left/right bounds usually
        gap: 2,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.xs,
    },
    name: {
        flex: 1,
        fontSize: typography.sizes.lg, // 20px Heavy Header
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: colors.backgroundSecondary, // #F5F5F5
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    ratingText: {
        fontSize: typography.sizes.sm, // 14
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
    },
    reviewCount: {
        fontSize: typography.sizes.xs, // 12
        fontWeight: typography.weights.medium,
        color: colors.textTertiary,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    location: {
        fontSize: typography.sizes.sm, // 14
        color: colors.textSecondary,
        fontWeight: typography.weights.medium,
    },
    dot: {
        fontSize: typography.sizes.xs,
        color: colors.textTertiary,
    },
    distance: {
        fontSize: typography.sizes.sm, // 14
        color: colors.textSecondary,
        fontWeight: typography.weights.medium,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.md, // 16px breakout
    },
    sportTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.backgroundSecondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    sportText: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.bold,
        color: colors.textSecondary,
        textTransform: 'uppercase',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: typography.sizes.md, // 18
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    priceUnit: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.medium,
        color: colors.textTertiary,
        marginLeft: 2,
    },
});
