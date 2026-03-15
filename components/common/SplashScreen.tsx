import { LinearGradient } from 'expo-linear-gradient';
import { ShieldCheck } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../../src/theme/colors';

const { width, height } = Dimensions.get('window');

export default function CustomSplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const textFade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 6,
                    tension: 80,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(textFade, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(progressAnim, {
                toValue: 0.7,
                duration: 1800,
                useNativeDriver: false,
            }),
        ]).start();
    }, []);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            {/* Background gradient */}
            <LinearGradient
                colors={[Colors.backgroundDark, '#0d1f18', '#162d23']}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Stadium texture dots */}
            <View style={styles.textureOverlay} pointerEvents="none" />

            {/* Glow */}
            <View style={styles.glowCircle} />

            {/* Top bar */}
            <View style={styles.topBar}>
                <View style={styles.langButton}>
                    <Text style={styles.langIcon}>🌐</Text>
                </View>
            </View>

            {/* Main content */}
            <View style={styles.centerContent}>
                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    <View style={styles.logoGlow} />
                    <View style={styles.logoBox}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                </Animated.View>

                {/* Branding */}
                <Animated.View style={[styles.branding, { opacity: textFade }]}>
                    <Text style={styles.brandName}>
                        Turf<Text style={styles.brandAccent}>Zy</Text>
                    </Text>
                    <Text style={styles.brandTagline}>Your Stadium, One Tap Away</Text>
                    <Text style={styles.brandSub}>Premium sports-tech experience</Text>
                </Animated.View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                {/* Progress */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressRow}>
                        <Text style={styles.progressLabel}>🔧 Initializing stadium...</Text>
                        <Text style={styles.progressPercent}>70%</Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                    </View>
                </View>

                {/* Secure */}
                <View style={styles.secureRow}>
                    <ShieldCheck size={13} color={Colors.textSecondary} />
                    <Text style={styles.secureText}>Secure Booking Environment</Text>
                </View>

                {/* Bottom line */}
                <LinearGradient
                    colors={['transparent', Colors.primary + '60', 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bottomBar}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
        justifyContent: 'space-between',
    },
    textureOverlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.04,
    },
    glowCircle: {
        position: 'absolute',
        width: width * 1.2,
        height: width * 1.2,
        borderRadius: width * 0.6,
        backgroundColor: Colors.primaryMuted,
        top: '20%',
        left: '-10%',
        opacity: 0.15,
    },
    topBar: {
        padding: 24,
        alignItems: 'flex-end',
    },
    langButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        alignItems: 'center',
        justifyContent: 'center',
    },
    langIcon: {
        fontSize: 18,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoGlow: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.primary,
        opacity: 0.08,
        transform: [{ scale: 1.5 }],
    },
    logoBox: {
        width: 140,
        height: 140,
        borderRadius: 28,
        backgroundColor: 'rgba(17,33,27,0.7)',
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 12,
    },
    logoImage: {
        width: 120,
        height: 120,
    },
    branding: {
        alignItems: 'center',
        gap: 8,
    },
    brandName: {
        fontSize: 48,
        fontWeight: '800',
        color: Colors.textPrimary,
        letterSpacing: -1,
    },
    brandAccent: {
        color: Colors.primary,
    },
    brandTagline: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
        letterSpacing: -0.3,
        textAlign: 'center',
    },
    brandSub: {
        fontSize: 14,
        color: Colors.textMuted,
        fontWeight: '500',
    },
    footer: {
        paddingHorizontal: 32,
        paddingBottom: 48,
        gap: 16,
    },
    progressContainer: {
        gap: 8,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressLabel: {
        color: '#94a3b8',
        fontSize: 13,
        fontWeight: '500',
    },
    progressPercent: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    progressTrack: {
        height: 6,
        backgroundColor: Colors.primaryMuted,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 3,
    },
    secureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    secureText: {
        color: Colors.textSecondary,
        fontSize: 12,
    },
    bottomBar: {
        height: 2,
        borderRadius: 1,
    },
});
