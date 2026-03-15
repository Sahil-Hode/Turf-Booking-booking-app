import { useRouter } from 'expo-router';
import {
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock,
    MapPin,
    XCircle,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../../src/store/useAppStore';
import { Colors } from '../../../src/theme/colors';
import { Booking } from '../../../src/types';

const TABS = ['Upcoming', 'Past', 'Cancelled'];

function BookingCard({
    booking,
    onPress,
}: {
    booking: Booking;
    onPress: () => void;
}) {
    const isUpcoming = booking.status === 'upcoming';
    const isCancelled = booking.status === 'cancelled';

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
            {/* Status strip */}
            <View style={[styles.statusStrip, isUpcoming ? styles.stripUpcoming : isCancelled ? styles.stripCancelled : styles.stripCompleted]} />

            <View style={styles.cardContent}>
                <Image source={{ uri: booking.turfImage }} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardInfo}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTurfName} numberOfLines={1}>{booking.turfName}</Text>
                        <View style={[styles.statusBadge, isUpcoming ? styles.badgeUpcoming : isCancelled ? styles.badgeCancelled : styles.badgeCompleted]}>
                            {isUpcoming ? (
                                <CheckCircle2 size={10} color={Colors.primary} />
                            ) : isCancelled ? (
                                <XCircle size={10} color="#ef4444" />
                            ) : (
                                <CheckCircle2 size={10} color="#94a3b8" />
                            )}
                            <Text style={[styles.statusText, isUpcoming ? styles.textUpcoming : isCancelled ? styles.textCancelled : styles.textCompleted]}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.cardRow}>
                        <CalendarDays size={12} color={Colors.textSecondary} />
                        <Text style={styles.cardMeta}>{booking.date}</Text>
                    </View>
                    <View style={styles.cardRow}>
                        <Clock size={12} color={Colors.textSecondary} />
                        <Text style={styles.cardMeta}>{booking.timeSlot}</Text>
                    </View>
                    <View style={styles.cardRow}>
                        <MapPin size={12} color={Colors.textSecondary} />
                        <Text style={styles.cardMeta} numberOfLines={1}>{booking.location}</Text>
                    </View>

                    <View style={styles.cardFooter}>
                        <Text style={styles.cardAmount}>₹{booking.totalAmount.toLocaleString()}</Text>
                        <Text style={styles.cardRef}>{booking.bookingRef}</Text>
                    </View>
                </View>
            </View>

            {isUpcoming && (
                <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>View Details</Text>
                    <ChevronRight size={14} color={Colors.primary} />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
}

export default function MyBookingsScreen() {
    const router = useRouter();
    const bookings = useAppStore((s) => s.bookings);
    const [activeTab, setActiveTab] = useState('Upcoming');

    const filtered = bookings.filter((b) => {
        if (activeTab === 'Upcoming') return b.status === 'upcoming';
        if (activeTab === 'Past') return b.status === 'completed';
        return b.status === 'cancelled';
    });

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
                <Text style={styles.headerSub}>{bookings.length} total</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.tabIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <BookingCard
                        booking={item}
                        onPress={() =>
                            router.push(`/(customer)/booking/confirmation/${item.id}`)
                        }
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>
                            {activeTab === 'Upcoming' ? '📅' : activeTab === 'Past' ? '📋' : '❌'}
                        </Text>
                        <Text style={styles.emptyTitle}>No {activeTab} Bookings</Text>
                        <Text style={styles.emptyText}>
                            {activeTab === 'Upcoming'
                                ? 'Book a turf to get started!'
                                : 'Your booking history will appear here'}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    headerSub: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginBottom: 2,
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderDark,
        paddingHorizontal: 16,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        position: 'relative',
    },
    tabActive: {},
    tabText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },
    tabTextActive: {
        color: Colors.primary,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -1,
        left: '20%',
        right: '20%',
        height: 2,
        backgroundColor: Colors.primary,
        borderRadius: 1,
    },
    listContent: {
        padding: 16,
        gap: 14,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: Colors.surface1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        overflow: 'hidden',
    },
    statusStrip: {
        height: 3,
    },
    stripUpcoming: { backgroundColor: Colors.primary },
    stripCompleted: { backgroundColor: '#94a3b8' },
    stripCancelled: { backgroundColor: '#ef4444' },
    cardContent: {
        flexDirection: 'row',
        gap: 12,
        padding: 14,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    cardInfo: {
        flex: 1,
        gap: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    cardTurfName: {
        color: Colors.textPrimary,
        fontSize: 15,
        fontWeight: '700',
        flex: 1,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },
    badgeUpcoming: { backgroundColor: Colors.primaryMuted },
    badgeCompleted: { backgroundColor: 'rgba(148,163,184,0.15)' },
    badgeCancelled: { backgroundColor: 'rgba(239,68,68,0.12)' },
    statusText: { fontSize: 10, fontWeight: '700' },
    textUpcoming: { color: Colors.primary },
    textCompleted: { color: '#94a3b8' },
    textCancelled: { color: '#ef4444' },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardMeta: {
        color: Colors.textSecondary,
        fontSize: 12,
        flex: 1,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    cardAmount: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: '800',
    },
    cardRef: {
        color: '#475569',
        fontSize: 11,
        fontWeight: '500',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        borderTopWidth: 1,
        borderTopColor: Colors.borderDark,
        paddingVertical: 12,
    },
    actionBtnText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    empty: {
        alignItems: 'center',
        paddingTop: 60,
        gap: 8,
    },
    emptyIcon: { fontSize: 48 },
    emptyTitle: {
        color: Colors.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
    },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
});
