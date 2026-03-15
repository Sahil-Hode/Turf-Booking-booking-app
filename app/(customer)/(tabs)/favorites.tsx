import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TurfCard } from '../../../components/cards/TurfCard';
import { useAppStore } from '../../../src/store/useAppStore';
import { Colors } from '../../../src/theme/colors';

export default function FavoritesScreen() {
    const router = useRouter();
    const { favorites, toggleFavorite, turfs } = useAppStore();

    const favoriteTurfs = turfs.filter((t) => favorites.includes(t.id));

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Favorites</Text>
                <Text style={styles.headerSub}>{favoriteTurfs.length} saved</Text>
            </View>

            <FlatList
                data={favoriteTurfs}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TurfCard
                        turf={item}
                        variant="list"
                        onPress={() => router.push(`/(customer)/turf-details/${item.id}`)}
                        isFavorite={true}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Heart size={56} color={Colors.primaryMuted} strokeWidth={1.5} />
                        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
                        <Text style={styles.emptyText}>
                            Tap the heart icon on any turf to save it here
                        </Text>
                        <TouchableOpacity
                            style={styles.exploreBtn}
                            onPress={() => router.push('/(customer)/(tabs)/search')}
                        >
                            <Text style={styles.exploreBtnText}>Explore Turfs</Text>
                        </TouchableOpacity>
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
    listContent: {
        padding: 16,
        paddingBottom: 24,
    },
    empty: {
        alignItems: 'center',
        paddingTop: 80,
        gap: 12,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: '700',
        marginTop: 8,
    },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
    },
    exploreBtn: {
        marginTop: 16,
        backgroundColor: Colors.primary,
        paddingHorizontal: 28,
        paddingVertical: 13,
        borderRadius: 999,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    exploreBtnText: {
        color: Colors.backgroundDark,
        fontSize: 15,
        fontWeight: '700',
    },
});
