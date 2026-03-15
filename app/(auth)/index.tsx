import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Colors } from '../../src/theme/colors';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Discover',
        titleAccent: 'Nearby',
        titleEnd: 'Turfs',
        subtitle: 'Explore and book the finest sports turfs in your city with just a few taps.',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    },
    {
        id: '2',
        title: 'Book',
        titleAccent: 'Instantly',
        titleEnd: '',
        subtitle: 'Choose your slot, confirm your booking, and get on the field in minutes.',
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800',
    },
    {
        id: '3',
        title: 'Play',
        titleAccent: 'Like a',
        titleEnd: 'Pro',
        subtitle: 'Premium turfs with world-class amenities for the ultimate sports experience.',
        image: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=800',
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const goNext = () => {
        if (currentIndex < slides.length - 1) {
            const nextIndex = currentIndex + 1;
            flatListRef.current?.scrollToIndex({ index: nextIndex });
            setCurrentIndex(nextIndex);
        } else {
            router.replace('/(auth)/login');
        }
    };

    const goBack = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            flatListRef.current?.scrollToIndex({ index: prevIndex });
            setCurrentIndex(prevIndex);
        }
    };

    const skip = () => {
        router.replace('/(auth)/login');
    };

    const renderSlide = ({ item }: { item: typeof slides[0] }) => (
        <View style={styles.slide}>
            {/* Hero Image */}
            <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
                <LinearGradient
                    colors={['transparent', Colors.backgroundDark + 'CC', Colors.backgroundDark]}
                    style={styles.imageGradient}
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>
                    {item.title} <Text style={styles.titleAccent}>{item.titleAccent}</Text>{' '}
                    {item.titleEnd}
                </Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.backgroundDark, '#0d1f18']}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Back & Skip */}
            <View style={styles.topBar}>
                {currentIndex > 0 ? (
                    <TouchableOpacity onPress={goBack} style={styles.backBtn}>
                        <ArrowLeft size={22} color={Colors.textPrimary} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.backBtn} />
                )}
                <Text style={styles.logoText}>TurfZy</Text>
                <TouchableOpacity onPress={skip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
            />

            {/* Dots & CTA */}
            <View style={styles.bottomSection}>
                {/* Dots */}
                <View style={styles.dots}>
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                i === currentIndex ? styles.dotActive : styles.dotInactive,
                            ]}
                        />
                    ))}
                </View>

                {/* CTA Button */}
                <TouchableOpacity style={styles.ctaButton} onPress={goNext} activeOpacity={0.85}>
                    <Text style={styles.ctaText}>
                        {currentIndex === slides.length - 1 ? "Let's Go!" : 'Next'}
                    </Text>
                    <ArrowRight size={20} color={Colors.backgroundDark} />
                </TouchableOpacity>

                {/* Already have account */}
                {currentIndex === slides.length - 1 && (
                    <TouchableOpacity onPress={skip} style={styles.loginLink}>
                        <Text style={styles.loginLinkText}>Already have an account? <Text style={styles.loginLinkAccent}>Sign In</Text></Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: '700',
    },
    skipText: {
        color: Colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    flatList: {
        flex: 1,
    },
    slide: {
        width,
        flex: 1,
    },
    imageWrapper: {
        height: height * 0.5,
        marginHorizontal: 16,
        borderRadius: 20,
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    imageGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        textTransform: 'uppercase',
        fontFamily: 'Inter-Black',
        color: Colors.textPrimary,
        textAlign: 'center',
        lineHeight: 48,
        letterSpacing: -1,
    },
    titleAccent: {
        color: Colors.highlight,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 26,
        maxWidth: 320,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 48,
        gap: 24,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    dotActive: {
        width: 32,
        backgroundColor: Colors.textPrimary,
    },
    dotInactive: {
        width: 6,
        backgroundColor: Colors.borderMedium,
    },
    ctaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.textPrimary,
        paddingVertical: 18,
        borderRadius: 8,
    },
    ctaText: {
        color: Colors.backgroundDark,
        fontSize: 16,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    loginLink: {
        alignItems: 'center',
    },
    loginLinkText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    loginLinkAccent: {
        color: Colors.primary,
        fontWeight: '600',
    },
});
