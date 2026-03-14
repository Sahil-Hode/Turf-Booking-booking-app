import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Calendar, Clock, MapPin, Shapes } from 'lucide-react-native';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface BookingCardProps {
    booking: {
        id: string;
        turfName: string;
        turfImage: string;
        location: string;
        date: string;
        time: string;
        sport: string;
        status: string;
        totalAmount: number;
    };
    onPress: () => void;
}

const STATUS_CONFIG = {
    upcoming: {
        label: 'Upcoming',
        bg: colors.primaryLight, // #DCFCE7 
        color: colors.primary,   // #16A34A (Primary Gen-Z Green)
    },
    completed: {
        label: 'Completed',
        bg: colors.backgroundSecondary, // Neutral offset
        color: colors.textSecondary,    // Subdued
    },
    cancelled: {
        label: 'Cancelled',
        bg: colors.errorBg,     // Red tint
        color: colors.error,    // Red solid
    },
};

export default function BookingCard({ booking, onPress }: BookingCardProps) {
    const statusConfig = STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.upcoming;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.header}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: booking.turfImage }} style={styles.image} />
                </View>

                <View style={styles.headerInfo}>
                    <View style={styles.topRow}>
                        <Text style={styles.name} numberOfLines={1}>{booking.turfName}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                            <Text style={[styles.statusText, { color: statusConfig.color }]}>
                                {statusConfig.label}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <MapPin size={12} color={colors.textTertiary} strokeWidth={2} />
                        <Text style={styles.location} numberOfLines={1}>{booking.location}</Text>
                    </View>

                    <View style={styles.sportRow}>
                        <Shapes size={12} color={colors.textSecondary} strokeWidth={2} />
                        <Text style={styles.sport}>{booking.sport}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.footer}>
                <View style={styles.dateTimeRow}>
                    <View style={styles.infoItem}>
                        <Calendar size={14} color={colors.textPrimary} strokeWidth={2} />
                        <Text style={styles.infoText}>{booking.date}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Clock size={14} color={colors.textPrimary} strokeWidth={2} />
                        <Text style={styles.infoText}>{booking.time}</Text>
                    </View>
                </View>

                <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Total</Text>
                    <Text style={styles.amount}>₹{booking.totalAmount}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.lg,  // 16px soft bounding box
        marginBottom: spacing.md,              // 16 spacing
        borderWidth: 1,                        // minimal thin strokes
        borderColor: colors.borderLight,       // gray-100/200 
        ...shadows.sm,                         // gentle ground shadow
    },
    header: {
        flexDirection: 'row',
        gap: spacing.md,       // 16px between image and info
        padding: spacing.md,   // standard internal boundary 
    },
    imageContainer: {
        width: 64,             // strict grid size bounds
        height: 64,
        borderRadius: layout.borderRadius.md, // 12
        overflow: 'hidden',    // ensure image corners bind
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    headerInfo: {
        flex: 1,
        justifyContent: 'center', // pin lines together beautifully
        gap: 4,                   // small 4px tracking between lines
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.xs,          // 8px
    },
    name: {
        flex: 1,
        fontSize: typography.sizes.base, // 16
        fontWeight: typography.weights.bold,
        color: colors.textPrimary, // True black or 950
        letterSpacing: typography.letterSpacing.tight,
    },
    statusBadge: {
        borderRadius: layout.borderRadius.sm, // 8
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    statusText: {
        fontSize: 10,
        fontWeight: typography.weights.bold,
        textTransform: 'uppercase',           // Strong status tracking
        letterSpacing: typography.letterSpacing.wider,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    location: {
        fontSize: typography.sizes.sm,        // 14
        color: colors.textTertiary,           // Recess down visual hierarchy
        flex: 1,
    },
    sportRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    sport: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,          // Med visual hierarchy
        fontWeight: typography.weights.medium,
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderLight,  // Keep divider lines incredibly soft 
    },
    footer: {
        padding: spacing.md,                  // 16 
        backgroundColor: colors.backgroundSecondary, // #FAFAFA slightly offset ground for data
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: layout.borderRadius.lg,  // 16 lock borders
        borderBottomRightRadius: layout.borderRadius.lg, // 16 lock borders
    },
    dateTimeRow: {
        flexDirection: 'row',
        gap: spacing.lg,                      // 24 (large breath for data mapping)
    },
    infoItem: {
        gap: 4,                               // Space icon and text
    },
    infoText: {
        fontSize: typography.sizes.sm,        // 14
        fontWeight: typography.weights.medium,
        color: colors.textPrimary,
    },
    amountRow: {
        alignItems: 'flex-end',
    },
    amountLabel: {
        fontSize: typography.sizes.xs,        // 12
        color: colors.textTertiary,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wide, // Very technical label styling
        marginBottom: 2,
    },
    amount: {
        fontSize: typography.sizes.lg,        // 20
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tighter,
    },
});
