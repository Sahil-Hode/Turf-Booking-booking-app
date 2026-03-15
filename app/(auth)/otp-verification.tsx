import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/useAppStore';
import { Colors } from '../../src/theme/colors';

export default function OTPVerificationScreen() {
    const router = useRouter();
    const setLoggedIn = useAppStore((s) => s.setLoggedIn);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        // Mock OTP: accept any 6-digit code
        const code = otp.join('');
        if (code.length === 6) {
            setLoggedIn(true);
            router.replace('/(customer)' as any);
        }
    };

    const isComplete = otp.every((d) => d !== '');

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.backgroundDark, '#0d1f18']}
                style={StyleSheet.absoluteFillObject}
            />
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                            <ArrowLeft size={22} color={Colors.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        {/* Icon */}
                        <View style={styles.iconContainer}>
                            <Text style={styles.iconEmoji}>📱</Text>
                        </View>

                        <Text style={styles.title}>Verify your number</Text>
                        <Text style={styles.subtitle}>
                            We sent a 6-digit OTP to your phone number.{'\n'}
                            Enter any 6 digits to continue (demo mode).
                        </Text>

                        {/* OTP Inputs */}
                        <View style={styles.otpRow}>
                            {otp.map((digit, i) => (
                                <TextInput
                                    key={i}
                                    ref={(r) => { inputs.current[i] = r; }}
                                    style={[styles.otpInput, digit && styles.otpInputFilled]}
                                    value={digit}
                                    onChangeText={(t) => handleChange(t.slice(-1), i)}
                                    onKeyPress={(e) => handleKeyPress(e, i)}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    selectionColor={Colors.primary}
                                    caretHidden
                                />
                            ))}
                        </View>

                        {/* Resend */}
                        <View style={styles.resendRow}>
                            <Text style={styles.resendText}>Didn't receive OTP? </Text>
                            <TouchableOpacity>
                                <Text style={styles.resendLink}>Resend</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Verify Button */}
                        <TouchableOpacity
                            style={[styles.verifyBtn, !isComplete && styles.verifyBtnDisabled]}
                            onPress={handleVerify}
                            disabled={!isComplete}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.verifyBtnText}>
                                {isComplete ? 'Verify & Continue →' : 'Enter 6-digit OTP'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundDark },
    safeArea: { flex: 1 },
    flex: { flex: 1 },
    header: {
        padding: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 32,
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.surface3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    iconEmoji: { fontSize: 36 },
    title: {
        color: Colors.textPrimary,
        fontSize: 32,
        fontWeight: '900',
        fontFamily: 'Inter-Black',
        letterSpacing: -1,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    subtitle: {
        color: Colors.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        marginBottom: 40,
    },
    otpRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    otpInput: {
        width: 52,
        height: 64,
        borderRadius: 8,
        backgroundColor: Colors.surface2,
        borderWidth: 1.5,
        borderColor: Colors.borderMedium,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '900',
        color: Colors.textPrimary,
    },
    otpInputFilled: {
        borderColor: Colors.highlight,
        backgroundColor: Colors.surface3,
        color: Colors.highlight,
    },
    resendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    resendText: { color: Colors.textSecondary, fontSize: 13 },
    resendLink: { color: Colors.textPrimary, fontSize: 13, fontWeight: '700', textDecorationLine: 'underline' },
    verifyBtn: {
        width: '100%',
        backgroundColor: Colors.textPrimary,
        paddingVertical: 18,
        borderRadius: 8,
        alignItems: 'center',
    },
    verifyBtnDisabled: { opacity: 0.5 },
    verifyBtnText: {
        color: Colors.backgroundDark,
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
