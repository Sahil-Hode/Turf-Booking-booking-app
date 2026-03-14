import { colors } from '@/theme/colors';
import { shadows } from '@/theme/shadows';
import { typography } from '@/theme/typography';
import { Tabs } from 'expo-router';
import { Calendar, Home, Search, User } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

export default function CustomerTabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary, // Black/Accent
                tabBarInactiveTintColor: colors.textTertiary,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarIconStyle: styles.tabBarIcon,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Home size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, focused }) => (
                        <Search size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
            <Tabs.Screen
                name="my-bookings"
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ color, focused }) => (
                        <Calendar size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <User size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.background, // crisp white
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        height: 70, // Slightly taller for modern reachability
        paddingBottom: 15, // extra padding for bottom safe area
        paddingTop: 8,
        ...shadows.md, // Apple-style light bleed
    },
    tabBarLabel: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.semibold,
        marginTop: 4,
    },
    tabBarIcon: {
        marginBottom: -2,
    },
});
