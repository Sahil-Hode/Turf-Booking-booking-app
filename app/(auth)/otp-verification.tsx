import { AppColors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const OTP_LENGTH = 6;

export default function OtpVerificationScreen() {
    const router = useRouter();
    const [otp, setOtp] = React.useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [verified, setVerified] = React.useState(false);
    const [timer, setTimer] = React.useState(30);
    const inputRefs = React.useRef<TextInput[]>([]);

    React.useEffect(() => {
        if (timer > 0 && !verified) {
            const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
            return () => clearTimeout(t);
        }
    }, [timer, verified]);

    const handleOtpChange = (val: string, idx: number) => {
        const newOtp = [...otp];
        newOtp[idx] = val;
        setOtp(newOtp);
        if (val && idx < OTP_LENGTH - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    const handleKeyPress = (key: string, idx: number) => {
        if (key === 'Backspace' && !otp[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
            const newOtp = [...otp];
            newOtp[idx - 1] = '';
            setOtp(newOtp);
        }
    };

    const handleVerify = () => {
        setVerified(true);
    };

    const handleContinue = () => {
        router.push('/(auth)/profile-creation');
    };

    if (verified) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.successContainer}>
                    <View style={styles.checkCircle}>
                        <Ionicons name="checkmark" size={40} color={AppColors.white} />
                    </View>
                    <Text style={styles.successTitle}>Verification Successful!</Text>
                    <Text style={styles.successSubtitle}>
                        Your phone number has been verified. Let's set up your profile.
                    </Text>
                    <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.88}>
                        <Text style={styles.continueBtnText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.container}>
                    {/* Header */}
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color={AppColors.textPrimary} />
                    </TouchableOpacity>

                    <View style={styles.iconCircle}>
                        <Ionicons name="phone-portrait-outline" size={28} color={AppColors.primary} />
                    </View>

                    <Text style={styles.title}>OTP Verification</Text>
                    <Text style={styles.subtitle}>
                        We've sent a 6-digit code to your email. Enter it below to verify.
                    </Text>

                    {/* OTP Inputs */}
                    <View style={styles.otpRow}>
                        {otp.map((digit, idx) => (
                            <TextInput
                                key={idx}
                                ref={(ref) => {
                                    if (ref) inputRefs.current[idx] = ref;
                                }}
                                style={[styles.otpInput, digit && styles.otpInputFilled]}
                                value={digit}
                                onChangeText={(val) => handleOtpChange(val.replace(/[^0-9]/g, '').slice(-1), idx)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, idx)}
                                keyboardType="number-pad"
                                maxLength={1}
                                textAlign="center"
                            />
                        ))}
                    </View>

                    {/* Timer & Resend */}
                    <View style={styles.resendRow}>
                        {timer > 0 ? (
                            <Text style={styles.timerText}>
                                Resend OTP in <Text style={styles.timerCount}>00:{timer.toString().padStart(2, '0')}</Text>
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={() => setTimer(30)}>
                                <Text style={styles.resendText}>Resend OTP</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Verify Button */}
                    <TouchableOpacity
                        style={[styles.verifyBtn, otp.join('').length !== OTP_LENGTH && styles.verifyBtnDisabled]}
                        onPress={handleVerify}
                        disabled={otp.join('').length !== OTP_LENGTH}
                        activeOpacity={0.88}
                    >
                        <Text style={styles.verifyBtnText}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    flex: { flex: 1 },
    container: {
        flex: 1,
        padding: Spacing.xl,
        alignItems: 'center',
    },
    backBtn: {
        alignSelf: 'flex-start',
        padding: Spacing.xs,
        marginBottom: Spacing.xl,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: Typography.fontSize.base,
        color: AppColors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Spacing['2xl'],
        maxWidth: 280,
    },
    otpRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.xl,
    },
    otpInput: {
        width: 48,
        height: 56,
        borderRadius: BorderRadius.lg,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        backgroundColor: AppColors.white,
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        textAlign: 'center',
        ...Shadows.sm,
    },
    otpInputFilled: {
        borderColor: AppColors.primary,
        backgroundColor: AppColors.primaryLight,
    },
    resendRow: {
        marginBottom: Spacing['2xl'],
    },
    timerText: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
    },
    timerCount: {
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.semibold,
    },
    resendText: {
        color: AppColors.primary,
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
    },
    verifyBtn: {
        width: '100%',
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    verifyBtnDisabled: {
        opacity: 0.5,
        shadowOpacity: 0,
        elevation: 0,
    },
    verifyBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
    // Success state
    successContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.xl,
    },
    checkCircle: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
    },
    successTitle: {
        fontSize: Typography.fontSize['2xl'],
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: Typography.fontSize.base,
        color: AppColors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Spacing['3xl'],
        maxWidth: 280,
    },
    continueBtn: {
        width: '100%',
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    continueBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
});
