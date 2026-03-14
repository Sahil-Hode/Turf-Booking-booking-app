import { AppColors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [isSignUp, setIsSignUp] = React.useState(false);

    const handleGoogleSignIn = () => {
        router.replace('/(customer)' as any);
    };

    const handleEmailSignIn = () => {
        router.push('/(auth)/otp-verification');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoIcon}>
                                <Ionicons name="football" size={28} color={AppColors.white} />
                            </View>
                        </View>
                        <Text style={styles.appName}>BookMyTurf</Text>
                        <Text style={styles.tagline}>Your Game, Your Slot, Your Rules</Text>
                    </View>

                    {/* Card */}
                    <View style={styles.card}>
                        <Text style={styles.welcomeTitle}>
                            {isSignUp ? 'Create Account' : 'Welcome Back! 👋'}
                        </Text>
                        <Text style={styles.welcomeSubtitle}>
                            {isSignUp
                                ? 'Sign up to start booking turfs near you'
                                : 'Sign in to continue booking amazing turfs'}
                        </Text>

                        {/* Google Sign In */}
                        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn} activeOpacity={0.85}>
                            <Text style={styles.googleIcon}>G</Text>
                            <Text style={styles.googleText}>Continue with Google</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={18} color={AppColors.textMuted} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor={AppColors.textMuted}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity style={styles.signInBtn} onPress={handleEmailSignIn} activeOpacity={0.88}>
                            <Text style={styles.signInText}>
                                {isSignUp ? 'Create Account' : 'Send OTP'}
                            </Text>
                        </TouchableOpacity>

                        {/* Toggle */}
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleLabel}>
                                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            </Text>
                            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                                <Text style={styles.toggleAction}>
                                    {isSignUp ? 'Sign In' : 'Sign Up'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Terms */}
                    <Text style={styles.terms}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>
                        {' '}and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    flex: {
        flex: 1,
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing['3xl'],
        paddingBottom: Spacing.xl,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing['2xl'],
    },
    logoContainer: {
        marginBottom: Spacing.md,
    },
    logoIcon: {
        width: 72,
        height: 72,
        borderRadius: 20,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    appName: {
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.extrabold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    tagline: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
        textAlign: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: AppColors.white,
        borderRadius: BorderRadius['2xl'],
        padding: Spacing.xl,
        ...Shadows.lg,
        marginBottom: Spacing.xl,
    },
    welcomeTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    welcomeSubtitle: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textSecondary,
        marginBottom: Spacing.xl,
        lineHeight: 20,
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: AppColors.border,
        borderRadius: BorderRadius.xl,
        paddingVertical: 13,
        paddingHorizontal: Spacing.lg,
        gap: Spacing.sm,
        backgroundColor: AppColors.white,
        ...Shadows.sm,
    },
    googleIcon: {
        fontSize: 18,
        fontWeight: Typography.fontWeight.bold,
        color: '#4285F4',
    },
    googleText: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginVertical: Spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: AppColors.border,
    },
    dividerText: {
        color: AppColors.textMuted,
        fontSize: Typography.fontSize.sm,
    },
    inputGroup: {
        marginBottom: Spacing.lg,
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: AppColors.textPrimary,
        marginBottom: Spacing.xs,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: AppColors.border,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.base,
        paddingVertical: 12,
        backgroundColor: AppColors.background,
    },
    inputIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: Typography.fontSize.base,
        color: AppColors.textPrimary,
        padding: 0,
    },
    signInBtn: {
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: Spacing.xs,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    signInText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.bold,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.lg,
    },
    toggleLabel: {
        color: AppColors.textMuted,
        fontSize: Typography.fontSize.sm,
    },
    toggleAction: {
        color: AppColors.primary,
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
    },
    terms: {
        fontSize: Typography.fontSize.xs,
        color: AppColors.textMuted,
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.medium,
    },
});
