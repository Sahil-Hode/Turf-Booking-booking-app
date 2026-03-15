import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Info, Moon, Sun, Sunset } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockTimeSlots, mockTurfs } from '../../../../src/data/mockData';
import { useAppStore } from '../../../../src/store/useAppStore';
import { Colors } from '../../../../src/theme/colors';
import { TimeSlot } from '../../../../src/types';

const { width } = Dimensions.get('window');

// Calendar helpers
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getCalendarDays(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { day: number; currentMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
        days.push({ day: daysInPrevMonth - i, currentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({ day: i, currentMonth: true });
    }
    return days;
}

export default function SlotSelectionScreen() {
    const { turfId } = useLocalSearchParams<{ turfId: string }>();
    const router = useRouter();
    const { setBookingDraft } = useAppStore();

    const turf = mockTurfs.find((t) => t.id === turfId) || mockTurfs[0];

    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    const calendarDays = getCalendarDays(currentYear, currentMonth);
    const TODAY = today.getDate();

    const morningSlots = mockTimeSlots.filter((s) => s.period === 'morning');
    const eveningSlots = mockTimeSlots.filter((s) => s.period === 'evening');
    const nightSlots = mockTimeSlots.filter((s) => s.period === 'night');

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleBookNow = () => {
        if (!selectedSlot) return;
        const dateStr = `${DAYS[new Date(currentYear, currentMonth, selectedDay).getDay()]}, ${selectedDay} ${MONTHS[currentMonth].slice(0, 3)} ${currentYear}`;
        setBookingDraft({
            turfId: turf.id,
            turfName: turf.name,
            turfImage: turf.images[0],
            selectedDate: dateStr,
            selectedSlot,
            sport: turf.sports[0],
        });
        router.push(`/(customer)/booking/summary/${turf.id}`);
    };

    const renderSlotGrid = (slots: TimeSlot[], title: string, Icon: any, iconColor: string) => (
        <View style={styles.slotGroup}>
            <View style={styles.slotGroupHeader}>
                <Icon size={20} color={iconColor} />
                <Text style={styles.slotGroupTitle}>{title}</Text>
            </View>
            <View style={styles.slotGrid}>
                {slots.map((slot) => {
                    const isSelected = selectedSlot?.id === slot.id;
                    const isBooked = slot.status === 'booked';
                    return (
                        <TouchableOpacity
                            key={slot.id}
                            style={[
                                styles.slotChip,
                                isSelected && styles.slotChipSelected,
                                isBooked && styles.slotChipBooked,
                            ]}
                            onPress={() => !isBooked && setSelectedSlot(isSelected ? null : slot)}
                            disabled={isBooked}
                        >
                            <Text style={[
                                styles.slotTime,
                                isSelected && styles.slotTimeSelected,
                                isBooked && styles.slotTimeBooked,
                            ]}>
                                {slot.time}
                            </Text>
                            <Text style={[
                                styles.slotPrice,
                                isSelected && styles.slotPriceSelected,
                                isBooked && styles.slotPriceBooked,
                            ]}>
                                {isBooked ? 'Booked' : `₹${slot.price.toLocaleString()}`}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={22} color={Colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Select Time Slot</Text>
                    <Text style={styles.headerSub}>{turf.name}</Text>
                </View>
                <TouchableOpacity style={styles.infoBtn}>
                    <Info size={20} color={Colors.textPrimary} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Calendar */}
                <View style={styles.calendar}>
                    {/* Month Navigation */}
                    <View style={styles.monthNav}>
                        <TouchableOpacity style={styles.navBtn} onPress={handlePrevMonth}>
                            <Text style={styles.navBtnText}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.monthTitle}>
                            {MONTHS[currentMonth]} {currentYear}
                        </Text>
                        <TouchableOpacity style={styles.navBtn} onPress={handleNextMonth}>
                            <Text style={styles.navBtnText}>›</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Day Headers */}
                    <View style={styles.dayHeaders}>
                        {DAYS.map((d) => (
                            <Text key={d} style={styles.dayHeader}>{d}</Text>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    <View style={styles.calendarGrid}>
                        {calendarDays.map((d, i) => {
                            const isSelected = d.currentMonth && d.day === selectedDay && currentMonth === today.getMonth();
                            const isToday = d.currentMonth && d.day === TODAY && currentMonth === today.getMonth();
                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={[
                                        styles.calendarDay,
                                        isSelected && styles.calendarDaySelected,
                                    ]}
                                    onPress={() => d.currentMonth && setSelectedDay(d.day)}
                                >
                                    <Text style={[
                                        styles.calendarDayText,
                                        !d.currentMonth && styles.calendarDayTextOther,
                                        isSelected && styles.calendarDayTextSelected,
                                        isToday && !isSelected && styles.calendarDayTextToday,
                                    ]}>
                                        {d.day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Legend */}
                <View style={styles.legend}>
                    {[
                        { color: Colors.borderMedium, label: 'Available' },
                        { color: Colors.primary, label: 'Selected' },
                        { color: '#1e293b', label: 'Booked' },
                    ].map((l) => (
                        <View key={l.label} style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: l.color }]} />
                            <Text style={styles.legendText}>{l.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Slots */}
                {renderSlotGrid(morningSlots, 'Morning Slots', Sun, '#f59e0b')}
                {renderSlotGrid(eveningSlots, 'Evening Slots', Sunset, '#f97316')}
                {renderSlotGrid(nightSlots, 'Night Slots', Moon, '#818cf8')}
            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.bottomBar}>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalAmount}>
                            {selectedSlot ? `₹${selectedSlot.price.toLocaleString()}` : '₹0'}
                        </Text>
                        <Text style={styles.totalSlots}>/ 1 Slot</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.bookBtn, !selectedSlot && styles.bookBtnDisabled]}
                    onPress={handleBookNow}
                    disabled={!selectedSlot}
                >
                    <Text style={styles.bookBtnText}>Book Now</Text>
                    <Text style={styles.bookBtnArrow}>→</Text>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderDark,
        gap: 12,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface1,
    },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerTitle: { color: Colors.textPrimary, fontSize: 17, fontWeight: '700' },
    headerSub: { color: Colors.primary, fontSize: 12, fontWeight: '500', marginTop: 2 },
    infoBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface1,
    },
    scrollContent: { paddingBottom: 100 },
    // Calendar
    calendar: {
        margin: 16,
        backgroundColor: Colors.primaryMuted,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    monthNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },
    navBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.backgroundDark,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    navBtnText: { color: Colors.textPrimary, fontSize: 20, lineHeight: 24 },
    monthTitle: { color: Colors.textPrimary, fontSize: 15, fontWeight: '700' },
    dayHeaders: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    dayHeader: {
        flex: 1,
        textAlign: 'center',
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        paddingVertical: 6,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    calendarDay: {
        width: `${100 / 7}%`,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
    },
    calendarDaySelected: {
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 4,
    },
    calendarDayText: {
        color: Colors.textPrimary,
        fontSize: 13,
        fontWeight: '500',
    },
    calendarDayTextOther: { opacity: 0.3 },
    calendarDayTextSelected: { color: Colors.backgroundDark, fontWeight: '800' },
    calendarDayTextToday: { color: Colors.primary, fontWeight: '700' },
    // Legend
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        paddingVertical: 10,
    },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 10, height: 10, borderRadius: 5 },
    legendText: { color: Colors.textSecondary, fontSize: 12 },
    // Slot Groups
    slotGroup: { paddingHorizontal: 16, marginTop: 20 },
    slotGroupHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    slotGroupTitle: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
    },
    slotGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    slotChip: {
        width: (width - 56) / 3,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: Colors.backgroundDark,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
    },
    slotChipSelected: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 6,
    },
    slotChipBooked: {
        backgroundColor: Colors.surface2,
        borderColor: Colors.borderDark,
        opacity: 0.5,
    },
    slotTime: {
        color: Colors.textPrimary,
        fontSize: 12,
        fontWeight: '700',
    },
    slotTimeSelected: { color: Colors.backgroundDark },
    slotTimeBooked: { color: '#64748b' },
    slotPrice: {
        color: Colors.primary,
        fontSize: 11,
        marginTop: 3,
    },
    slotPriceSelected: { color: Colors.backgroundDark },
    slotPriceBooked: { color: '#475569' },
    // Bottom
    bottomBar: {
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
    totalInfo: { flex: 1 },
    totalLabel: {
        color: '#64748b',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '700',
    },
    totalRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 2 },
    totalAmount: { color: Colors.textPrimary, fontSize: 22, fontWeight: '800' },
    totalSlots: { color: Colors.textSecondary, fontSize: 12 },
    bookBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    bookBtnDisabled: { opacity: 0.5 },
    bookBtnText: {
        color: Colors.backgroundDark,
        fontSize: 15,
        fontWeight: '800',
    },
    bookBtnArrow: { color: Colors.backgroundDark, fontSize: 18, fontWeight: '700' },
});
