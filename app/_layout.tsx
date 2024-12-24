import { useWeatherStore } from '@/store/weatherReportStore';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { selectedWeatherReport: selectedWeather } = useWeatherStore();

  // Loading fonts
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Showing loading screen until fully loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='weather'
          options={{
            headerShown: true,
            title: `${selectedWeather?.name} Weather Report`,
          }}
        />
      </Stack>

      <StatusBar style='auto' />
    </>
  );
}
