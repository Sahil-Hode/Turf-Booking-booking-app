import { Stack } from 'expo-router';

export default function CustomerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="turf-details/[id]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen
                name="booking/slot-selection/[turfId]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen
                name="booking/payment/[turfId]"
                options={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            />
            <Stack.Screen
                name="booking/confirmation/[bookingId]"
                options={{
                    headerShown: false,
                    animation: 'fade',
                }}
            />
        </Stack>
    );
}
