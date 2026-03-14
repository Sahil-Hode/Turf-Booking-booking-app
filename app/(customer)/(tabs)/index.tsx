import TurfCardHorizontal from '@/components/turf/turf-card/TurfCardHorizontal';
import TurfCardVertical from '@/components/turf/turf-card/TurfCardVertical';
import { MOCK_TURFS } from '@/constants/mockData';
import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useRouter } from 'expo-router';
import { Activity, ChevronDown, Dribbble, Search, User } from 'lucide-react-native';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Grab / Uber uses distinct large grid buttons for primary services Instead of tiny chips
const MAIN_SERVICES = [
    { id: 'football', label: 'Football', icon: Dribbble },
    { id: 'cricket', label: 'Cricket', icon: Activity },
    { id: 'tennis', label: 'Tennis', icon: Activity },
    { id: 'badminton', label: 'Badminton', icon: Activity },
];

export default function HomeScreen() {
    const router = useRouter();
    const [turfs, setTurfs] = React.useState(MOCK_TURFS);

    const topRated = MOCK_TURFS.filter(t => t.rating >= 4.7).slice(0, 4);

    const handleTurfPress = (id: string) => {
        router.push(`/(customer)/turf-details/${id}`);
    };

    const handleFavoriteToggle = (id: string) => {
        setTurfs(prev =>
            prev.map(t => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Fixed Header - Uber/Grab Style */}
            <View style={styles.fixedHeader}>
                <View style={styles.addressBar}>
                    <View>
                        <Text style={styles.addressLabel}>Current Location</Text>
                        <TouchableOpacity style={styles.addressSelector} activeOpacity={0.7}>
                            <Text style={styles.addressText} numberOfLines={1}>Indiranagar, Bangalore</Text>
                            <ChevronDown size={18} color={colors.textPrimary} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(customer)/(tabs)/profile')} activeOpacity={0.8}>
                        <User size={22} color={colors.textPrimary} strokeWidth={2} />
                    </TouchableOpacity>
                </View>

                {/* Uber-like Search Bar attached to header */}
                <TouchableOpacity
                    style={styles.searchBox}
                    activeOpacity={0.9}
                    onPress={() => router.push('/(customer)/(tabs)/search')}
                >
                    <Search size={22} color={colors.textPrimary} strokeWidth={2.5} />
                    <Text style={styles.searchText}>Find turfs, sports, or formats...</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Quick Actions Grid (Grab Style) */}
                <View style={styles.quickActionsContainer}>
                    <View style={styles.gridRow}>
                        {MAIN_SERVICES.slice(0, 2).map((service) => {
                            const Icon = service.icon;
                            return (
                                <TouchableOpacity key={service.id} style={styles.actionCard} activeOpacity={0.8}>
                                    <Icon size={32} color={colors.primary} strokeWidth={1.5} style={styles.actionIcon} />
                                    <Text style={styles.actionLabel}>{service.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View style={styles.gridRow}>
                        {MAIN_SERVICES.slice(2, 4).map((service) => {
                            const Icon = service.icon;
                            return (
                                <TouchableOpacity key={service.id} style={styles.actionCardSmall} activeOpacity={0.8}>
                                    <Text style={styles.actionLabelSmall}>{service.label}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Thick Divider typical of Grab/Uber to separate sections */}
                <View style={styles.sectionDivider} />

                {/* Horizontal Scroll (Top Rated) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Rated Around You</Text>
                    </View>
                    <FlatList
                        data={topRated}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.horizontalList}
                        renderItem={({ item }) => (
                            <TurfCardHorizontal
                                turf={item}
                                onPress={() => handleTurfPress(item.id)}
                                onFavoriteToggle={() => handleFavoriteToggle(item.id)}
                            />
                        )}
                    />
                </View>

                <View style={styles.sectionDivider} />

                {/* Recommended Vertical Scroll */}
                <View style={[styles.section, { marginBottom: spacing.xl }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recommended Turfs</Text>
                    </View>
                    <View style={styles.verticalList}>
                        {turfs.map((turf) => (
                            <TurfCardVertical
                                key={turf.id}
                                turf={turf}
                                onPress={() => handleTurfPress(turf.id)}
                                onFavoriteToggle={() => handleFavoriteToggle(turf.id)}
                            />
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background, // Pure White
    },
    fixedHeader: {
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.lg,
        // Bottom border is heavily used in Uber
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    addressBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    addressLabel: {
        fontSize: typography.sizes.xs,
        color: colors.textSecondary,
        fontWeight: typography.weights.bold,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wider,
        marginBottom: 4,
    },
    addressSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    addressText: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tighter,
    },
    profileBtn: {
        width: 44,
        height: 44,
        borderRadius: layout.borderRadius.full,
        backgroundColor: colors.backgroundSecondary, // Gray offset
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary, // #F5F5F5 classic gray box
        borderRadius: layout.borderRadius.lg, // 16px soft bounding box
        paddingHorizontal: spacing.md, // 16
        paddingVertical: 14,
        gap: spacing.md,
    },
    searchText: {
        flex: 1,
        fontSize: typography.sizes.base,
        color: colors.textSecondary,
        fontWeight: typography.weights.medium,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: spacing['4xl'],
    },
    quickActionsContainer: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xl, // Generous whitespace 
        gap: spacing.sm, // 12
    },
    gridRow: {
        flexDirection: 'row',
        gap: spacing.sm, // 12px between columns
    },
    actionCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.lg, // 16
        padding: spacing.md,
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: colors.borderLight, // Soft boundary
        ...shadows.sm, // Apple/Stripe soft lift
        height: 104, // Large tap target height matching Uber
    },
    actionCardSmall: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary, // Non-primary actions get gray background
        borderRadius: layout.borderRadius.md, // 12
        padding: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
        height: 48, // Button-like
    },
    actionIcon: {
        marginBottom: 'auto', // Pushes text to bottom
    },
    actionLabel: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
    },
    actionLabelSmall: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
    },
    sectionDivider: {
        height: 8,
        backgroundColor: colors.backgroundSecondary, // Thick separation bar like super-apps
        width: '100%',
    },
    section: {
        paddingVertical: spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold, // Pro weights
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    horizontalList: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm, // Bleed
    },
    verticalList: {
        paddingHorizontal: spacing.lg,
    },
});
