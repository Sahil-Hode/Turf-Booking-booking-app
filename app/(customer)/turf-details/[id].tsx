import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeft,
    Car,
    Droplets,
    Heart,
    HeartHandshake,
    Lightbulb,
    MapPin,
    Share2,
    Star,
    Utensils,
    Wifi
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
import { mockReviews, mockTurfs } from '../../../src/data/mockData';
import { useAppStore } from '../../../src/store/useAppStore';
import { Colors } from '../../../src/theme/colors';

const { width, height } = Dimensions.get('window');

const AMENITY_ICONS: Record<string, React.ReactNode> = {
    droplets: <Droplets size={22} color={Colors.primary} />,
    car: <Car size={22} color={Colors.primary} />,
    lightbulb: <Lightbulb size={22} color={Colors.primary} />,
    utensils: <Utensils size={22} color={Colors.primary} />,
    wifi: <Wifi size={22} color={Colors.primary} />,
    heart: <HeartHandshake size={22} color={Colors.primary} />,
};

export default function TurfDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { favorites, toggleFavorite } = useAppStore();

    const turf = mockTurfs.find((t) => t.id === id) || mockTurfs[0];
    const isFavorite = favorites.includes(turf.id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleBookNow = () => {
        router.push(`/(customer)/booking/slot-selection/${turf.id}`);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{ uri: turf.images[currentImageIndex] }}
                        style={styles.heroImage}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', Colors.backgroundDark + 'DD', Colors.backgroundDark]}
                        style={styles.heroGradient}
                        start={{ x: 0, y: 0.3 }}
                        end={{ x: 0, y: 1 }}
                    />

                    {/* Top bar */}
                    <SafeAreaView style={styles.topBar} edges={['top']}>
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => router.back()}
                        >
                            <ArrowLeft size={20} color={Colors.textPrimary} />
                        </TouchableOpacity>
                        <View style={styles.topBtnRow}>
                            <TouchableOpacity style={styles.iconBtn}>
                                <Share2 size={20} color={Colors.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.iconBtn}
                                onPress={() => toggleFavorite(turf.id)}
                            >
                                <Heart
                                    size={20}
                                    color={isFavorite ? '#ef4444' : Colors.textPrimary}
                                    fill={isFavorite ? '#ef4444' : 'transparent'}
                                />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                    {/* Turf info overlay */}
                    <View style={styles.heroInfo}>
                        <View style={styles.featuredBadge}>
                            <Text style={styles.featuredText}>⚽ Featured</Text>
                        </View>
                        <Text style={styles.turfName}>{turf.name}</Text>
                        <View style={styles.locationRow}>
                            <MapPin size={14} color={Colors.primary} />
                            <Text style={styles.locationText}>{turf.location} • {turf.distance} away</Text>
                        </View>
                    </View>

                    {/* Gallery dots */}
                    {turf.images.length > 1 && (
                        <View style={styles.imageDots}>
                            {turf.images.map((_, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[styles.dot, i === currentImageIndex && styles.dotActive]}
                                    onPress={() => setCurrentImageIndex(i)}
                                />
                            ))}
                        </View>
                    )}
                </View>

                {/* Quick Stats */}
                <View style={styles.statsCard}>
                    <View style={styles.statsLeft}>
                        <View style={styles.statRating}>
                            <Text style={styles.ratingValue}>{turf.rating}</Text>
                            <Star size={16} color={Colors.primary} fill={Colors.primary} />
                        </View>
                        <Text style={styles.reviewCount}>{turf.reviewCount} Reviews</Text>
                    </View>
                    <View style={styles.statsDivider} />
                    <View style={styles.statsMiddle}>
                        <Text style={styles.statsOpenText}>
                            {turf.isOpen ? 'Open Now' : 'Closed'}
                        </Text>
                        <Text style={styles.statsCloseTime}>Closes {turf.closingTime}</Text>
                    </View>
                    <TouchableOpacity style={styles.viewRatesBtn}>
                        <Text style={styles.viewRatesText}>View Rates</Text>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* About */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About this turf</Text>
                        <Text style={styles.description}>{turf.description}</Text>
                    </View>

                    {/* Sports */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sports Available</Text>
                        <View style={styles.sportsRow}>
                            {turf.sports.map((sport) => (
                                <View key={sport} style={styles.sportChip}>
                                    <Text style={styles.sportChipText}>{sport}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Amenities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Amenities</Text>
                        <View style={styles.amenitiesGrid}>
                            {turf.amenities.map((a) => (
                                <View key={a.id} style={styles.amenityItem}>
                                    <View style={styles.amenityIcon}>
                                        {AMENITY_ICONS[a.icon] || <Droplets size={22} color={Colors.primary} />}
                                    </View>
                                    <Text style={styles.amenityName}>{a.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Location Map Placeholder */}
                    <View style={styles.section}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionTitle}>Location</Text>
                            <TouchableOpacity>
                                <Text style={styles.openMapsText}>Open in Maps</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mapPlaceholder}>
                            <LinearGradient
                                colors={[Colors.surface2, Colors.surface3]}
                                style={styles.mapGradient}
                            />
                            <View style={styles.mapPin}>
                                <MapPin size={28} color={Colors.primary} fill={Colors.primary + '40'} />
                            </View>
                            <Text style={styles.mapAddress}>{turf.location}</Text>
                        </View>
                    </View>

                    {/* Reviews */}
                    <View style={styles.section}>
                        <View style={styles.sectionRow}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <TouchableOpacity>
                                <Text style={styles.openMapsText}>Write Review</Text>
                            </TouchableOpacity>
                        </View>
                        {mockReviews.map((review) => (
                            <View key={review.id} style={styles.reviewCard}>
                                <View style={styles.reviewHeader}>
                                    <View style={styles.reviewAvatar}>
                                        <Text style={styles.reviewInitials}>{review.userInitials}</Text>
                                    </View>
                                    <Text style={styles.reviewUser}>{review.userName}</Text>
                                    <View style={styles.reviewStars}>
                                        {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={11} color={Colors.primary} fill={Colors.primary} />
                                        ))}
                                    </View>
                                </View>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomCTA}>
                <View style={styles.pricingInfo}>
                    <Text style={styles.pricingFrom}>Starting from</Text>
                    <Text style={styles.pricingAmount}>
                        ₹{turf.pricePerHour.toLocaleString()}
                        <Text style={styles.pricingUnit}>/hr</Text>
                    </Text>
                </View>
                <TouchableOpacity style={styles.bookBtn} onPress={handleBookNow} activeOpacity={0.85}>
                    <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
    },
    heroContainer: {
        height: height * 0.45,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    topBtnRow: {
        flexDirection: 'row',
        gap: 8,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(17,33,27,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    heroInfo: {
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
        gap: 8,
    },
    featuredBadge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    featuredText: {
        color: Colors.backgroundDark,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    turfName: {
        color: Colors.textPrimary,
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        color: '#cbd5e1',
        fontSize: 14,
    },
    imageDots: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        gap: 4,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    dotActive: {
        backgroundColor: Colors.primary,
        width: 20,
    },
    // Stats Card
    statsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(22,197,130,0.08)',
        margin: 16,
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    statsLeft: {
        flex: 1,
        alignItems: 'center',
    },
    statRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingValue: {
        color: Colors.primary,
        fontSize: 24,
        fontWeight: '900',
    },
    reviewCount: {
        color: Colors.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    statsDivider: {
        width: 1,
        height: 40,
        backgroundColor: Colors.borderMedium,
        marginHorizontal: 12,
    },
    statsMiddle: {
        flex: 1,
        alignItems: 'center',
    },
    statsOpenText: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
    },
    statsCloseTime: {
        color: Colors.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
    viewRatesBtn: {
        backgroundColor: Colors.primaryMuted,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    viewRatesText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    // Content
    content: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    section: {
        marginBottom: 28,
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
    description: {
        color: Colors.textSecondary,
        fontSize: 14,
        lineHeight: 22,
    },
    sportsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    sportChip: {
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
    },
    sportChipText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    amenityItem: {
        width: '22%',
        alignItems: 'center',
        gap: 8,
        backgroundColor: Colors.surface2,
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.borderDark,
    },
    amenityIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amenityName: {
        color: '#cbd5e1',
        fontSize: 10,
        fontWeight: '500',
        textAlign: 'center',
    },
    mapPlaceholder: {
        height: 160,
        borderRadius: 18,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.borderDark,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    mapGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    mapPin: {
        alignItems: 'center',
        gap: 4,
    },
    mapAddress: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 8,
        textAlign: 'center',
    },
    openMapsText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    // Reviews
    reviewCard: {
        backgroundColor: Colors.surface2,
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    reviewAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewInitials: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: '700',
    },
    reviewUser: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
    },
    reviewStars: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewComment: {
        color: Colors.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        fontStyle: 'italic',
    },
    reviewDate: {
        color: '#475569',
        fontSize: 11,
        marginTop: 8,
    },
    // Bottom CTA
    bottomCTA: {
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
    pricingInfo: {
        gap: 2,
    },
    pricingFrom: {
        color: Colors.textSecondary,
        fontSize: 11,
    },
    pricingAmount: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: '900',
    },
    pricingUnit: {
        fontSize: 12,
        color: Colors.textSecondary,
        fontWeight: '400',
    },
    bookBtn: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 999,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    bookBtnText: {
        color: Colors.backgroundDark,
        fontSize: 15,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
