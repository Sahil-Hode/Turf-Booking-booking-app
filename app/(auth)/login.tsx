import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowRight, Phone } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../src/theme/colors';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState('');

    const handleSendOTP = () => {
        if (phone.length >= 10) {
            router.push('/(auth)/otp-verification');
        }
    };

    return (
        <View style={styles.container}>
            {/* Background */}
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800' }}
                style={styles.bgImage}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['#000000CC', '#000000F2', '#000000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>
                        {/* Logo */}
                        <View style={styles.logoSection}>
                            <View style={styles.logoCircle}>
                                <Image
                                    source={require('../../assets/images/logo.png')}
                                    style={styles.logoImg}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.welcomeTitle}>ENTER YOUR PHONE NUMBER</Text>
                            <Text style={styles.welcomeSub}>We'll send you a secure OTP to sign in or create an account.</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.countryCode}>+91</Text>
                                <View style={styles.divider} />
                                <Phone size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="000 000 0000"
                                    placeholderTextColor={Colors.borderLight}
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    selectionColor={Colors.highlight}
                                />
                            </View>

                            {/* Sign In Button */}
                            <TouchableOpacity
                                style={[styles.signInBtn, phone.length < 10 && styles.signInBtnDisabled]}
                                onPress={handleSendOTP}
                                activeOpacity={0.85}
                                disabled={phone.length < 10}
                            >
                                <Text style={styles.signInText}>CONTINUE</Text>
                                <ArrowRight size={20} color={Colors.backgroundDark} />
                            </TouchableOpacity>
                        </View>

                        {/* Footer */}
                        <View style={styles.bottomLinks}>
                            <Text style={styles.bottomText}>By continuing, you agree to TurfZy's</Text>
                            <View style={styles.linksRow}>
                                <Text style={styles.bottomLink}>Terms of Use</Text>
                                <Text style={styles.bottomDot}>•</Text>
                                <Text style={styles.bottomLink}>Privacy Policy</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundDark },
    flex: { flex: 1 },
    bgImage: {
        ...StyleSheet.absoluteFillObject,
        width,
        height,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    content: {
        paddingHorizontal: 24,
    },
    logoSection: {
        alignItems: 'flex-start',
        marginBottom: 40,
    },
    logoCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.surface3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    logoImg: {
        width: 36,
        height: 36,
    },
    welcomeTitle: {
        color: Colors.textPrimary,
        fontSize: 32,
        fontWeight: '900',
        fontFamily: 'Inter-Black',
        letterSpacing: -1,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    welcomeSub: {
        color: Colors.textSecondary,
        fontSize: 15,
        lineHeight: 22,
    },
    form: {
        gap: 24,
        marginBottom: 40,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface2,
        borderWidth: 1,
        borderColor: Colors.borderMedium,
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 60,
    },
    countryCode: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: Colors.borderLight,
        marginHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 1,
    },
    signInBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.textPrimary,
        paddingVertical: 18,
        borderRadius: 8,
        alignItems: 'center',
        gap: 8,
    },
    signInBtnDisabled: {
        backgroundColor: Colors.borderLight,
        opacity: 0.5,
    },
    signInText: {
        color: Colors.backgroundDark,
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
    },
    bottomLinks: {
        alignItems: 'center',
        gap: 6,
    },
    bottomText: {
        color: Colors.textMuted,
        fontSize: 13,
    },
    linksRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    bottomLink: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    bottomDot: {
        color: Colors.textMuted,
        fontSize: 12,
    },
});
