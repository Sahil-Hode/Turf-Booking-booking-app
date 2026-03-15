import CustomSplashScreen from '@/components/common/SplashScreen';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Inter-Black': require('@expo-google-fonts/inter/Inter_900Black.ttf'),
  });

  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    if (loaded || error) {
      const timer = setTimeout(() => {
        setIsReady(true);
        ExpoSplashScreen.hideAsync();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [loaded, error]);

  if (!isReady || (!loaded && !error)) {
    return <CustomSplashScreen />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(customer)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </>
  );
}
