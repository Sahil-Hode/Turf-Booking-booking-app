import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { MapPin, Star } from 'lucide-react-native';
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

export default function TurfCardVertical({ turf, onPress }: TurfCardVerticalProps) {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: turf.image }} style={styles.image} />

                    {turf.isAvailableNow && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Available</Text>
                        </View>
                    )}

                    {!turf.isAvailableNow && (
                        <View style={[styles.badge, styles.badgePremium]}>
                            <Text style={[styles.badgeText, styles.badgeTextPremium]}>Premium</Text>
                        </View>
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.topRow}>
                        <Text style={styles.name} numberOfLines={1}>{turf.name}</Text>
                        <View style={styles.ratingBadge}>
                            <Star size={14} color={colors.primary} fill={colors.primary} />
                            <Text style={styles.ratingText}>{turf.rating}</Text>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <MapPin size={14} color={colors.textSecondary} />
                        <Text style={styles.location}>{turf.location}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.distance}>{turf.distance}</Text>
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹{turf.price}</Text>
                        <Text style={styles.priceUnit}>/{turf.priceUnit}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.bookButton}
                        activeOpacity={0.7}
                        onPress={onPress}
                    >
                        <Text style={styles.bookButtonText}>Book Venue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: spacing.sm,
        paddingBottom: spacing.lg, // Give the shadow room to bleed
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    imageWrapper: {
        position: 'relative',
        height: 200,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    badgePremium: {
        backgroundColor: '#111827', // Dark charcoal for a premium feel
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.bold,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wider,
    },
    badgeTextPremium: {
        color: '#D1FAE5', // Light green text for premium
    },
    content: {
        padding: 20,
        gap: 12, // React Native Flexbox gap
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        flex: 1,
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        marginRight: 12,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    location: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
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
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 4,
    },
    price: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
    },
    priceUnit: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
        color: colors.textSecondary,
        marginLeft: 2,
    },
    bookButton: {
        backgroundColor: colors.primary,
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    bookButtonText: {
        color: '#FFFFFF',
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.bold,
        letterSpacing: 0.5,
    },
});
