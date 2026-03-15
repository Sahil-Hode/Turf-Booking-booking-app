import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CalendarDays, MapPin, Tag, Timer } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockTurfs } from '../../../../src/data/mockData';
import { useAppStore } from '../../../../src/store/useAppStore';
import { Colors } from '../../../../src/theme/colors';

const TAX_RATE = 0.045;
const PROMO_CODES: Record<string, number> = {
    'TURF20': 20,
    'PLAY10': 10,
    'FIRST15': 15,
};

export default function BookingSummaryScreen() {
    const { turfId } = useLocalSearchParams<{ turfId: string }>();
    const router = useRouter();
    const { bookingDraft, setBookingDraft } = useAppStore();

    const turf = mockTurfs.find((t) => t.id === turfId) || mockTurfs[0];
    const [promoInput, setPromoInput] = useState('');
    const [appliedPromo, setAppliedPromo] = useState('');
    const [promoError, setPromoError] = useState('');

    const slotPrice = bookingDraft.selectedSlot?.price || turf.pricePerHour;
    const taxAmount = Math.round(slotPrice * TAX_RATE);
    const discountPercent = appliedPromo ? (PROMO_CODES[appliedPromo] || 0) : 0;
    const discountAmount = Math.round((slotPrice * discountPercent) / 100);
    const totalAmount = slotPrice + taxAmount - discountAmount;

    const applyPromo = () => {
        if (PROMO_CODES[promoInput.toUpperCase()]) {
            setAppliedPromo(promoInput.toUpperCase());
            setPromoError('');
            setBookingDraft({ promoCode: promoInput.toUpperCase(), discount: discountAmount });
        } else {
            setPromoError('Invalid promo code');
        }
    };

    const handleProceed = () => {
        router.push(`/(customer)/booking/payment/${turfId}`);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ArrowLeft size={22} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Summary</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Turf Hero Card */}
                <View style={styles.turfCard}>
                    <Image
                        source={{ uri: turf.images[0] }}
                        style={styles.turfImage}
                        resizeMode="cover"
                    />
                    <View style={styles.turfInfo}>
                        <Text style={styles.turfSport}>{turf.sports.join(' & ')}</Text>
                        <Text style={styles.turfName}>{turf.name}</Text>
                        <View style={styles.turfLocation}>
                            <MapPin size={13} color={Colors.primary + '99'} />
                            <Text style={styles.turfLocationText}>{turf.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Schedule Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Schedule Details</Text>
                    <View style={styles.detailsCard}>
                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <CalendarDays size={22} color={Colors.primary} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Date & Time</Text>
                                <Text style={styles.detailValue}>
                                    {bookingDraft.selectedDate || 'Sat, 24 Oct'} | {bookingDraft.selectedSlot?.time || '06:00 PM'} - end
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.detailDivider} />

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <Timer size={22} color={Colors.primary} />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Duration</Text>
                                <Text style={styles.detailValue}>60 Minutes</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Promo Code */}
                <View style={styles.section}>
                    <Text style={styles.promoLabel}>Have a promo code?</Text>
                    <View style={styles.promoRow}>
                        <View style={styles.promoInputWrapper}>
                            <Tag size={18} color={Colors.primary + '80'} />
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Enter code (e.g. TURF20)"
                                placeholderTextColor="#475569"
                                value={promoInput}
                                onChangeText={(t) => {
                                    setPromoInput(t);
                                    setPromoError('');
                                }}
                                autoCapitalize="characters"
                                selectionColor={Colors.primary}
                            />
                        </View>
                        <TouchableOpacity style={styles.applyBtn} onPress={applyPromo}>
                            <Text style={styles.applyBtnText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    {promoError ? <Text style={styles.promoError}>{promoError}</Text> : null}
                    {appliedPromo ? (
                        <Text style={styles.promoSuccess}>✅ {appliedPromo} applied! {discountPercent}% off</Text>
                    ) : null}
                </View>

                {/* Payment Summary */}
                <View style={styles.section}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>Payment Summary</Text>
                        <View style={styles.summaryDivider} />

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryRowLabel}>Court Rent (1hr)</Text>
                            <Text style={styles.summaryRowValue}>₹{slotPrice.toLocaleString()}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryRowLabel}>Taxes & Fees ({(TAX_RATE * 100).toFixed(0)}%)</Text>
                            <Text style={styles.summaryRowValue}>₹{taxAmount.toLocaleString()}</Text>
                        </View>
                        {discountAmount > 0 && (
                            <View style={styles.summaryRow}>
                                <Text style={[styles.summaryRowLabel, { color: Colors.primary }]}>
                                    Discount ({appliedPromo})
                                </Text>
                                <Text style={[styles.summaryRowValue, { color: Colors.primary }]}>
                                    - ₹{discountAmount.toLocaleString()}
                                </Text>
                            </View>
                        )}

                        <View style={styles.totalDivider} />
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹{totalAmount.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomCTA}>
                <View style={styles.toPay}>
                    <Text style={styles.toPayLabel}>To Pay</Text>
                    <Text style={styles.toPayAmount}>₹{totalAmount.toLocaleString()}</Text>
                </View>
                <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed} activeOpacity={0.85}>
                    <Text style={styles.proceedText}>Proceed to Pay</Text>
                    <Text style={styles.proceedArrow}>›</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundDark },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderDark,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '700',
    },
    scrollContent: { paddingBottom: 120 },
    // Turf Card
    turfCard: {
        margin: 16,
        backgroundColor: Colors.surface1,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        overflow: 'hidden',
    },
    turfImage: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    turfInfo: {
        padding: 14,
        gap: 4,
    },
    turfSport: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    turfName: {
        color: Colors.textPrimary,
        fontSize: 20,
        fontWeight: '800',
    },
    turfLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    turfLocationText: {
        color: Colors.textMuted,
        fontSize: 13,
    },
    // Sections
    section: { paddingHorizontal: 16, marginBottom: 20 },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 12,
    },
    // Details Card
    detailsCard: {
        backgroundColor: Colors.surface1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.primaryBorder + '30',
        overflow: 'hidden',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        gap: 12,
    },
    detailIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailContent: { flex: 1 },
    detailLabel: { color: Colors.textPrimary, fontSize: 14, fontWeight: '600' },
    detailValue: { color: Colors.textMuted, fontSize: 13, marginTop: 2 },
    editText: { color: Colors.primary, fontSize: 13, fontWeight: '700' },
    detailDivider: {
        height: 1,
        backgroundColor: Colors.borderDark,
        marginHorizontal: 14,
    },
    // Promo
    promoLabel: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 10,
    },
    promoRow: {
        flexDirection: 'row',
        gap: 10,
    },
    promoInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.surface1,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        borderRadius: 14,
        paddingHorizontal: 12,
    },
    promoInput: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 14,
        paddingVertical: 13,
    },
    applyBtn: {
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        paddingHorizontal: 18,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyBtnText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    promoError: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 6,
    },
    promoSuccess: {
        color: Colors.primary,
        fontSize: 12,
        marginTop: 6,
        fontWeight: '600',
    },
    // Summary
    summaryCard: {
        backgroundColor: Colors.surface1,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.primaryBorder + '40',
        padding: 18,
        gap: 12,
    },
    summaryTitle: {
        color: Colors.textPrimary,
        fontSize: 15,
        fontWeight: '700',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: Colors.borderDark,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryRowLabel: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    summaryRowValue: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },
    totalDivider: {
        height: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        marginVertical: 4,
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
    totalValue: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: '900',
    },
    // Bottom
    bottomCTA: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: 'rgba(17,33,27,0.95)',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        borderTopColor: Colors.borderDark,
    },
    toPay: { flex: 1 },
    toPayLabel: {
        color: '#64748b',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '700',
    },
    toPayAmount: {
        color: Colors.textPrimary,
        fontSize: 26,
        fontWeight: '900',
        marginTop: 2,
    },
    proceedBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    proceedText: {
        color: Colors.backgroundDark,
        fontSize: 15,
        fontWeight: '800',
    },
    proceedArrow: {
        color: Colors.backgroundDark,
        fontSize: 22,
        fontWeight: '700',
    },
});
