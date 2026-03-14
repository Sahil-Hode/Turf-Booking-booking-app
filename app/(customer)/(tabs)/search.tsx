import PrimaryButton from '@/components/common/buttons/PrimaryButton';
import SearchInput from '@/components/common/inputs/SearchInput';
import TurfCardVertical from '@/components/turf/turf-card/TurfCardVertical';
import { MOCK_TURFS, SPORT_CATEGORIES } from '@/constants/mockData';
import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useRouter } from 'expo-router';
import { Check, SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const FILTER_OPTIONS = {
    availability: ['Any time', 'Available Now', 'Tomorrow'],
    rating: ['Any', '4.5+', '4.0+', '3.5+'],
    price: ['Any', 'Under ₹1000', '₹1000 - ₹2000', 'Above ₹2000'],
};

export default function SearchScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedSport, setSelectedSport] = React.useState('all');
    const [showFilters, setShowFilters] = React.useState(false);

    // Filter States
    const [filters, setFilters] = React.useState({
        availability: 'Any time',
        rating: 'Any',
        price: 'Any',
    });

    const [turfs, setTurfs] = React.useState(MOCK_TURFS);

    const handleTurfPress = (id: string) => {
        router.push(`/(customer)/turf-details/${id}`);
    };

    const handleFavoriteToggle = (id: string) => {
        setTurfs(prev =>
            prev.map(t => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)
        );
    };

    const clearFilters = () => {
        setFilters({ availability: 'Any time', rating: 'Any', price: 'Any' });
        setSelectedSport('all');
    };

    const activeFilterCount =
        (filters.availability !== 'Any time' ? 1 : 0) +
        (filters.rating !== 'Any' ? 1 : 0) +
        (filters.price !== 'Any' ? 1 : 0) +
        (selectedSport !== 'all' ? 1 : 0);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header Search */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Text style={styles.headerTitle}>Explore</Text>
                    <TouchableOpacity
                        style={[styles.filterActionBtn, activeFilterCount > 0 && styles.filterActionBtnActive]}
                        onPress={() => setShowFilters(!showFilters)}
                        activeOpacity={0.8}
                    >
                        <SlidersHorizontal
                            size={18}
                            color={activeFilterCount > 0 ? colors.primary : colors.textPrimary}
                            strokeWidth={2}
                        />
                        {activeFilterCount > 0 && (
                            <View style={styles.filterBadge}>
                                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <SearchInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search locations, turfs..."
                    style={styles.searchInput}
                />
            </View>

            {/* Expanding Filters Section */}
            {showFilters && (
                <View style={styles.filtersContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>

                        {/* Sport Types */}
                        <View style={styles.filterSection}>
                            <Text style={styles.filterTitle}>Sport</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                                {SPORT_CATEGORIES.map(sport => (
                                    <TouchableOpacity
                                        key={sport.id}
                                        style={[styles.filterChip, selectedSport === sport.id && styles.filterChipActive]}
                                        onPress={() => setSelectedSport(sport.id)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[styles.filterChipText, selectedSport === sport.id && styles.filterChipTextActive]}>
                                            {sport.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        {/* Configurable Filters */}
                        {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
                            <View key={key} style={styles.filterSection}>
                                <Text style={styles.filterTitle}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                                <View style={styles.filterGrid}>
                                    {options.map((option) => {
                                        const isActive = filters[key as keyof typeof filters] === option;
                                        return (
                                            <TouchableOpacity
                                                key={option}
                                                style={[styles.filterGridItem, isActive && styles.filterGridItemActive]}
                                                onPress={() => setFilters(prev => ({ ...prev, [key]: option }))}
                                                activeOpacity={0.8}
                                            >
                                                {isActive && <Check size={14} color={colors.primary} strokeWidth={2.5} style={styles.checkIcon} />}
                                                <Text style={[styles.filterGridText, isActive && styles.filterGridTextActive]}>
                                                    {option}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}

                        <View style={styles.filterActions}>
                            <TouchableOpacity style={styles.clearBtn} onPress={clearFilters} activeOpacity={0.7}>
                                <Text style={styles.clearBtnText}>Reset</Text>
                            </TouchableOpacity>
                            <PrimaryButton
                                title="Apply Filters"
                                onPress={() => setShowFilters(false)}
                                style={styles.applyBtn}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}

            {/* Results */}
            {!showFilters && (
                <ScrollView style={styles.resultsContainer} contentContainerStyle={styles.resultsContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.resultsCount}>
                        {MOCK_TURFS.length} turfs found
                    </Text>
                    {turfs.map((turf) => (
                        <TurfCardVertical
                            key={turf.id}
                            turf={turf}
                            onPress={() => handleTurfPress(turf.id)}
                            onFavoriteToggle={() => handleFavoriteToggle(turf.id)}
                        />
                    ))}
                    <View style={{ height: spacing['4xl'] }} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background, // Pure White
    },
    header: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight, // Ensure extremely clean division
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    headerTitle: {
        fontSize: typography.sizes.xl,      // 24 (H2 Size)
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    filterActionBtn: {
        position: 'relative',
        width: 44,
        height: 44,
        borderRadius: layout.borderRadius.full,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight, // Minimal stroke handling
        ...shadows.sm,
    },
    filterActionBtnActive: {
        borderColor: colors.primaryLight,  // Green hue
        backgroundColor: colors.backgroundSecondary, // Soft gray 
    },
    filterBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.primary,  // Bright Green
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: colors.surface,      // Outline cutout effect
    },
    filterBadgeText: {
        color: colors.surface,
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.bold,
    },
    searchInput: {
        // Overriding search styles slightly
    },

    // Exanded Filters Panel
    filtersContainer: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary, // Push filters into a subtle gray background
    },
    filterSection: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
    },
    filterTitle: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.bold,
        color: colors.textSecondary,
        textTransform: 'uppercase', // Sectional typography
        letterSpacing: typography.letterSpacing.wider,
        marginBottom: spacing.sm,
    },
    filterRow: {
        gap: spacing.sm, // 12px
        paddingRight: spacing.lg,
    },
    filterChip: {
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,  // 16 px wide
        paddingVertical: spacing.sm,    // 12 tall
        borderRadius: layout.borderRadius.full,
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm, // Soft pops for interaction
    },
    filterChipActive: {
        backgroundColor: colors.textPrimary, // True black Apple style selector
        borderColor: colors.textPrimary,
    },
    filterChipText: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
        color: colors.textSecondary,
    },
    filterChipTextActive: {
        color: colors.surface,
        fontWeight: typography.weights.bold,
    },
    filterGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    filterGridItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: layout.borderRadius.md, // 12
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    filterGridItemActive: {
        backgroundColor: colors.primaryLight, // #DCFCE7 Tinted block
        borderColor: colors.primary,          // Green strict border
    },
    checkIcon: {
        marginRight: 6,
    },
    filterGridText: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        fontWeight: typography.weights.medium,
    },
    filterGridTextActive: {
        color: colors.primary, // Green text mapping 
        fontWeight: typography.weights.bold,
    },
    filterActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.lg,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight, // Locking the list off
        marginTop: spacing.lg,
    },
    clearBtn: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    clearBtnText: {
        fontSize: typography.sizes.sm,
        color: colors.textTertiary,
        fontWeight: typography.weights.bold,
    },
    applyBtn: {
        flex: 1,
    },

    // Results Layout
    resultsContainer: {
        flex: 1,
        backgroundColor: colors.backgroundSecondary, // Keep background minimal gray and white cards float
    },
    resultsContent: {
        padding: spacing.lg,             // 24
    },
    resultsCount: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.bold, // Pro weight handling
        color: colors.textTertiary,
        marginBottom: spacing.md,
        textTransform: 'uppercase',          // Tracking mapping
        letterSpacing: typography.letterSpacing.wider,
    },
});
