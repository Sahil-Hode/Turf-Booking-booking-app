import { Heart, MapPin, Star } from 'lucide-react-native';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../src/theme/colors';
import { Turf } from '../../src/types';

interface TurfCardProps {
    turf: Turf;
    onPress: () => void;
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
    variant?: 'horizontal' | 'vertical' | 'list';
}

export const TurfCard: React.FC<TurfCardProps> = ({
    turf,
    onPress,
    isFavorite = false,
    onToggleFavorite,
    variant = 'vertical',
}) => {
    if (variant === 'list') {
        return (
            <TouchableOpacity style={styles.listCard} onPress={onPress} activeOpacity={0.85}>
                <Image
                    source={{ uri: turf.images[0] }}
                    style={styles.listImage}
                    resizeMode="cover"
                />
                <View style={styles.listContent}>
                    <Text style={styles.listName} numberOfLines={1}>{turf.name}</Text>
                    <Text style={styles.listSports} numberOfLines={1}>
                        {turf.sports.join(' • ')}
                    </Text>
                    <View style={styles.listBottom}>
                        <View style={[styles.statusBadge, turf.isOpen ? styles.openBadge : styles.closedBadge]}>
                            <Text style={[styles.statusText, turf.isOpen ? styles.openText : styles.closedText]}>
                                {turf.isOpen ? 'Open Now' : `Closes ${turf.closingTime}`}
                            </Text>
                        </View>
                        <Text style={styles.listPrice}>₹{turf.pricePerHour}/hr</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: turf.images[0] }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.ratingBadge}>
                    <Star size={11} color={Colors.amber} fill={Colors.amber} />
                    <Text style={styles.ratingText}>{turf.rating}</Text>
                </View>
                {onToggleFavorite && (
                    <TouchableOpacity style={styles.favoriteBtn} onPress={onToggleFavorite}>
                        <Heart
                            size={16}
                            color={isFavorite ? '#ef4444' : Colors.textPrimary}
                            fill={isFavorite ? '#ef4444' : 'transparent'}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={styles.name} numberOfLines={1}>{turf.name}</Text>
            <View style={styles.locationRow}>
                <MapPin size={12} color={Colors.textSecondary} />
                <Text style={styles.location} numberOfLines={1}>
                    {turf.distance} away • {turf.city}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 220,
        marginRight: 16,
    },
    imageContainer: {
        position: 'relative',
        height: 150,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: 'rgba(0,0,0,0.65)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        color: Colors.textPrimary,
        fontSize: 11,
        fontWeight: '700',
    },
    favoriteBtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        color: Colors.textPrimary,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        color: Colors.textSecondary,
        fontSize: 12,
        flex: 1,
    },
    // List variant
    listCard: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: Colors.surface1,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        marginBottom: 12,
    },
    listImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },
    listContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    listName: {
        color: Colors.textPrimary,
        fontSize: 15,
        fontWeight: '700',
    },
    listSports: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    listBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    openBadge: {
        backgroundColor: Colors.primaryMuted,
    },
    closedBadge: {
        backgroundColor: 'rgba(100,116,139,0.15)',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
    },
    openText: {
        color: Colors.primary,
    },
    closedText: {
        color: Colors.textSecondary,
    },
    listPrice: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
    },
});
