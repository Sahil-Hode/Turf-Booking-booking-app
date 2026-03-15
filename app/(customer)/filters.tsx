import { useRouter } from 'expo-router';
import { Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../src/theme/colors';

const SPORTS = ['All', 'Football', 'Cricket', 'Tennis', 'Basketball', 'Badminton'];
const DISTANCE = ['Any', '< 5 km', '5 - 10 km', '10 - 20 km', '> 20 km'];
const AMENITIES = ['Parking', 'Washroom', 'Drinking Water', 'Floodlights', 'Cafe'];

export default function FiltersScreen() {
    const router = useRouter();

    const [selectedSport, setSelectedSport] = useState('All');
    const [selectedDistance, setSelectedDistance] = useState('Any');
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const toggleAmenity = (amenity: string) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const resetFilters = () => {
        setSelectedSport('All');
        setSelectedDistance('Any');
        setSelectedAmenities([]);
    };

    const applyFilters = () => {
        // In a real app, this would update global filter state before navigating back
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
                        <X size={20} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Filters</Text>
                </View>
                <TouchableOpacity onPress={resetFilters}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Sports */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sports</Text>
                    <View style={styles.chipsContainer}>
                        {SPORTS.map(sport => (
                            <TouchableOpacity
                                key={sport}
                                style={[styles.chip, selectedSport === sport && styles.chipActive]}
                                onPress={() => setSelectedSport(sport)}
                            >
                                <Text style={[styles.chipText, selectedSport === sport && styles.chipTextActive]}>
                                    {sport}
                                </Text>
                                {selectedSport === sport && (
                                    <Check size={14} color={Colors.backgroundDark} style={{ marginLeft: 4 }} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Distance */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Distance</Text>
                    <View style={styles.chipsContainer}>
                        {DISTANCE.map(dist => (
                            <TouchableOpacity
                                key={dist}
                                style={[styles.chip, selectedDistance === dist && styles.chipActive]}
                                onPress={() => setSelectedDistance(dist)}
                            >
                                <Text style={[styles.chipText, selectedDistance === dist && styles.chipTextActive]}>
                                    {dist}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Amenities */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Amenities</Text>
                    <View style={styles.optionsContainer}>
                        {AMENITIES.map(amenity => {
                            const isSelected = selectedAmenities.includes(amenity);
                            return (
                                <TouchableOpacity
                                    key={amenity}
                                    style={styles.optionRow}
                                    onPress={() => toggleAmenity(amenity)}
                                >
                                    <Text style={styles.optionText}>{amenity}</Text>
                                    <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
                                        {isSelected && <Check size={14} color={Colors.backgroundDark} />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                    <Text style={styles.applyBtnText}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
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
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderDark,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.surface1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 20,
        fontWeight: '800',
    },
    resetText: {
        color: '#ef4444',
        fontSize: 14,
        fontWeight: '600',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface1,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    chipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    chipText: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '500',
    },
    chipTextActive: {
        color: Colors.backgroundDark,
        fontWeight: '700',
    },
    optionsContainer: {
        backgroundColor: Colors.surface1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        overflow: 'hidden',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderDark,
    },
    optionText: {
        color: Colors.textPrimary,
        fontSize: 15,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Colors.borderMedium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.borderDark,
        backgroundColor: 'rgba(17,33,27,0.95)',
    },
    applyBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    applyBtnText: {
        color: Colors.backgroundDark,
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
