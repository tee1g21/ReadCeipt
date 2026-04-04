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
import { useColorScheme } from "react-native";
import * as SystemUI from "expo-system-ui";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

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

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(isDark ? "#131a2a" : "#F5F6F7");
  }, [isDark]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "default",
        contentStyle: {
          backgroundColor: isDark ? "#131a2a" : "#F5F6F7",
        },
      }}
    />
  );
}
