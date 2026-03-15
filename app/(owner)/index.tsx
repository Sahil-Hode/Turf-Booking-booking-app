import { colors, palette } from '@/theme/colors';
import { layout, spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    ArrowRight,
    BarChart3,
    CalendarDays,
    CircleDollarSign,
    MapPin,
} from 'lucide-react-native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const QUICK_ACTIONS = [
    {
        title: 'Manage bookings',
        detail: "See today's slots and booking activity.",
        Icon: CalendarDays,
    },
    {
        title: 'Track earnings',
        detail: 'Monitor revenue and payout performance.',
        Icon: CircleDollarSign,
    },
    {
        title: 'Update listings',
        detail: 'Keep pricing, photos, and amenities fresh.',
        Icon: MapPin,
    },
];

export default function OwnerHomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['#A5EB2D', '#7CCF17']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}>
                    <View style={styles.heroIconWrap}>
                        <BarChart3 size={44} color="#1B1B1B" strokeWidth={2.2} />
                    </View>
                    <Text style={styles.heroTitle}>Owner workspace ready</Text>
                    <Text style={styles.heroSubtitle}>
                        The new onboarding route now lands owners in their own flow.
                    </Text>
                    <TouchableOpacity
                        style={styles.heroButton}
                        activeOpacity={0.86}
                        onPress={() => router.replace('/(auth)/login' as any)}>
                        <Text style={styles.heroButtonText}>Open login flow</Text>
                        <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                </LinearGradient>

                {QUICK_ACTIONS.map(({ title, detail, Icon }) => (
                    <View key={title} style={styles.card}>
                        <View style={styles.cardIcon}>
                            <Icon size={22} color={palette.green[700]} strokeWidth={2.2} />
                        </View>
                        <View style={styles.cardCopy}>
                            <Text style={styles.cardTitle}>{title}</Text>
                            <Text style={styles.cardDetail}>{detail}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    hero: {
        borderRadius: 30,
        padding: spacing.xl,
    },
    heroIconWrap: {
        width: 72,
        height: 72,
        borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    heroTitle: {
        fontSize: typography.sizes['2xl'],
        lineHeight: 34,
        fontWeight: '800',
        color: '#171717',
        letterSpacing: -1,
        marginBottom: spacing.sm,
    },
    heroSubtitle: {
        fontSize: typography.sizes.base,
        lineHeight: 22,
        color: '#24400F',
        fontWeight: typography.weights.medium,
        marginBottom: spacing.lg,
    },
    heroButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        backgroundColor: palette.green[700],
        borderRadius: layout.borderRadius.full,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    heroButtonText: {
        color: '#FFFFFF',
        fontSize: typography.sizes.sm,
        fontWeight: '700',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: spacing.lg,
        flexDirection: 'row',
        gap: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    cardIcon: {
        width: 50,
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.green[100],
    },
    cardCopy: {
        flex: 1,
    },
    cardTitle: {
        fontSize: typography.sizes.md,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    cardDetail: {
        fontSize: typography.sizes.sm,
        lineHeight: 20,
        color: colors.textSecondary,
    },
});
