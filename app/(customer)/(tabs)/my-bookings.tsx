import BookingCard from '@/components/booking/booking-card/BookingCard';
import { MOCK_BOOKINGS } from '@/constants/mockData';
import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { CalendarDays, Settings2 } from 'lucide-react-native';
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

type TabType = 'upcoming' | 'completed';

export default function MyBookingsScreen() {
    const [activeTab, setActiveTab] = React.useState<TabType>('upcoming');

    const upcomingBookings = MOCK_BOOKINGS.filter(b => b.status === 'upcoming');
    const pastBookings = MOCK_BOOKINGS.filter(b => b.status !== 'upcoming');

    const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
                <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
                    <Settings2 size={20} color={colors.textPrimary} strokeWidth={2} />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <View style={styles.tabsWrapper}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
                        onPress={() => setActiveTab('upcoming')}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
                            Upcoming
                        </Text>
                        {upcomingBookings.length > 0 && (
                            <View style={[styles.tabBadge, activeTab === 'upcoming' && styles.tabBadgeActive]}>
                                <Text style={[styles.tabBadgeText, activeTab === 'upcoming' && styles.tabBadgeTextActive]}>
                                    {upcomingBookings.length}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
                        onPress={() => setActiveTab('completed')}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
                            Past Bookings
                        </Text>
                        {pastBookings.length > 0 && (
                            <View style={[styles.tabBadge, activeTab === 'completed' && styles.tabBadgeActive]}>
                                <Text style={[styles.tabBadgeText, activeTab === 'completed' && styles.tabBadgeTextActive]}>
                                    {pastBookings.length}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bookings List */}
            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {displayedBookings.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconContainer}>
                            <CalendarDays size={32} color={colors.textTertiary} strokeWidth={1.5} />
                        </View>
                        <Text style={styles.emptyTitle}>
                            {activeTab === 'upcoming' ? 'No Upcoming Bookings' : 'No Past Bookings'}
                        </Text>
                        <Text style={styles.emptySubtitle}>
                            {activeTab === 'upcoming'
                                ? 'Time to get on the field. Book your favorite turf!'
                                : 'Your booking history will appear here.'}
                        </Text>
                    </View>
                ) : (
                    displayedBookings.map((booking) => (
                        <BookingCard
                            key={booking.id}
                            booking={booking}
                            onPress={() => { }}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background, // Clean base
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
    },
    headerTitle: {
        fontSize: typography.sizes.xl,      // 24 (large modern header)
        fontWeight: typography.weights.bold, // iOS/M3 style bold headings
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    filterBtn: {
        width: 44,
        height: 44,
        borderRadius: layout.borderRadius.full,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight, // minimal border ring
        ...shadows.sm,                   // very gentle float
    },
    tabsContainer: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    tabsWrapper: {
        flexDirection: 'row',
        backgroundColor: colors.backgroundSecondary, // #F5F5F5
        borderRadius: layout.borderRadius.xl,        // 20px Pill backing
        padding: spacing.xxs,                        // Tight 4px inner gap
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,                 // 12px
        borderRadius: layout.borderRadius.lg,        // 16px soft internal pill
        gap: spacing.xs,                             // 8px between text and badge
    },
    tabActive: {
        backgroundColor: colors.surface,             // White
        ...shadows.sm,                                // Apple style depth
    },
    tabText: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
        color: colors.textSecondary,
        letterSpacing: typography.letterSpacing.normal,
    },
    tabTextActive: {
        color: colors.textPrimary,                     // Strong black contrast
        fontWeight: typography.weights.bold,           // Thick bold active state
    },
    tabBadge: {
        minWidth: 20,                                  // Clean bounding width
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.borderLight,           // Light gray inactive
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    tabBadgeActive: {
        backgroundColor: colors.primary,               // Green primary pop
    },
    tabBadgeText: {
        fontSize: 10,
        fontWeight: typography.weights.bold,
        color: colors.textSecondary,
    },
    tabBadgeTextActive: {
        color: colors.surface,                         // White text on green background
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing['4xl'],                 // Large scrolling bottom space
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing['4xl'],               // Huge 96px whitespace
        gap: spacing.sm,
    },
    emptyIconContainer: {
        width: 64,                                     // Proportional icon bounding
        height: 64,
        borderRadius: layout.borderRadius.full,
        backgroundColor: colors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderStyle: 'dashed',
    },
    emptyTitle: {
        fontSize: typography.sizes.md,                 // 18
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        textAlign: 'center',
        maxWidth: 240,                                 // Constrict line length for readability
        lineHeight: 22,
    },
});
