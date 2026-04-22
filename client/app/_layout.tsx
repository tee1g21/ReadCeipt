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
import { useInitializeDatabase } from "@/hooks/useInitialiseDatabase";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const isDark = useColorScheme() === "dark";

  const [fontsLoaded] = useFonts({
    InclusiveSans_400Regular,
    InclusiveSans_500Medium,
    InclusiveSans_600SemiBold,
    InclusiveSans_700Bold,
  });

  const { dbReady, dbError } = useInitializeDatabase();

  useEffect(() => {
    if (fontsLoaded && dbReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, dbReady]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(isDark ? "#131a2a" : "#F5F6F7");
  }, [isDark]);

  if (dbError) {
    console.error("Migration error:", dbError);
  }

  if (!fontsLoaded || !dbReady) return null;

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
      <Stack.Screen name="[receiptId]/index" />
      <Stack.Screen
        name="[receiptId]/items"
        options={{
          animation: "fade",
        }}
      />
    </Stack>
  );
}
