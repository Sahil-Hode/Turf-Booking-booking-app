import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    CalendarCheck,
    CalendarDays,
    CheckCircle2,
    Clock,
    Home,
    MapPin,
    Share2,
} from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../../../src/store/useAppStore';
import { Colors } from '../../../../src/theme/colors';

export default function BookingConfirmationScreen() {
    const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
    const router = useRouter();
    const bookings = useAppStore((s) => s.bookings);

    const booking = bookings.find((b) => b.id === bookingId) || bookings[0];

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 80,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    if (!booking) return null;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.backgroundDark, '#0f2a1f', Colors.backgroundDark]}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Glow */}
            <View style={styles.glowEffect} />

            <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Success Icon */}
                    <Animated.View
                        style={[styles.successContainer, { transform: [{ scale: scaleAnim }] }]}
                    >
                        <View style={styles.successOuter}>
                            <View style={styles.successInner}>
                                <CheckCircle2 size={52} color={Colors.backgroundDark} fill={Colors.backgroundDark} strokeWidth={1.5} />
                            </View>
                            <View style={styles.successRing1} />
                            <View style={styles.successRing2} />
                        </View>
                    </Animated.View>

                    {/* Success Text */}
                    <Animated.View
                        style={[
                            styles.textSection,
                            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        <Text style={styles.confirmTitle}>Booking Confirmed! 🎉</Text>
                        <Text style={styles.confirmSub}>
                            Your slot has been successfully booked. Get ready to play!
                        </Text>

                        {/* Booking Ref */}
                        <View style={styles.bookingRefCard}>
                            <Text style={styles.bookingRefLabel}>Booking Reference</Text>
                            <Text style={styles.bookingRef}>{booking.bookingRef}</Text>
                        </View>
                    </Animated.View>

                    {/* Booking Details Card */}
                    <Animated.View
                        style={[
                            styles.detailsCard,
                            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        <Text style={styles.detailsCardTitle}>{booking.turfName}</Text>

                        <View style={styles.detailRow}>
                            <View style={styles.detailIconWrap}>
                                <CalendarDays size={18} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.detailLabel}>Date</Text>
                                <Text style={styles.detailValue}>{booking.date}</Text>
                            </View>
                        </View>

                        <View style={styles.detailDivider} />

                        <View style={styles.detailRow}>
                            <View style={styles.detailIconWrap}>
                                <Clock size={18} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.detailLabel}>Time Slot</Text>
                                <Text style={styles.detailValue}>{booking.timeSlot}</Text>
                            </View>
                        </View>

                        <View style={styles.detailDivider} />

                        <View style={styles.detailRow}>
                            <View style={styles.detailIconWrap}>
                                <MapPin size={18} color={Colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.detailLabel}>Location</Text>
                                <Text style={styles.detailValue} numberOfLines={2}>{booking.location}</Text>
                            </View>
                        </View>

                        <View style={styles.detailDivider} />

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Paid</Text>
                            <Text style={styles.totalAmount}>₹{booking.totalAmount.toLocaleString()}</Text>
                        </View>
                    </Animated.View>

                    {/* Action Buttons */}
                    <Animated.View
                        style={[
                            styles.actions,
                            { opacity: fadeAnim },
                        ]}
                    >
                        <TouchableOpacity style={styles.secondaryBtn}>
                            <Share2 size={18} color={Colors.primary} />
                            <Text style={styles.secondaryBtnText}>Share Receipt</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={() => router.push('/(customer)/(tabs)/my-bookings')}
                            activeOpacity={0.85}
                        >
                            <CalendarCheck size={18} color={Colors.backgroundDark} />
                            <Text style={styles.primaryBtnText}>My Bookings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.homeBtn}
                            onPress={() => router.replace('/(customer)')}
                        >
                            <Home size={16} color={Colors.textSecondary} />
                            <Text style={styles.homeBtnText}>Back to Home</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundDark },
    glowEffect: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: Colors.primary,
        opacity: 0.05,
        top: '10%',
        alignSelf: 'center',
    },
    safeArea: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    // Success
    successContainer: {
        marginBottom: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    successOuter: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    successInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
    },
    successRing1: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: Colors.primary + '40',
    },
    successRing2: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: Colors.primary + '20',
    },
    // Text
    textSection: {
        alignItems: 'center',
        marginBottom: 24,
        width: '100%',
    },
    confirmTitle: {
        color: Colors.textPrimary,
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    confirmSub: {
        color: Colors.textSecondary,
        fontSize: 15,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 22,
    },
    bookingRefCard: {
        marginTop: 18,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    bookingRefLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    bookingRef: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 2,
    },
    // Details
    detailsCard: {
        width: '100%',
        backgroundColor: Colors.surface1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.borderMedium,
        padding: 18,
        marginBottom: 24,
        gap: 14,
    },
    detailsCardTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    detailIconWrap: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: Colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    detailValue: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },
    detailDivider: {
        height: 1,
        backgroundColor: Colors.borderDark,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
    },
    totalAmount: {
        color: Colors.primary,
        fontSize: 22,
        fontWeight: '900',
    },
    // Actions
    actions: {
        width: '100%',
        gap: 12,
    },
    secondaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        paddingVertical: 14,
        borderRadius: 14,
    },
    secondaryBtnText: {
        color: Colors.primary,
        fontSize: 15,
        fontWeight: '700',
    },
    primaryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    primaryBtnText: {
        color: Colors.backgroundDark,
        fontSize: 15,
        fontWeight: '800',
    },
    homeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
    },
    homeBtnText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
});
