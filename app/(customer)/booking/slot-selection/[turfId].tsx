import { AppColors } from '@/constants/colors';
import { MOCK_TIME_SLOTS, MOCK_TURFS } from '@/constants/mockData';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push({
            id: i.toString(),
            day: i === 0 ? 'Today' : d.toLocaleDateString('en', { weekday: 'short' }),
            date: d.getDate(),
            month: d.toLocaleDateString('en', { month: 'short' }),
            fullDate: d.toLocaleDateString('en', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }),
        });
    }
    return dates;
};

const DATES = getDates();

type SlotGroup = 'morning' | 'afternoon' | 'evening';

interface Slot {
    id: string;
    time: string;
    available: boolean;
    selected: boolean;
}

export default function SlotSelectionScreen() {
    const router = useRouter();
    const { turfId } = useLocalSearchParams<{ turfId: string }>();
    const turf = MOCK_TURFS.find(t => t.id === turfId) || MOCK_TURFS[0];

    const [selectedDate, setSelectedDate] = React.useState(DATES[0].id);
    const [slots, setSlots] = React.useState<Record<SlotGroup, Slot[]>>(MOCK_TIME_SLOTS);
    const [selectedSlots, setSelectedSlots] = React.useState<string[]>([]);

    const toggleSlot = (group: SlotGroup, slotId: string) => {
        if (!slots[group].find(s => s.id === slotId)?.available) return;

        setSelectedSlots(prev => {
            if (prev.includes(slotId)) return prev.filter(id => id !== slotId);
            return [...prev, slotId];
        });
    };

    const getTotalPrice = () => {
        return selectedSlots.length * turf.price;
    };

    const getSelectedSlotTimes = () => {
        const allSlots = [...slots.morning, ...slots.afternoon, ...slots.evening];
        return allSlots.filter(s => selectedSlots.includes(s.id)).map(s => s.time);
    };

    const renderSlotGroup = (label: string, group: SlotGroup, icon: string) => (
        <View style={styles.slotGroup} key={group}>
            <View style={styles.slotGroupHeader}>
                <Text style={styles.slotGroupIcon}>{icon}</Text>
                <Text style={styles.slotGroupTitle}>{label}</Text>
            </View>
            <View style={styles.slotsGrid}>
                {slots[group].map((slot) => {
                    const isSelected = selectedSlots.includes(slot.id);
                    return (
                        <TouchableOpacity
                            key={slot.id}
                            style={[
                                styles.slotChip,
                                !slot.available && styles.slotUnavailable,
                                isSelected && styles.slotSelected,
                            ]}
                            onPress={() => toggleSlot(group, slot.id)}
                            disabled={!slot.available}
                            activeOpacity={0.8}
                        >
                            <Text style={[
                                styles.slotTime,
                                !slot.available && styles.slotTimeUnavailable,
                                isSelected && styles.slotTimeSelected,
                            ]}>
                                {slot.time}
                            </Text>
                            {!slot.available && (
                                <Text style={styles.slotBooked}>Booked</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={AppColors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
                    <Ionicons name="chevron-back" size={24} color={AppColors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>Select Slot</Text>
                    <Text style={styles.headerSubtitle}>{turf.name}</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Date Picker */}
                <View style={styles.dateSection}>
                    <Text style={styles.sectionTitle}>Select Date</Text>
                    <FlatList
                        data={DATES}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.datesRow}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.dateCard, selectedDate === item.id && styles.dateCardActive]}
                                onPress={() => setSelectedDate(item.id)}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.dateDay, selectedDate === item.id && styles.dateDayActive]}>
                                    {item.day}
                                </Text>
                                <Text style={[styles.dateNum, selectedDate === item.id && styles.dateNumActive]}>
                                    {item.date}
                                </Text>
                                <Text style={[styles.dateMonth, selectedDate === item.id && styles.dateMonthActive]}>
                                    {item.month}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Slots Legend */}
                <View style={styles.legendRow}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: AppColors.primary }]} />
                        <Text style={styles.legendText}>Available</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: AppColors.border }]} />
                        <Text style={styles.legendText}>Booked</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: AppColors.primary, borderWidth: 2, borderColor: AppColors.primaryDark }]} />
                        <Text style={styles.legendText}>Selected</Text>
                    </View>
                </View>

                {/* Time Slots */}
                <View style={styles.slotsSection}>
                    <Text style={styles.sectionTitle}>Select Time</Text>
                    {renderSlotGroup('Morning', 'morning', '🌅')}
                    {renderSlotGroup('Afternoon', 'afternoon', '☀️')}
                    {renderSlotGroup('Evening', 'evening', '🌙')}
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Footer */}
            {selectedSlots.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.footerInfo}>
                        <Text style={styles.footerSlots}>
                            {selectedSlots.length} slot{selectedSlots.length > 1 ? 's' : ''} selected
                        </Text>
                        <Text style={styles.footerPrice}>₹{getTotalPrice()}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.payBtn}
                        onPress={() => router.push(`/(customer)/booking/payment/${turfId}`)}
                        activeOpacity={0.88}
                    >
                        <Text style={styles.payBtnText}>Pay Now</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedSlots.length === 0 && (
                <View style={styles.footerEmpty}>
                    <Text style={styles.footerEmptyText}>Select at least one time slot to continue</Text>
                </View>
            )}
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
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    headerSubtitle: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    dateSection: {
        paddingLeft: Spacing.lg,
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.md,
        paddingRight: Spacing.lg,
    },
    datesRow: {
        paddingRight: Spacing.lg,
        gap: Spacing.sm,
    },
    dateCard: {
        width: 62,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: BorderRadius.xl,
        backgroundColor: AppColors.white,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        gap: 2,
    },
    dateCardActive: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    dateDay: {
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.medium,
        color: AppColors.textMuted,
    },
    dateDayActive: {
        color: 'rgba(255,255,255,0.8)',
    },
    dateNum: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    dateNumActive: {
        color: AppColors.white,
    },
    dateMonth: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
    },
    dateMonthActive: {
        color: 'rgba(255,255,255,0.8)',
    },
    legendRow: {
        flexDirection: 'row',
        gap: Spacing.lg,
        paddingHorizontal: Spacing.lg,
        marginBottom: Spacing.base,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
    },
    slotsSection: {
        paddingHorizontal: Spacing.lg,
        gap: Spacing.xl,
    },
    slotGroup: {
        gap: Spacing.md,
    },
    slotGroupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    slotGroupIcon: {
        fontSize: 16,
    },
    slotGroupTitle: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
    },
    slotsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    slotChip: {
        paddingHorizontal: Spacing.base,
        paddingVertical: 10,
        borderRadius: BorderRadius.xl,
        backgroundColor: AppColors.white,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        minWidth: 90,
        alignItems: 'center',
    },
    slotUnavailable: {
        backgroundColor: AppColors.backgroundSecondary,
        borderColor: AppColors.borderLight,
        opacity: 0.6,
    },
    slotSelected: {
        backgroundColor: AppColors.primary,
        borderColor: AppColors.primary,
    },
    slotTime: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: AppColors.textPrimary,
    },
    slotTimeUnavailable: {
        color: AppColors.textMuted,
    },
    slotTimeSelected: {
        color: AppColors.white,
        fontWeight: Typography.fontWeight.semibold,
    },
    slotBooked: {
        fontSize: 9,
        color: AppColors.textMuted,
        marginTop: 2,
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
    footerInfo: {
        gap: 2,
    },
    footerSlots: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
    },
    footerPrice: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    payBtn: {
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 13,
        paddingHorizontal: Spacing['2xl'],
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    payBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
    footerEmpty: {
        backgroundColor: AppColors.white,
        borderTopWidth: 1,
        borderTopColor: AppColors.border,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        paddingBottom: 24,
        alignItems: 'center',
    },
    footerEmptyText: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
    },
});
