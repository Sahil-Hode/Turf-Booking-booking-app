import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Mail, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../src/store/useAppStore';
import { Colors } from '../../src/theme/colors';

export default function ProfileCreationScreen() {
    const router = useRouter();
    const setLoggedIn = useAppStore((s) => s.setLoggedIn);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const isFormValid = name.length > 2 && email.includes('@') && phone.length >= 10;

    const handleComplete = () => {
        // In a real app, you would send this to the backend.
        if (isFormValid) {
            setLoggedIn(true);
            router.replace('/(customer)' as any);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
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

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Complete your profile</Text>
                    <Text style={styles.subtitle}>
                        Just a few more details to get you started on your TurfZy journey.
                    </Text>

                    {/* Avatar Upload */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarWrapper}>
                            <View style={styles.avatarPlaceholder}>
                                <User size={40} color={Colors.primary + '80'} />
                            </View>
                            <TouchableOpacity style={styles.cameraBtn}>
                                <Camera size={14} color={Colors.backgroundDark} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Full Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputWrapper}>
                                <User size={18} color="#94a3b8" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    placeholderTextColor="#64748b"
                                    value={name}
                                    onChangeText={setName}
                                    selectionColor={Colors.primary}
                                />
                            </View>
                        </View>

                        {/* Email Address */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Mail size={18} color="#94a3b8" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="john@example.com"
                                    placeholderTextColor="#64748b"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    selectionColor={Colors.primary}
                                />
                            </View>
                        </View>

                        {/* Phone Number */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Phone Number</Text>
                            <View style={styles.inputWrapper}>
                                <Phone size={18} color="#94a3b8" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+1 (555) 000-0000"
                                    placeholderTextColor="#64748b"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    selectionColor={Colors.primary}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer CTA */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.continueBtn, !isFormValid && styles.continueBtnDisabled]}
                        onPress={handleComplete}
                        disabled={!isFormValid}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.continueText}>Complete Profile</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundDark },
    flex: { flex: 1 },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40,
    },
    title: {
        color: Colors.textPrimary,
        fontSize: 32,
        fontWeight: '900',
        fontFamily: 'Inter-Black',
        letterSpacing: -1,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    subtitle: {
        color: Colors.textSecondary,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 40,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 36,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.surface3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.textPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.backgroundDark,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: Colors.textSecondary,
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.surface2,
        borderWidth: 1,
        borderColor: Colors.borderMedium,
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 60,
    },
    input: {
        flex: 1,
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        padding: 24,
        paddingBottom: 32,
        backgroundColor: Colors.backgroundDark,
    },
    continueBtn: {
        backgroundColor: Colors.textPrimary,
        paddingVertical: 18,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueBtnDisabled: {
        backgroundColor: Colors.borderLight,
        opacity: 0.5,
    },
    continueText: {
        color: Colors.backgroundDark,
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
});
