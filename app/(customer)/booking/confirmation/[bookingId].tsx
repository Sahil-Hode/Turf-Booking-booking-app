import { AppColors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Animated,
    Easing,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const BOOKING_ID = 'BK' + Math.floor(100000 + Math.random() * 900000);

export default function BookingConfirmationScreen() {
    const router = useRouter();
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 80,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={AppColors.background} />

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Success Animation */}
                <Animated.View
                    style={[
                        styles.successCircle,
                        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
                    ]}
                >
                    <View style={styles.outerRing}>
                        <View style={styles.innerCircle}>
                            <Ionicons name="checkmark" size={48} color={AppColors.white} />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={{ opacity: opacityAnim, alignItems: 'center' }}>
                    <Text style={styles.title}>Booking Confirmed! 🎉</Text>
                    <Text style={styles.subtitle}>
                        Your turf has been booked successfully! Get ready to play.
                    </Text>
                </Animated.View>

                {/* Booking ID */}
                <Animated.View style={[styles.bookingIdCard, { opacity: opacityAnim }]}>
                    <Text style={styles.bookingIdLabel}>Booking ID</Text>
                    <Text style={styles.bookingId}>{BOOKING_ID}</Text>
                    <TouchableOpacity style={styles.copyBtn} activeOpacity={0.8}>
                        <Ionicons name="copy-outline" size={14} color={AppColors.primary} />
                        <Text style={styles.copyText}>Copy</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Booking Details */}
                <Animated.View style={[styles.detailsCard, { opacity: opacityAnim }]}>
                    <Text style={styles.cardTitle}>Booking Details</Text>

                    {[
                        { icon: 'business-outline', label: 'Turf', value: 'Green Field Arena' },
                        { icon: 'location-outline', label: 'Location', value: 'Indiranagar, Bangalore' },
                        { icon: 'football-outline', label: 'Sport', value: 'Football' },
                        { icon: 'calendar-outline', label: 'Date', value: 'Today, March 13, 2026' },
                        { icon: 'time-outline', label: 'Time', value: '06:00 PM - 07:00 PM' },
                        { icon: 'cash-outline', label: 'Amount Paid', value: '₹820' },
                    ].map((item, idx, arr) => (
                        <View key={item.label}>
                            <View style={styles.detailRow}>
                                <View style={styles.detailLeft}>
                                    <View style={styles.detailIconBg}>
                                        <Ionicons name={item.icon as any} size={16} color={AppColors.primary} />
                                    </View>
                                    <Text style={styles.detailLabel}>{item.label}</Text>
                                </View>
                                <Text style={styles.detailValue}>{item.value}</Text>
                            </View>
                            {idx < arr.length - 1 && <View style={styles.rowDivider} />}
                        </View>
                    ))}
                </Animated.View>

                {/* Actions */}
                <Animated.View style={[styles.actionsRow, { opacity: opacityAnim }]}>
                    <TouchableOpacity
                        style={styles.secondaryBtn}
                        onPress={() => router.push('/(customer)/(tabs)/my-bookings')}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="calendar-outline" size={18} color={AppColors.primary} />
                        <Text style={styles.secondaryBtnText}>View Bookings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={() => router.replace('/(customer)/(tabs)')}
                        activeOpacity={0.88}
                    >
                        <Ionicons name="home-outline" size={18} color={AppColors.white} />
                        <Text style={styles.primaryBtnText}>Go Home</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Share button */}
                <Animated.View style={{ opacity: opacityAnim, width: '100%' }}>
                    <TouchableOpacity style={styles.shareBtn} activeOpacity={0.8}>
                        <Ionicons name="share-social-outline" size={18} color={AppColors.textSecondary} />
                        <Text style={styles.shareBtnText}>Share Booking Details</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing['3xl'],
        paddingBottom: Spacing['2xl'],
        gap: Spacing.xl,
    },
    successCircle: {
        marginBottom: Spacing.sm,
    },
    outerRing: {
        width: 130,
        height: 130,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 12,
    },
    title: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.extrabold,
        color: AppColors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: AppColors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 280,
        marginTop: 4,
    },
    bookingIdCard: {
        width: '100%',
        backgroundColor: AppColors.primaryLight,
        borderRadius: BorderRadius.xl,
        padding: Spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: AppColors.primaryMuted,
    },
    bookingIdLabel: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.primaryDark,
        fontWeight: Typography.fontWeight.medium,
    },
    bookingId: {
        flex: 1,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.primary,
        marginLeft: Spacing.sm,
        textAlign: 'center',
        letterSpacing: 1.5,
    },
    copyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 4,
    },
    copyText: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.semibold,
    },
    detailsCard: {
        width: '100%',
        backgroundColor: AppColors.white,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        ...Shadows.md,
    },
    cardTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.base,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
    },
    detailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    detailIconBg: {
        width: 32,
        height: 32,
        borderRadius: BorderRadius.md,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailLabel: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
    },
    detailValue: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
        maxWidth: '50%',
        textAlign: 'right',
    },
    rowDivider: {
        height: 1,
        backgroundColor: AppColors.borderLight,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        width: '100%',
    },
    secondaryBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        paddingVertical: 13,
        borderRadius: BorderRadius.xl,
        borderWidth: 1.5,
        borderColor: AppColors.primary,
    },
    secondaryBtnText: {
        color: AppColors.primary,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },
    primaryBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.xs,
        paddingVertical: 13,
        borderRadius: BorderRadius.xl,
        backgroundColor: AppColors.primary,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.bold,
    },
    shareBtn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        paddingVertical: 12,
    },
    shareBtnText: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
        fontWeight: Typography.fontWeight.medium,
    },
});
