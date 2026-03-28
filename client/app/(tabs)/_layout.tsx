import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#2DD4BF" : "#006778",
        tabBarInactiveTintColor: isDark ? "#8b9a96" : "#707070",
        tabBarLabelStyle: {
          fontFamily: "InclusiveSans_600SemiBold",
        },
        tabBarStyle: {
          backgroundColor: isDark ? "#131a2a" : "#f8f9fa",
          borderTopColor: isDark ? "#1f2839" : "#e6e7e8",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarStyle: {
            backgroundColor: "black",
            borderTopWidth: 0,
          },
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
