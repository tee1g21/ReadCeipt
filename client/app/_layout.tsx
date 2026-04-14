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

import { useAppMigrations } from "@/hooks/useAppMigrations";

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

  const { success: dbLoaded, error: dbError } = useAppMigrations();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(isDark ? "#131a2a" : "#F5F6F7");
  }, [isDark]);

  if (dbError) {
    console.error("Migration error:", dbError);
  }

  if (!fontsLoaded || !dbLoaded) return null;

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: false,
        animation: "default",
        contentStyle: {
          backgroundColor: isDark ? "#131a2a" : "#F5F6F7",
        },
      }}
    >
      <Stack.Screen
        name="[receipt]/items"
        options={{
          animation: "fade",
        }}
      />
    </Stack>
  );
}
