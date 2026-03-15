import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Calendar, Info, Tag } from 'lucide-react-native';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockNotifications } from '../../src/data/mockData';
import { Colors } from '../../src/theme/colors';
import { Notification } from '../../src/types';

const NOTIF_ICONS: Record<string, React.ReactNode> = {
    booking: <Calendar size={20} color={Colors.primary} />,
    offer: <Tag size={20} color="#f59e0b" />,
    reminder: <Bell size={20} color="#818cf8" />,
    system: <Info size={20} color="#94a3b8" />,
};

const NOTIF_COLORS: Record<string, string> = {
    booking: Colors.primaryMuted,
    offer: 'rgba(245,158,11,0.15)',
    reminder: 'rgba(129,140,248,0.15)',
    system: 'rgba(148,163,184,0.1)',
};

function NotifCard({ notif }: { notif: Notification }) {
    return (
        <View style={[styles.card, !notif.read && styles.cardUnread]}>
            {!notif.read && <View style={styles.unreadDot} />}
            <View style={[styles.iconWrap, { backgroundColor: NOTIF_COLORS[notif.type] }]}>
                {NOTIF_ICONS[notif.type]}
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>{notif.title}</Text>
                <Text style={styles.message} numberOfLines={2}>{notif.message}</Text>
                <Text style={styles.time}>{notif.time}</Text>
            </View>
        </View>
    );
}

export default function NotificationsScreen() {
    const router = useRouter();
    const unreadCount = mockNotifications.filter((n) => !n.read).length;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ArrowLeft size={22} color={Colors.textPrimary} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{unreadCount} new</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity>
                    <Text style={styles.markAllText}>Mark all read</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={mockNotifications}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <NotifCard notif={item} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Bell size={48} color={Colors.primaryMuted} strokeWidth={1.5} />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.backgroundDark },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderDark,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surface1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        color: Colors.textPrimary,
        fontSize: 18,
        fontWeight: '700',
    },
    badge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
    },
    badgeText: {
        color: Colors.backgroundDark,
        fontSize: 10,
        fontWeight: '700',
    },
    markAllText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: '600',
    },
    listContent: {
        padding: 16,
        gap: 10,
        paddingBottom: 24,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: Colors.surface1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderDark,
        padding: 14,
        position: 'relative',
        overflow: 'hidden',
    },
    cardUnread: {
        borderColor: Colors.borderMedium,
        backgroundColor: Colors.cardDark,
    },
    unreadDot: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
    },
    iconWrap: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    content: { flex: 1, gap: 4 },
    title: {
        color: Colors.textPrimary,
        fontSize: 14,
        fontWeight: '700',
    },
    message: {
        color: Colors.textSecondary,
        fontSize: 13,
        lineHeight: 19,
    },
    time: {
        color: '#475569',
        fontSize: 11,
        marginTop: 2,
    },
    empty: {
        alignItems: 'center',
        paddingTop: 80,
        gap: 12,
    },
    emptyText: {
        color: Colors.textSecondary,
        fontSize: 16,
    },
});
