import { View, Text, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  // Use View for web, SafeAreaView for mobile
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container className="flex-1 bg-gray-50">
      <ScrollView className="p-6">
        <Text className="text-3xl font-bold text-center mb-8 text-gray-800">
          📄 ReadCeipt
        </Text>
      </ScrollView>
    </Container>
  );
}
