import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="otp-verification" />
            <Stack.Screen name="profile-creation" />
        </Stack>
    );
}
