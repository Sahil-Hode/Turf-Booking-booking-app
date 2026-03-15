import { useRouter } from 'expo-router';
import {
    Bell,
    ChevronDown,
    MapPin,
    Plus,
    Search
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TurfCard } from '../../../components/cards/TurfCard';
import { mockTurfs, sportCategories, tonightSlots } from '../../../src/data/mockData';
import { useAppStore } from '../../../src/store/useAppStore';
import { Colors } from '../../../src/theme/colors';

const { width } = Dimensions.get('window');

const SPORT_ICONS: Record<string, string> = {
    football: '⚽',
    cricket: '🏏',
    tennis: '🎾',
    basketball: '🏀',
    badminton: '🏸',
    kabaddi: '🤸',
};

export default function HomeScreen() {
    const router = useRouter();
    const { favorites, toggleFavorite, currentLocation } = useAppStore();
    const [selectedSport, setSelectedSport] = useState('football');

    const popularTurfs = mockTurfs.filter((t) => t.featured);
    const nearbyTurfs = mockTurfs.slice(3, 6);

    const navigateToTurf = (id: string) => {
        router.push(`/(customer)/turf-details/${id}`);
    };

    const navigateToSearch = () => {
        router.push('/(customer)/(tabs)/search');
    };

    const navigateToNotifications = () => {
        router.push('/(customer)/notifications');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />
                        <Text style={styles.headerTitle}>
                            Turf<Text style={{ color: Colors.primary }}>Zy</Text>
                        </Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.locationChip}>
                            <MapPin size={13} color={Colors.primary} />
                            <Text style={styles.locationText} numberOfLines={1}>
                                {currentLocation}
                            </Text>
                            <ChevronDown size={13} color={Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.bellBtn}
                            onPress={navigateToNotifications}
                        >
                            <Bell size={20} color={Colors.textPrimary} />
                            <View style={styles.bellDot} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={navigateToSearch}
                    activeOpacity={0.85}
                >
                    <Search size={18} color="#64748b" />
                    <Text style={styles.searchPlaceholder}>Search turfs, sports or venues</Text>
                </TouchableOpacity>

                {/* Sports Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesScroll}
                    style={styles.categoriesContainer}
                >
                    {sportCategories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={styles.categoryItem}
                            onPress={() => setSelectedSport(cat.id)}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.categoryCircle,
                                    selectedSport === cat.id && styles.categoryCircleActive,
                                ]}
                            >
                                <Text style={styles.categoryEmoji}>
                                    {SPORT_ICONS[cat.id] || '🏅'}
                                </Text>
                            </View>
                            <Text
                                style={[
                                    styles.categoryName,
                                    selectedSport === cat.id && styles.categoryNameActive,
                                ]}
                            >
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Play Tonight */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>PLAY TONIGHT</Text>
                            <Text style={styles.sectionSub}>Available slots for today</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.slotScroll}
                    >
                        {tonightSlots.map((slot, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.slotCard}
                                activeOpacity={0.85}
                                onPress={() => navigateToTurf(mockTurfs[i]?.id || 't1')}
                            >
                                <Text style={styles.slotTime}>{slot.time}</Text>
                                <Text style={styles.slotTurf} numberOfLines={1}>{slot.turfName}</Text>
                                <View style={styles.slotBottom}>
                                    <Text style={styles.slotPrice}>{slot.price}</Text>
                                    <View style={styles.addBtn}>
                                        <Plus size={14} color={Colors.backgroundDark} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Turfs */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Popular Turfs</Text>
                            <Text style={styles.sectionSub}>Top rated venues in your city</Text>
                        </View>
                        <TouchableOpacity onPress={navigateToSearch}>
                            <Text style={styles.viewAll}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
                    >
                        {popularTurfs.map((turf) => (
                            <TurfCard
                                key={turf.id}
                                turf={turf}
                                onPress={() => navigateToTurf(turf.id)}
                                isFavorite={favorites.includes(turf.id)}
                                onToggleFavorite={() => toggleFavorite(turf.id)}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Nearby Turfs */}
                <View style={[styles.section, { paddingHorizontal: 16 }]}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Nearby Turfs</Text>
                            <Text style={styles.sectionSub}>Walking distance from you</Text>
                        </View>
                    </View>
                    {nearbyTurfs.map((turf) => (
                        <TurfCard
                            key={turf.id}
                            turf={turf}
                            onPress={() => navigateToTurf(turf.id)}
                            isFavorite={favorites.includes(turf.id)}
                            onToggleFavorite={() => toggleFavorite(turf.id)}
                            variant="list"
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerLogo: {
        width: 28,
        height: 28,
        borderRadius: 6,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1,
        justifyContent: 'flex-end',
    },
    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        maxWidth: 140,
    },
    locationText: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: '600',
        flex: 1,
    },
    bellBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Colors.surface1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    bellDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        position: 'absolute',
        top: 8,
        right: 8,
        borderWidth: 1.5,
        borderColor: Colors.backgroundDark,
    },
    // Search
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.surface1,
        borderRadius: 14,
        marginHorizontal: 16,
        marginBottom: 8,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    searchPlaceholder: {
        color: '#475569',
        fontSize: 14,
        flex: 1,
    },
    // Categories
    categoriesContainer: {
        marginTop: 8,
    },
    categoriesScroll: {
        paddingHorizontal: 12,
        paddingBottom: 8,
        gap: 8,
    },
    categoryItem: {
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 4,
        width: 70,
    },
    categoryCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: Colors.surface1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    categoryCircleActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    categoryEmoji: {
        fontSize: 22,
    },
    categoryName: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        color: '#475569',
        textAlign: 'center',
    },
    categoryNameActive: {
        color: Colors.primary,
    },
    // Sections
    section: {
        marginTop: 28,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        marginBottom: 14,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    sectionSub: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 2,
    },
    viewAll: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    // Tonight slots
    slotScroll: {
        paddingHorizontal: 16,
        gap: 12,
    },
    slotCard: {
        width: 150,
        backgroundColor: Colors.surface1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        padding: 14,
    },
    slotTime: {
        color: Colors.primary,
        fontSize: 17,
        fontWeight: '700',
    },
    slotTurf: {
        color: Colors.textSecondary,
        fontSize: 11,
        marginTop: 4,
    },
    slotBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    slotPrice: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
    },
    addBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
