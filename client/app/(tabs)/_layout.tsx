import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, useColorScheme, View } from "react-native";

export default function TabLayout() {
  const isDark = useColorScheme() === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#2DD4BF" : "#006778",
        tabBarInactiveTintColor: isDark ? "#8b9a96" : "#707070",
        tabBarButton: ({ children, style, ...props }) => {
          const { ref: _ref, href: _href, ...pressableProps } = props;

          return (
            <Pressable {...pressableProps} style={style}>
              {({ pressed }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  }}
                >
                  {children}
                </View>
              )}
            </Pressable>
          );
        },
        tabBarLabelStyle: {
          fontFamily: "InclusiveSans_600SemiBold",
        },
        tabBarStyle: {
          backgroundColor: isDark ? "#131a2a" : "#F5F6F7",
          borderTopColor: isDark ? "#1f2839" : "#e6e7e8",
          height: 72,
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
            height: 72,
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
