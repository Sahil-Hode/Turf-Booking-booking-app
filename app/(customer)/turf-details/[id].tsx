import { AppColors } from '@/constants/colors';
import { MOCK_TURFS } from '@/constants/mockData';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.38;

const AMENITY_ICONS: Record<string, string> = {
    Parking: 'car-outline',
    Washroom: 'water-outline',
    Water: 'restaurant-outline',
    Locker: 'lock-closed-outline',
    Floodlights: 'flashlight-outline',
    WiFi: 'wifi-outline',
};

export default function TurfDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const turf = MOCK_TURFS.find(t => t.id === id) || MOCK_TURFS[0];
    const [isFavorite, setIsFavorite] = React.useState(turf.isFavorite);
    const [activeImageIdx, setActiveImageIdx] = React.useState(0);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Hero Image */}
                <View style={styles.heroContainer}>
                    <FlatList
                        data={turf.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, idx) => idx.toString()}
                        onMomentumScrollEnd={(e) => {
                            const idx = Math.round(e.nativeEvent.contentOffset.x / width);
                            setActiveImageIdx(idx);
                        }}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.heroImage} />
                        )}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent', 'rgba(0,0,0,0.3)']}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Nav Buttons */}
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
                        <Ionicons name="chevron-back" size={22} color={AppColors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.heartBtn}
                        onPress={() => setIsFavorite(!isFavorite)}
                        activeOpacity={0.8}
                    >
                        <Ionicons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={22}
                            color={isFavorite ? AppColors.error : AppColors.white}
                        />
                    </TouchableOpacity>

                    {/* Image Dots */}
                    {turf.images.length > 1 && (
                        <View style={styles.imageDots}>
                            {turf.images.map((_, idx) => (
                                <View
                                    key={idx}
                                    style={[styles.dot, idx === activeImageIdx && styles.dotActive]}
                                />
                            ))}
                        </View>
                    )}
                </View>

                {/* Content */}
                <View style={styles.content}>
                    {/* Title */}
                    <View style={styles.titleRow}>
                        <View style={styles.titleLeft}>
                            <Text style={styles.turfName}>{turf.name}</Text>
                            <View style={styles.locationRow}>
                                <Ionicons name="location-outline" size={14} color={AppColors.textMuted} />
                                <Text style={styles.location}>{turf.location}</Text>
                            </View>
                        </View>
                        <View style={styles.ratingBox}>
                            <Ionicons name="star" size={14} color={AppColors.star} />
                            <Text style={styles.rating}>{turf.rating}</Text>
                            <Text style={styles.reviews}>({turf.reviewCount})</Text>
                        </View>
                    </View>

                    {/* Availability & Hours */}
                    <View style={styles.infoChips}>
                        {turf.isAvailableNow && (
                            <View style={styles.availableChip}>
                                <View style={styles.greenDot} />
                                <Text style={styles.availableText}>Available Now</Text>
                            </View>
                        )}
                        <View style={styles.hoursChip}>
                            <Ionicons name="time-outline" size={13} color={AppColors.textSecondary} />
                            <Text style={styles.hoursText}>{turf.openTime} - {turf.closeTime}</Text>
                        </View>
                    </View>

                    {/* About */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About</Text>
                        <Text style={styles.aboutText}>{turf.about}</Text>
                    </View>

                    {/* Amenities */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Amenities</Text>
                        <View style={styles.amenitiesGrid}>
                            {turf.amenities.map((amenity) => (
                                <View key={amenity} style={styles.amenityItem}>
                                    <View style={styles.amenityIconBg}>
                                        <Ionicons
                                            name={(AMENITY_ICONS[amenity] || 'checkmark-circle-outline') as any}
                                            size={22}
                                            color={AppColors.primary}
                                        />
                                    </View>
                                    <Text style={styles.amenityLabel}>{amenity}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location</Text>
                        <View style={styles.mapPlaceholder}>
                            <View style={styles.mapBg} />
                            <View style={styles.mapOverlay}>
                                <View style={styles.mapPin}>
                                    <Ionicons name="location" size={24} color={AppColors.white} />
                                </View>
                                <Text style={styles.mapAddress}>{turf.address}</Text>
                            </View>
                            <TouchableOpacity style={styles.directionsBtn} activeOpacity={0.8}>
                                <Ionicons name="navigate-outline" size={16} color={AppColors.white} />
                                <Text style={styles.directionsBtnText}>Get Directions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Price Info */}
                    <View style={styles.priceCard}>
                        <View>
                            <Text style={styles.priceLabel}>Starting from</Text>
                            <Text style={styles.priceValue}>
                                ₹{turf.price}
                                <Text style={styles.priceUnit}> / {turf.priceUnit}</Text>
                            </Text>
                        </View>
                        <Text style={styles.priceNote}>Taxes & charges included</Text>
                    </View>

                    {/* Bottom spacer for footer */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Floating Footer */}
            <View style={styles.footer}>
                <View style={styles.footerLeft}>
                    <Text style={styles.footerPriceLabel}>Per Hour</Text>
                    <Text style={styles.footerPrice}>₹{turf.price}</Text>
                </View>
                <TouchableOpacity
                    style={styles.bookNowBtn}
                    onPress={() => router.push(`/(customer)/booking/slot-selection/${turf.id}`)}
                    activeOpacity={0.88}
                >
                    <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    scrollContent: {
        paddingBottom: 0,
    },
    heroContainer: {
        height: HERO_HEIGHT,
        position: 'relative',
    },
    heroImage: {
        width,
        height: HERO_HEIGHT,
        resizeMode: 'cover',
    },
    backBtn: {
        position: 'absolute',
        top: 50,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heartBtn: {
        position: 'absolute',
        top: 50,
        right: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageDots: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    dotActive: {
        width: 20,
        backgroundColor: AppColors.white,
    },
    content: {
        backgroundColor: AppColors.background,
        borderTopLeftRadius: BorderRadius['2xl'],
        borderTopRightRadius: BorderRadius['2xl'],
        marginTop: -20,
        padding: Spacing.lg,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    titleLeft: {
        flex: 1,
        gap: 4,
    },
    turfName: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    },
    location: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: AppColors.white,
        paddingHorizontal: Spacing.sm,
        paddingVertical: 5,
        borderRadius: BorderRadius.md,
        ...Shadows.sm,
    },
    rating: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    reviews: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
    },
    infoChips: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    availableChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: AppColors.primaryLight,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: 5,
    },
    greenDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: AppColors.primary,
    },
    availableText: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.semibold,
    },
    hoursChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: AppColors.white,
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.md,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: AppColors.border,
    },
    hoursText: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textSecondary,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.md,
    },
    aboutText: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
        lineHeight: 22,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.md,
    },
    amenityItem: {
        alignItems: 'center',
        gap: 5,
        width: 70,
    },
    amenityIconBg: {
        width: 52,
        height: 52,
        borderRadius: BorderRadius.xl,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    amenityLabel: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textSecondary,
        textAlign: 'center',
        fontWeight: Typography.fontWeight.medium,
    },
    mapPlaceholder: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        height: 160,
        position: 'relative',
        backgroundColor: '#E8F5E9',
    },
    mapBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#C8E6C9',
    },
    mapOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        backgroundColor: 'rgba(34,197,94,0.08)',
    },
    mapPin: {
        width: 44,
        height: 44,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    mapAddress: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: Spacing.xl,
    },
    directionsBtn: {
        position: 'absolute',
        bottom: Spacing.md,
        right: Spacing.md,
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: Spacing.md,
        paddingVertical: 7,
    },
    directionsBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.xs,
        fontWeight: Typography.fontWeight.semibold,
    },
    priceCard: {
        backgroundColor: AppColors.primaryLight,
        borderRadius: BorderRadius.xl,
        padding: Spacing.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: AppColors.primaryMuted,
    },
    priceLabel: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.primary,
        marginBottom: 2,
    },
    priceValue: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.primary,
    },
    priceUnit: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.regular,
        color: AppColors.primaryDark,
    },
    priceNote: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.primaryDark,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: AppColors.white,
        borderTopWidth: 1,
        borderTopColor: AppColors.border,
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 10,
        paddingBottom: 28,
    },
    footerLeft: {
        gap: 2,
    },
    footerPriceLabel: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
    },
    footerPrice: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    bookNowBtn: {
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 14,
        paddingHorizontal: Spacing['2xl'],
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 7,
    },
    bookNowText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
});
