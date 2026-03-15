import { Tabs } from 'expo-router';
import { CalendarDays, Compass, Heart, Home, User } from 'lucide-react-native';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Colors } from '../../../src/theme/colors';

interface TabIconProps {
    icon: React.ReactNode;
    focused: boolean;
}

function TabIcon({ icon, focused }: TabIconProps) {
    return (
        <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
            {icon}
        </View>
    );
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: '#475569',
                tabBarLabelStyle: styles.tabLabel,
                tabBarShowLabel: true,
                tabBarItemStyle: { paddingVertical: 4 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Home size={22} color={focused ? Colors.primary : '#475569'} fill={focused ? Colors.primary : 'transparent'} />}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Compass size={22} color={focused ? Colors.primary : '#475569'} />}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="my-bookings"
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<CalendarDays size={22} color={focused ? Colors.primary : '#475569'} />}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<Heart size={22} color={focused ? Colors.primary : '#475569'} fill={focused ? Colors.primary : 'transparent'} />}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={<User size={22} color={focused ? Colors.primary : '#475569'} />}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'rgba(17,33,27,0.95)',
        borderTopWidth: 1,
        borderTopColor: Colors.borderDark,
        height: Platform.OS === 'ios' ? 84 : 64,
        paddingBottom: Platform.OS === 'ios' ? 24 : 8,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 12,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    iconWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 32,
        borderRadius: 12,
    },
    iconWrapActive: {
        backgroundColor: Colors.primaryMuted,
    },
});
