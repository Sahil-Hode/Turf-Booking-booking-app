import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ONBOARDING_SLIDES = [
    {
        id: 1,
        title: 'Find Nearby\nTurfs',
        subtitle: 'Discover the best sports turfs near you with real-time availability.',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
        icon: 'location',
    },
    {
        id: 2,
        title: 'Play With\nYour Squad',
        subtitle: 'Gather your friends and book a turf for the perfect game session.',
        image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
        icon: 'people',
    },
    {
        id: 3,
        title: 'Book Your\nSlot Instantly',
        subtitle: 'Quick and easy slot booking at your fingertips. Pay securely and play!',
        image: 'https://images.unsplash.com/photo-1546519638405-a2b5e4f3a2b1?w=800&q=80',
        icon: 'calendar',
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const slide = ONBOARDING_SLIDES[currentSlide];

    const handleNext = () => {
        if (currentSlide < ONBOARDING_SLIDES.length - 1) {
            setCurrentSlide(prev => prev + 1);
        } else {
            router.replace('/(auth)/login');
        }
    };

    const handleSkip = () => {
        router.replace('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: slide.image }} style={styles.bgImage} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.92)']}
                style={styles.gradient}
            />

            <SafeAreaView style={styles.safeArea}>
                {/* Skip Button */}
                <TouchableOpacity style={styles.skipBtn} onPress={handleSkip} activeOpacity={0.8}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                {/* Content */}
                <View style={styles.content}>
                    {/* App Logo */}
                    <View style={styles.logoRow}>
                        <View style={styles.logoIcon}>
                            <Ionicons name="football" size={22} color={AppColors.white} />
                        </View>
                        <Text style={styles.logoText}>BookMyTurf</Text>
                    </View>

                    {/* Text */}
                    <Text style={styles.title}>{slide.title}</Text>
                    <Text style={styles.subtitle}>{slide.subtitle}</Text>

                    {/* Dots */}
                    <View style={styles.dots}>
                        {ONBOARDING_SLIDES.map((_, idx) => (
                            <View
                                key={idx}
                                style={[styles.dot, idx === currentSlide && styles.dotActive]}
                            />
                        ))}
                    </View>

                    {/* Button */}
                    <TouchableOpacity style={styles.btn} onPress={handleNext} activeOpacity={0.88}>
                        <Text style={styles.btnText}>
                            {currentSlide === ONBOARDING_SLIDES.length - 1 ? 'Get Started' : 'Continue'}
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color={AppColors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    bgImage: {
        position: 'absolute',
        width,
        height,
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height * 0.65,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing['2xl'],
        paddingTop: Spacing.base,
    },
    skipBtn: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: BorderRadius.full,
        paddingHorizontal: Spacing.base,
        paddingVertical: Spacing.xs,
    },
    skipText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
    },
    content: {
        gap: Spacing.base,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.xs,
    },
    logoIcon: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.md,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.white,
    },
    title: {
        fontSize: 36,
        fontWeight: Typography.fontWeight.extrabold,
        color: AppColors.white,
        lineHeight: 44,
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 24,
        maxWidth: '85%',
    },
    dots: {
        flexDirection: 'row',
        gap: 6,
        marginTop: Spacing.xs,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    dotActive: {
        width: 24,
        backgroundColor: AppColors.primary,
    },
    btn: {
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 16,
        paddingHorizontal: Spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        marginTop: Spacing.sm,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    btnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
});
