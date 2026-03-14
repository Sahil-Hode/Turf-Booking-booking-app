import { AppColors } from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
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

const STEPS = ['Photo & Name', 'Contact Info', 'Done!'];

export default function ProfileCreationScreen() {
    const router = useRouter();
    const [step, setStep] = React.useState(0);
    const [fullName, setFullName] = React.useState('');
    const [dob, setDob] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleNext = () => {
        if (step < 2) setStep(prev => prev + 1);
        else router.replace('/(customer)' as any);
    };

    if (step === 2) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                        <Ionicons name="person-circle" size={64} color={AppColors.primary} />
                    </View>
                    <Text style={styles.successTitle}>Profile Created! 🎉</Text>
                    <Text style={styles.successSubtitle}>
                        Your profile is all set. Start exploring and booking turfs near you!
                    </Text>
                    <TouchableOpacity style={styles.startBtn} onPress={handleNext} activeOpacity={0.88}>
                        <Text style={styles.startBtnText}>Start Booking</Text>
                        <Ionicons name="arrow-forward" size={18} color={AppColors.white} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                    {/* Header */}
                    <View style={styles.header}>
                        {step > 0 && (
                            <TouchableOpacity style={styles.backBtn} onPress={() => setStep(prev => prev - 1)}>
                                <Ionicons name="chevron-back" size={24} color={AppColors.textPrimary} />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.headerTitle}>Create Profile</Text>
                        <Text style={styles.stepCounter}>Step {step + 1} / {STEPS.length - 1}</Text>
                    </View>

                    {/* Progress */}
                    <View style={styles.progressRow}>
                        {STEPS.slice(0, -1).map((_, idx) => (
                            <View
                                key={idx}
                                style={[styles.progressBar, idx <= step && styles.progressBarActive]}
                            />
                        ))}
                    </View>

                    {/* Form */}
                    {step === 0 && (
                        <View style={styles.form}>
                            {/* Avatar */}
                            <TouchableOpacity style={styles.avatarPicker} activeOpacity={0.8}>
                                <View style={styles.avatarCircle}>
                                    <Ionicons name="camera" size={28} color={AppColors.primary} />
                                </View>
                                <Text style={styles.avatarLabel}>Upload Photo</Text>
                            </TouchableOpacity>

                            {/* Full Name */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="person-outline" size={18} color={AppColors.textMuted} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your full name"
                                        placeholderTextColor={AppColors.textMuted}
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                </View>
                            </View>

                            {/* DOB */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Date of Birth</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="calendar-outline" size={18} color={AppColors.textMuted} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="DD/MM/YYYY"
                                        placeholderTextColor={AppColors.textMuted}
                                        value={dob}
                                        onChangeText={setDob}
                                        keyboardType="numeric"
                                    />
                                </View>
                            </View>

                            {/* Gender */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Gender</Text>
                                <View style={styles.genderRow}>
                                    {['Male', 'Female', 'Other'].map((g) => (
                                        <TouchableOpacity
                                            key={g}
                                            style={[styles.genderChip, gender === g && styles.genderChipActive]}
                                            onPress={() => setGender(g)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </View>
                    )}

                    {step === 1 && (
                        <View style={styles.form}>
                            <Text style={styles.stepTitle}>Contact Information</Text>
                            <Text style={styles.stepSubtitle}>How can we reach you?</Text>

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

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Phone Number</Text>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.phonePrefix}>+91</Text>
                                    <View style={styles.phoneDivider} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your phone"
                                        placeholderTextColor={AppColors.textMuted}
                                        value={phone}
                                        onChangeText={setPhone}
                                        keyboardType="phone-pad"
                                        maxLength={10}
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Next Button */}
                    <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.88}>
                        <Text style={styles.nextBtnText}>
                            {step === 1 ? 'Create Profile' : 'Next'}
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color={AppColors.white} />
                    </TouchableOpacity>
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
    flex: { flex: 1 },
    scroll: {
        flexGrow: 1,
        padding: Spacing.xl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.base,
    },
    backBtn: {
        padding: Spacing.xs,
        marginRight: Spacing.sm,
    },
    headerTitle: {
        flex: 1,
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
    },
    stepCounter: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.textMuted,
        fontWeight: Typography.fontWeight.medium,
    },
    progressRow: {
        flexDirection: 'row',
        gap: Spacing.xs,
        marginBottom: Spacing['2xl'],
    },
    progressBar: {
        flex: 1,
        height: 4,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.border,
    },
    progressBarActive: {
        backgroundColor: AppColors.primary,
    },
    form: {
        gap: Spacing.lg,
        marginBottom: Spacing['2xl'],
    },
    stepTitle: {
        fontSize: Typography.fontSize.xl,
        fontWeight: Typography.fontWeight.bold,
        color: AppColors.textPrimary,
        marginBottom: 4,
    },
    stepSubtitle: {
        fontSize: Typography.fontSize.base,
        color: AppColors.textSecondary,
        marginBottom: Spacing.sm,
    },
    avatarPicker: {
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: AppColors.primary,
        borderStyle: 'dashed',
    },
    avatarLabel: {
        fontSize: Typography.fontSize.sm,
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.medium,
    },
    inputGroup: {
        gap: Spacing.xs,
    },
    label: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: AppColors.border,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.base,
        paddingVertical: 12,
        backgroundColor: AppColors.white,
        ...Shadows.sm,
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
    phonePrefix: {
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
        color: AppColors.textPrimary,
        marginRight: Spacing.sm,
    },
    phoneDivider: {
        width: 1,
        height: 20,
        backgroundColor: AppColors.border,
        marginRight: Spacing.sm,
    },
    genderRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    genderChip: {
        flex: 1,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.xl,
        borderWidth: 1.5,
        borderColor: AppColors.border,
        backgroundColor: AppColors.white,
        alignItems: 'center',
    },
    genderChipActive: {
        borderColor: AppColors.primary,
        backgroundColor: AppColors.primaryLight,
    },
    genderText: {
        fontSize: Typography.fontSize.sm,
        fontWeight: Typography.fontWeight.medium,
        color: AppColors.textSecondary,
    },
    genderTextActive: {
        color: AppColors.primary,
        fontWeight: Typography.fontWeight.semibold,
    },
    nextBtn: {
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    nextBtnText: {
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
    successIcon: {
        width: 120,
        height: 120,
        borderRadius: BorderRadius.full,
        backgroundColor: AppColors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xl,
    },
    successTitle: {
        fontSize: Typography.fontSize['3xl'],
        fontWeight: Typography.fontWeight.extrabold,
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
        maxWidth: 300,
    },
    startBtn: {
        width: '100%',
        backgroundColor: AppColors.primary,
        borderRadius: BorderRadius.xl,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.sm,
        shadowColor: AppColors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    startBtnText: {
        color: AppColors.white,
        fontSize: Typography.fontSize.lg,
        fontWeight: Typography.fontWeight.bold,
    },
});
