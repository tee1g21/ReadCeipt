import { Stack } from "expo-router";
import "../global.css";
import {
  useFonts,
  InclusiveSans_400Regular,
  InclusiveSans_500Medium,
  InclusiveSans_600SemiBold,
  InclusiveSans_700Bold,
} from "@expo-google-fonts/inclusive-sans";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InclusiveSans_400Regular,
    InclusiveSans_500Medium,
    InclusiveSans_600SemiBold,
    InclusiveSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
