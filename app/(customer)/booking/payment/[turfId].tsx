import { AppColors } from '@/constants/colors';
import { MOCK_TURFS } from '@/constants/mockData';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const PAYMENT_METHODS = [
    {
        id: 'upi',
        name: 'UPI',
        description: 'Pay using any UPI app',
        icon: 'phone-portrait-outline',
        options: ['GPay', 'PhonePe', 'Paytm'],
    },
    {
        id: 'card',
        name: 'Credit / Debit Card',
        description: 'Visa, Mastercard, RuPay',
        icon: 'card-outline',
        options: [],
    },
    {
        id: 'wallet',
        name: 'Wallet',
        description: 'Paytm, Amazon Pay',
        icon: 'wallet-outline',
        options: [],
    },
];

export default function PaymentScreen() {
    const router = useRouter();
    const { turfId } = useLocalSearchParams<{ turfId: string }>();
    const turf = MOCK_TURFS.find(t => t.id === turfId) || MOCK_TURFS[0];
    const [selectedMethod, setSelectedMethod] = React.useState('upi');

    const subtotal = turf.price;
    const convenienceFee = 20;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + convenienceFee + tax;

    const handlePayment = () => {
        router.replace('/(customer)/booking/confirmation/BK_NEW');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={AppColors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
                    <Ionicons name="chevron-back" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Payment</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Order Summary */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Order Summary</Text>
                    <View style={styles.orderRow}>
                        <View>
                            <Text style={styles.orderTurfName}>{turf.name}</Text>
                            <Text style={styles.orderDetails}>1 Hour · Today, 06:00 PM</Text>
                            <View style={styles.sportChip}>
                                <Text style={styles.sportChipText}>{turf.sport}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.divider} />

                    {/* Price Breakdown */}
                    <View style={styles.priceBreakdown}>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Slot Charge (1 Hour)</Text>
                            <Text style={styles.priceValue}>₹{turf.price}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>Convenience Fee</Text>
                            <Text style={styles.priceValue}>₹{convenienceFee}</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <Text style={styles.priceLabel}>GST (5%)</Text>
                            <Text style={styles.priceValue}>₹{tax}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.priceRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>₹{total}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentMethodsCard}>
                        {PAYMENT_METHODS.map((method, idx) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.methodItem,
                                    idx < PAYMENT_METHODS.length - 1 && styles.methodItemBorder,
                                    selectedMethod === method.id && styles.methodItemSelected,
                                ]}
                                onPress={() => setSelectedMethod(method.id)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.methodLeft}>
                                    <View style={[styles.methodIconBg, selectedMethod === method.id && styles.methodIconBgActive]}>
                                        <Ionicons
                                            name={method.icon as any}
                                            size={20}
                                            color={selectedMethod === method.id ? AppColors.white : AppColors.textSecondary}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.methodName}>{method.name}</Text>
                                        <Text style={styles.methodDesc}>{method.description}</Text>
                                        {method.options.length > 0 && (
                                            <View style={styles.subOptionsRow}>
                                                {method.options.map(opt => (
                                                    <View key={opt} style={styles.subOption}>
                                                        <Text style={styles.subOptionText}>{opt}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View style={[styles.radioOuter, selectedMethod === method.id && styles.radioOuterActive]}>
                                    {selectedMethod === method.id && <View style={styles.radioInner} />}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Offers */}
                <View style={styles.offerCard}>
                    <Ionicons name="pricetag-outline" size={18} color={AppColors.primary} />
                    <Text style={styles.offerText}>Apply coupon code</Text>
                    <TouchableOpacity>
                        <Text style={styles.offerAction}>Apply</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <Text style={styles.footerLabel}>Total</Text>
                    <Text style={styles.footerTotal}>₹{total}</Text>
                </View>
                <TouchableOpacity style={styles.payBtn} onPress={handlePayment} activeOpacity={0.88}>
                    <Ionicons name="lock-closed" size={16} color={AppColors.white} />
                    <Text style={styles.payBtnText}>Pay ₹{total}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.base,
        paddingBottom: Spacing.md,
        gap: Spacing.md,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.lg,
        backgroundColor: AppColors.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },
    headerTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    scrollContent: {
        padding: Spacing.lg,
        paddingTop: 0,
    },
    card: {
        backgroundColor: AppColors.white,
        borderRadius: BorderRadius.xl,
        padding: Spacing.lg,
        ...Shadows.md,
        marginBottom: Spacing.lg,
    },
    cardTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.md,
    },
    orderRow: {
        marginBottom: Spacing.md,
    },
    orderTurfName: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
        marginBottom: 3,
    },
    orderDetails: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
        marginBottom: Spacing.sm,
    },
    sportChip: {
        alignSelf: 'flex-start',
        backgroundColor: AppColors.primaryLight,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: 4,
    },
    sportChipText: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.semibold,
    },
    divider: {
        height: 1,
        backgroundColor: AppColors.borderLight,
        marginVertical: Spacing.md,
    },
    priceBreakdown: {
        gap: Spacing.sm,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
    },
    priceValue: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: AppColors.textPrimary,
    },
    totalLabel: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    totalValue: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.primary,
    },
    section: {
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.md,
    },
    paymentMethodsCard: {
        backgroundColor: AppColors.white,
        borderRadius: BorderRadius.xl,
        ...Shadows.md,
        overflow: 'hidden',
    },
    methodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.base,
    },
    methodItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: AppColors.borderLight,
    },
    methodItemSelected: {
        backgroundColor: '#F0FDF4',
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        flex: 1,
    },
    methodIconBg: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.lg,
        backgroundColor: AppColors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    methodIconBgActive: {
        backgroundColor: AppColors.primary,
    },
    methodName: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
        marginBottom: 2,
    },
    methodDesc: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
    },
    subOptionsRow: {
        flexDirection: 'row',
        gap: Spacing.xs,
        marginTop: 4,
    },
    subOption: {
        backgroundColor: AppColors.primaryLight,
        borderRadius: BorderRadius.sm,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    subOptionText: {
        fontSize: 10,
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.medium,
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: AppColors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterActive: {
        borderColor: AppColors.primary,
    },
    radioInner: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: AppColors.primary,
    },
    offerCard: {
        backgroundColor: AppColors.white,
        borderRadius: BorderRadius.xl,
        padding: Spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        ...Shadows.sm,
        borderWidth: 1.5,
        borderColor: AppColors.primaryLight,
        borderStyle: 'dashed',
    },
    offerText: {
        flex: 1,
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
    },
    offerAction: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.primary,
    },
    footer: {
        backgroundColor: AppColors.white,
        borderTopWidth: 1,
        borderTopColor: AppColors.border,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.base,
        paddingBottom: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 10,
    },
    footerLeft: {
        gap: 2,
    },
    footerLabel: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
    },
    footerTotal: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    payBtn: {
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 13,
        paddingHorizontal: Spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 7,
    },
    payBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
});
