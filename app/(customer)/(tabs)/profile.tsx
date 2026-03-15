import { useRouter } from 'expo-router';
import {
    Bell,
    CalendarDays,
    ChevronRight,
    Heart,
    HelpCircle,
    LogOut,
    Settings,
    Shield,
    Star,
    User,
} from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../../../src/store/useAppStore';
import { Colors } from '../../../src/theme/colors';

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    sublabel?: string;
    onPress: () => void;
    rightElement?: React.ReactNode;
    danger?: boolean;
}

function MenuItem({ icon, label, sublabel, onPress, danger }: MenuItemProps) {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.menuIcon, danger && styles.menuIconDanger]}>
                {icon}
            </View>
            <View style={styles.menuLabel}>
                <Text style={[styles.menuText, danger && styles.menuTextDanger]}>{label}</Text>
                {sublabel && <Text style={styles.menuSublabel}>{sublabel}</Text>}
            </View>
            <ChevronRight size={18} color={danger ? '#ef4444' : Colors.textSecondary} />
        </TouchableOpacity>
    );
}

export default function ProfileScreen() {
    const router = useRouter();
    const { user, bookings, favorites, setLoggedIn } = useAppStore();

    const handleLogout = () => {
        setLoggedIn(false);
        router.replace('/(auth)/login');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Hero */}
                <View style={styles.profileHero}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarInitials}>
                                {user.name.split(' ').map((n) => n[0]).join('')}
                            </Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Shield size={12} color={Colors.backgroundDark} fill={Colors.backgroundDark} />
                        </View>
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{bookings.filter(b => b.status === 'upcoming').length}</Text>
                            <Text style={styles.statLabel}>Upcoming</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{bookings.filter(b => b.status === 'completed').length}</Text>
                            <Text style={styles.statLabel}>Completed</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>{favorites.length}</Text>
                            <Text style={styles.statLabel}>Favorites</Text>
                        </View>
                    </View>
                </View>

                {/* Edit Profile Button */}
                <View style={styles.editSection}>
                    <TouchableOpacity style={styles.editBtn}>
                        <User size={16} color={Colors.primary} />
                        <Text style={styles.editBtnText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Sections */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionLabel}>Activity</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon={<CalendarDays size={20} color={Colors.primary} />}
                            label="My Bookings"
                            sublabel={`${bookings.length} total bookings`}
                            onPress={() => router.push('/(customer)/(tabs)/my-bookings')}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon={<Heart size={20} color={Colors.primary} />}
                            label="Favorites"
                            sublabel={`${favorites.length} saved turfs`}
                            onPress={() => router.push('/(customer)/(tabs)/favorites')}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon={<Star size={20} color={Colors.primary} />}
                            label="Reviews"
                            sublabel="Your ratings & reviews"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionLabel}>Preferences</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon={<Bell size={20} color={Colors.primary} />}
                            label="Notifications"
                            onPress={() => router.push('/(customer)/notifications')}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon={<Settings size={20} color={Colors.primary} />}
                            label="Settings"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionLabel}>Support</Text>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon={<HelpCircle size={20} color={Colors.primary} />}
                            label="Help Center"
                            onPress={() => { }}
                        />
                        <View style={styles.menuDivider} />
                        <MenuItem
                            icon={<Shield size={20} color={Colors.primary} />}
                            label="Privacy Policy"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                <View style={[styles.menuSection, { marginBottom: 32 }]}>
                    <View style={styles.menuCard}>
                        <MenuItem
                            icon={<LogOut size={20} color="#ef4444" />}
                            label="Logout"
                            onPress={handleLogout}
                            danger
                        />
                    </View>
                </View>

                {/* App version */}
                <Text style={styles.version}>TurfZy v1.0.0 • Built for Champions</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundDark,
    },
    profileHero: {
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 16,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 14,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Colors.backgroundDark,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    avatarInitials: {
        color: Colors.backgroundDark,
        fontSize: 28,
        fontWeight: '800',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.backgroundDark,
    },
    userName: {
        color: Colors.textPrimary,
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    userEmail: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginTop: 4,
        marginBottom: 20,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        paddingVertical: 16,
        paddingHorizontal: 24,
        gap: 0,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    statValue: {
        color: Colors.primary,
        fontSize: 22,
        fontWeight: '800',
    },
    statLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    statDivider: {
        width: 1,
        height: 36,
        backgroundColor: Colors.borderDark,
    },
    editSection: {
        paddingHorizontal: 16,
        marginBottom: 8,
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: Colors.primaryMuted,
        borderWidth: 1,
        borderColor: Colors.primaryBorder,
        borderRadius: 14,
        paddingVertical: 12,
    },
    editBtnText: {
        color: Colors.primary,
        fontSize: 15,
        fontWeight: '700',
    },
    menuSection: {
        paddingHorizontal: 16,
        marginTop: 20,
    },
    sectionLabel: {
        color: Colors.textSecondary,
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        paddingLeft: 2,
    },
    menuCard: {
        backgroundColor: Colors.surface1,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        gap: 12,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: Colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIconDanger: {
        backgroundColor: 'rgba(239,68,68,0.12)',
    },
    menuLabel: {
        flex: 1,
    },
    menuText: {
        color: Colors.textPrimary,
        fontSize: 15,
        fontWeight: '600',
    },
    menuTextDanger: {
        color: '#ef4444',
    },
    menuSublabel: {
        color: Colors.textSecondary,
        fontSize: 12,
        marginTop: 1,
    },
    menuDivider: {
        height: 1,
        backgroundColor: Colors.borderDark,
        marginLeft: 66,
    },
    version: {
        color: '#334155',
        fontSize: 11,
        textAlign: 'center',
        paddingBottom: 16,
    },
});
