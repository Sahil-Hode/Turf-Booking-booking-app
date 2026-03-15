import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TurfCard } from '../../../components/cards/TurfCard';
import { mockTurfs } from '../../../src/data/mockData';
import { useAppStore } from '../../../src/store/useAppStore';
import { Colors } from '../../../src/theme/colors';

const SPORTS_FILTER = ['All', 'Football', 'Cricket', 'Tennis', 'Basketball', 'Badminton'];

export default function SearchScreen() {
    const router = useRouter();
    const { favorites, toggleFavorite } = useAppStore();
    const [query, setQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filtered = useMemo(() => {
        return mockTurfs.filter((t) => {
            const matchesQuery =
                query === '' ||
                t.name.toLowerCase().includes(query.toLowerCase()) ||
                t.location.toLowerCase().includes(query.toLowerCase());
            const matchesSport =
                selectedFilter === 'All' || t.sports.includes(selectedFilter);
            return matchesQuery && matchesSport;
        });
    }, [query, selectedFilter]);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Explore Turfs</Text>
                <TouchableOpacity style={styles.filterBtn} onPress={() => router.push('/(customer)/filters' as any)}>
                    <SlidersHorizontal size={18} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchWrapper}>
                <Search size={18} color="#64748b" style={{ marginRight: 10 }} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search turfs, sports, venues..."
                    placeholderTextColor="#64748b"
                    value={query}
                    onChangeText={setQuery}
                    autoFocus={false}
                    selectionColor={Colors.primary}
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery('')}>
                        <X size={16} color="#64748b" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Sport Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersScroll}
                style={styles.filtersContainer}
            >
                {SPORTS_FILTER.map((sport) => (
                    <TouchableOpacity
                        key={sport}
                        style={[
                            styles.filterChip,
                            selectedFilter === sport && styles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter(sport)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                selectedFilter === sport && styles.filterChipTextActive,
                            ]}
                        >
                            {sport}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Results */}
            <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>{filtered.length} turfs found</Text>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TurfCard
                        turf={item}
                        variant="list"
                        onPress={() => router.push(`/(customer)/turf-details/${item.id}`)}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <Text style={styles.emptyText}>No turfs found</Text>
                        <Text style={styles.emptySubText}>Try a different search or filter</Text>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface1,
        borderRadius: 14,
        marginHorizontal: 16,
        paddingHorizontal: 14,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    searchInput: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 15,
        paddingVertical: 13,
    },
    filtersContainer: {
        marginTop: 12,
        marginBottom: 4,
    },
    filtersScroll: {
        paddingHorizontal: 16,
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: Colors.surface1,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    filterChipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterChipText: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '600',
    },
    filterChipTextActive: {
        color: Colors.backgroundDark,
    },
    resultsHeader: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    resultsCount: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '500',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    empty: {
        alignItems: 'center',
        paddingTop: 60,
        gap: 8,
    },
    emptyIcon: { fontSize: 40 },
    emptyText: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '700',
    },
    emptySubText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
});
