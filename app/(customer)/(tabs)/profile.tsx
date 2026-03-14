import { MOCK_BOOKINGS, MOCK_USER } from '@/constants/mockData';
import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useRouter } from 'expo-router';
import {
    Camera,
    ChevronRight,
    FileText,
    HelpCircle,
    LogOut,
    MapPin,
    Pencil,
    Settings,
    ShieldCheck,
    User
} from 'lucide-react-native';
import React from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const MENU_ITEMS = [
    { id: 'edit', icon: User, label: 'Edit Profile', description: 'Update your personal info' },
    { id: 'settings', icon: Settings, label: 'Settings', description: 'App preferences & notifications' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', description: 'Get help from our team' },
    { id: 'terms', icon: FileText, label: 'Terms & Conditions', description: 'Read our terms' },
    { id: 'privacy', icon: ShieldCheck, label: 'Privacy Policy', description: 'How we use your data' },
];

export default function ProfileScreen() {
    const router = useRouter();

    const totalBookings = MOCK_BOOKINGS.length;
    const upcomingBookings = MOCK_BOOKINGS.filter(b => b.status === 'upcoming').length;
    const completedBookings = MOCK_BOOKINGS.filter(b => b.status === 'completed').length;

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => router.replace('/(auth)') },
        ]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Profile</Text>
                <TouchableOpacity style={styles.editHeaderBtn} activeOpacity={0.8}>
                    <Pencil size={18} color={colors.textPrimary} strokeWidth={2} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Profile Card (Apple Style Wide) */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
                        <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
                            <Camera size={14} color={colors.surface} strokeWidth={2.5} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{MOCK_USER.name}</Text>
                    <Text style={styles.userEmail}>{MOCK_USER.email}</Text>

                    <View style={styles.locationChip}>
                        <MapPin size={12} color={colors.primary} strokeWidth={2} />
                        <Text style={styles.locationText}>{MOCK_USER.location}</Text>
                    </View>

                    <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.8}>
                        <Text style={styles.editProfileText}>Manage Account</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats Row (Minimal Float layout) */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{totalBookings}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{upcomingBookings}</Text>
                        <Text style={styles.statLabel}>Upcoming</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{completedBookings}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                </View>

                {/* Action Menu (Notion/Stripe standard lists) */}
                <View style={styles.menuSection}>
                    <Text style={styles.menuSectionTitle}>Preferences</Text>
                    <View style={styles.menuCard}>
                        {MENU_ITEMS.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.menuItem, idx < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.menuItemLeft}>
                                        <View style={styles.menuIconBg}>
                                            <Icon size={18} color={colors.textSecondary} strokeWidth={2} />
                                        </View>
                                        <View>
                                            <Text style={styles.menuLabel}>{item.label}</Text>
                                            <Text style={styles.menuDescription}>{item.description}</Text>
                                        </View>
                                    </View>
                                    <ChevronRight size={18} color={colors.textTertiary} />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Logout (Warning hierarchy) */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
                        <LogOut size={18} color={colors.error} strokeWidth={2} />
                        <Text style={styles.logoutText}>Logout securely</Text>
                    </TouchableOpacity>
                </View>

                {/* Version branding */}
                <Text style={styles.version}>Turf Booking App • Beta 1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background, // White base
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing.sm,
    },
    headerTitle: {
        fontSize: typography.sizes.xl,      // 24 (large modern header)
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
    },
    editHeaderBtn: {
        width: 44,
        height: 44,
        borderRadius: layout.borderRadius.full,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight, // thin ring outline
        ...shadows.sm,                   // float
    },
    scrollContent: {
        paddingBottom: spacing['4xl'],
    },
    profileCard: {
        marginHorizontal: spacing.lg,
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius['2xl'], // 24px wide card
        padding: spacing.xl,
        alignItems: 'center',
        ...shadows.md,                            // Apple-style soft bloom
        borderWidth: 1,
        borderColor: colors.borderLight,
        marginBottom: spacing.lg,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 88,
        height: 88,
        borderRadius: layout.borderRadius.full,
        borderWidth: 3,
        borderColor: colors.primaryLight,         // very soft green outline
    },
    cameraBtn: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 32,
        height: 32,
        borderRadius: layout.borderRadius.full,
        backgroundColor: colors.textPrimary, // Black for camera bounding
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: colors.surface,
    },
    userName: {
        fontSize: typography.sizes.xl, // 24
        fontWeight: typography.weights.bold,
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tight,
        marginBottom: 2,
    },
    userEmail: {
        fontSize: typography.sizes.sm,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    locationChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.primaryLight, // #DCFCE7
        borderRadius: layout.borderRadius.full,
        paddingHorizontal: spacing.md, // 16
        paddingVertical: 6,
        marginBottom: spacing.lg,
    },
    locationText: {
        fontSize: typography.sizes.xs,
        color: colors.primary, // #16A34A Gen-Z Green
        fontWeight: typography.weights.bold,
        letterSpacing: typography.letterSpacing.wide,
    },
    editProfileBtn: {
        width: '100%',                             // Span full card width
        alignItems: 'center',
        backgroundColor: colors.backgroundSecondary, // #F5F5F5
        borderWidth: 1,
        borderColor: colors.border,                // #E4E4E7
        borderRadius: layout.borderRadius.lg,      // 16px soft pill
        paddingVertical: spacing.sm,               // 12px
        marginTop: spacing.xs,
    },
    editProfileText: {
        color: colors.textPrimary,
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.bold,
    },
    statsRow: {
        marginHorizontal: spacing.lg,
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.xl,      // 20px
        paddingVertical: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        ...shadows.sm,                             // Very minimal flat UI depth
        borderWidth: 1,
        borderColor: colors.borderLight,
        marginBottom: spacing.xl,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    statNumber: {
        fontSize: typography.sizes['2xl'],         // 28
        fontWeight: typography.weights.bold,       // Heavy numbering
        color: colors.textPrimary,
        letterSpacing: typography.letterSpacing.tighter,
    },
    statLabel: {
        fontSize: typography.sizes.xs,
        color: colors.textTertiary,
        fontWeight: typography.weights.medium,
        textTransform: 'uppercase',                // Technical labeling
        letterSpacing: typography.letterSpacing.wide,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.borderLight,
    },
    menuSection: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
    },
    menuSectionTitle: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.bold,
        color: colors.textTertiary,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wider,
        marginBottom: spacing.sm,
        paddingLeft: spacing.xs,
    },
    menuCard: {
        backgroundColor: colors.surface,
        borderRadius: layout.borderRadius.xl,       // 20px edge
        borderWidth: 1,
        borderColor: colors.borderLight,
        ...shadows.sm,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,              // 16
        paddingVertical: spacing.md,                // 16 spacing
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,
    },
    menuIconBg: {
        width: 40,
        height: 40,
        borderRadius: layout.borderRadius.md,       // 12 softer block
        backgroundColor: colors.backgroundSecondary, // #F5F5F5 standard grey box
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.borderLight,            // very subtle boundary
    },
    menuLabel: {
        fontSize: typography.sizes.base,            // 16
        fontWeight: typography.weights.bold,        // Standard M3/iOS weight
        color: colors.textPrimary,
    },
    menuDescription: {
        fontSize: typography.sizes.xs,
        color: colors.textTertiary,
        marginTop: 2,
    },
    logoutSection: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing['2xl'],               // 48 large breather
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: colors.surface,             // White background
        borderRadius: layout.borderRadius.xl,        // 20
        paddingVertical: 14,
        borderWidth: 1.5,
        borderColor: colors.errorBg,                 // Thick red border warning
    },
    logoutText: {
        color: colors.error,
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.bold,
    },
    version: {
        textAlign: 'center',
        fontSize: typography.sizes.xs,
        color: colors.textTertiary,                  // Heavily faded context info
        fontWeight: typography.weights.medium,
        marginBottom: spacing.lg,
    },
});
