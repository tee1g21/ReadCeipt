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
        
        <Text className="text-lg text-center mb-8 text-gray-600">
          Your digital receipt management solution
        </Text>

        <View className="space-y-4">
          <Link 
            href="/capture"
            className="bg-blue-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              📸 Capture Receipt
            </Text>
          </Link>

          <Link 
            href="/history"
            className="bg-green-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              📋 View History
            </Text>
          </Link>

          <Link 
            href="/review"
            className="bg-purple-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              🔍 Review Receipts
            </Text>
          </Link>
        </View>

        <View className="mt-8 p-4 bg-white rounded-lg shadow-sm">
          <Text className="text-gray-700 text-center">
            Welcome to ReadCeipt! Use the navigation above to explore the app features.
          </Text>
        </View>
      </ScrollView>
    </Container>
  );
}
