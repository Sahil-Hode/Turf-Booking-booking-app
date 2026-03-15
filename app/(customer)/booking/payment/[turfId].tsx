import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Building2, CreditCard, Smartphone, Wallet } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockTurfs } from '../../../../src/data/mockData';
import { useAppStore } from '../../../../src/store/useAppStore';
import { Colors } from '../../../../src/theme/colors';
import { Booking } from '../../../../src/types';

const PAYMENT_METHODS = [
    {
        id: 'upi',
        name: 'UPI Payment',
        subtitle: 'Pay via UPI apps',
        icon: <Smartphone size={22} color={Colors.primary} />,
    },
    {
        id: 'card',
        name: 'Credit / Debit Card',
        subtitle: 'Visa, Mastercard, RuPay',
        icon: <CreditCard size={22} color={Colors.primary} />,
    },
    {
        id: 'netbanking',
        name: 'Net Banking',
        subtitle: 'All major banks',
        icon: <Building2 size={22} color={Colors.primary} />,
    },
    {
        id: 'wallet',
        name: 'Digital Wallet',
        subtitle: 'Paytm, PhonePe, GPay',
        icon: <Wallet size={22} color={Colors.primary} />,
    },
];

export default function PaymentScreen() {
    const { turfId } = useLocalSearchParams<{ turfId: string }>();
    const router = useRouter();
    const { bookingDraft, addBooking, clearBookingDraft } = useAppStore();
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [processing, setProcessing] = useState(false);

    const turf = mockTurfs.find((t) => t.id === turfId) || mockTurfs[0];
    const slotPrice = bookingDraft.selectedSlot?.price || turf.pricePerHour;
    const taxAmount = Math.round(slotPrice * 0.045);
    const totalAmount = slotPrice + taxAmount - (bookingDraft.discount || 0);

    const handlePayment = () => {
        setProcessing(true);
        setTimeout(() => {
            const bookingId = `b_${Date.now()}`;
            const newBooking: Booking = {
                id: bookingId,
                turfId: turf.id,
                turfName: turf.name,
                turfImage: turf.images[0],
                date: bookingDraft.selectedDate || 'Sat, 24 Oct 2025',
                timeSlot: `${bookingDraft.selectedSlot?.time || '06:00 PM'} - Next Hour`,
                duration: 60,
                totalAmount,
                status: 'upcoming',
                sport: bookingDraft.sport || 'Football',
                location: turf.location,
                bookingRef: `TZ-${Date.now().toString().slice(-6)}`,
            };
            addBooking(newBooking);
            clearBookingDraft();
            setProcessing(false);
            router.replace(`/(customer)/booking/confirmation/${bookingId}`);
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ArrowLeft size={22} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment Method</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Amount */}
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Total Amount to Pay</Text>
                    <Text style={styles.amountValue}>₹{totalAmount.toLocaleString()}</Text>
                    <Text style={styles.amountSub}>{turf.name} • {bookingDraft.selectedDate}</Text>
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Choose Payment Method</Text>
                    {PAYMENT_METHODS.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.methodCard,
                                selectedMethod === method.id && styles.methodCardActive,
                            ]}
                            onPress={() => setSelectedMethod(method.id)}
                        >
                            <View style={styles.methodIcon}>{method.icon}</View>
                            <View style={styles.methodInfo}>
                                <Text style={styles.methodName}>{method.name}</Text>
                                <Text style={styles.methodSub}>{method.subtitle}</Text>
                            </View>
                            <View style={[styles.radioOuter, selectedMethod === method.id && styles.radioOuterActive]}>
                                {selectedMethod === method.id && <View style={styles.radioInner} />}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Security Note */}
                <View style={styles.securityNote}>
                    <Text style={styles.securityIcon}>🔒</Text>
                    <Text style={styles.securityText}>
                        Your payment is secured with 256-bit SSL encryption. We never store your payment details.
                    </Text>
                </View>
            </ScrollView>

            {/* Pay Button */}
            <View style={styles.bottomCTA}>
                <TouchableOpacity
                    style={[styles.payBtn, processing && styles.payBtnProcessing]}
                    onPress={handlePayment}
                    disabled={processing}
                    activeOpacity={0.85}
                >
                    {processing ? (
                        <Text style={styles.payBtnText}>⟳  Processing...</Text>
                    ) : (
                        <Text style={styles.payBtnText}>Pay  ₹{totalAmount.toLocaleString()}</Text>
                    )}
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
    headerTitle: { color: Colors.textPrimary, fontSize: 18, fontWeight: '700' },
    scrollContent: { paddingBottom: 120 },
    // Amount
    amountCard: {
        margin: 16,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        gap: 6,
    },
    amountLabel: { color: Colors.textMuted, fontSize: 13, fontWeight: '500' },
    amountValue: {
        color: Colors.primary,
        fontSize: 40,
        fontWeight: '900',
        letterSpacing: -1,
    },
    amountSub: { color: Colors.textSecondary, fontSize: 13 },
    // Section
    section: { paddingHorizontal: 16, marginBottom: 20 },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 14,
    },
    // Methods
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: Colors.surface1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        padding: 14,
        marginBottom: 10,
    },
    methodCardActive: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryMuted,
    },
    methodIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    methodInfo: { flex: 1 },
    methodName: { color: Colors.textPrimary, fontSize: 15, fontWeight: '600' },
    methodSub: { color: Colors.textSecondary, fontSize: 12, marginTop: 2 },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: Colors.borderMedium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterActive: { borderColor: Colors.primary },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    // Security
    securityNote: {
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 16,
        backgroundColor: Colors.surface1,
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    securityIcon: { fontSize: 18 },
    securityText: {
        flex: 1,
        color: Colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
    },
    // Bottom
    bottomCTA: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        paddingBottom: 36,
        backgroundColor: 'rgba(17,33,27,0.95)',
        borderTopWidth: 1,
        borderTopColor: Colors.borderDark,
    },
    payBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    payBtnProcessing: { opacity: 0.75 },
    payBtnText: {
        color: Colors.backgroundDark,
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
});
