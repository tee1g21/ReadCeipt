import { View, Text, Platform, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useState } from "react";

export default function ReviewScreen() {
  const Container = Platform.OS === 'web' ? View : SafeAreaView;
  const [merchantName, setMerchantName] = useState("Coffee Shop Downtown");
  const [amount, setAmount] = useState("8.50");
  const [date, setDate] = useState("2025-09-18");
  const [category, setCategory] = useState("Food & Dining");

  const handleSave = () => {
    alert("Receipt saved successfully!");
  };

  const handleReject = () => {
    alert("Receipt rejected and moved to trash.");
  };

  return (
    <Container className="flex-1 bg-purple-50">
      <ScrollView className="p-6">
        <Text className="text-2xl font-bold text-center mb-6 text-purple-800">
          🔍 Review & Edit Receipt
        </Text>

        {/* Mock receipt image placeholder */}
        <View className="bg-gray-200 rounded-lg h-48 mb-6 justify-center items-center">
          <Text className="text-gray-500 text-lg">📄 Receipt Image</Text>
          <Text className="text-gray-400 text-sm mt-2">Image preview would appear here</Text>
        </View>

        {/* Extracted data form */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold mb-4 text-gray-800">
            Extracted Information:
          </Text>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1 font-medium">Merchant Name:</Text>
            <TextInput
              value={merchantName}
              onChangeText={setMerchantName}
              className="border border-gray-300 rounded-lg p-3 bg-gray-50"
              placeholder="Enter merchant name"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1 font-medium">Amount:</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              className="border border-gray-300 rounded-lg p-3 bg-gray-50"
              placeholder="Enter amount"
              keyboardType="numeric"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1 font-medium">Date:</Text>
            <TextInput
              value={date}
              onChangeText={setDate}
              className="border border-gray-300 rounded-lg p-3 bg-gray-50"
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 mb-1 font-medium">Category:</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              className="border border-gray-300 rounded-lg p-3 bg-gray-50"
              placeholder="Enter category"
            />
          </View>
        </View>

        {/* Action buttons */}
        <View className="space-y-3 mb-6">
          <Pressable 
            onPress={handleSave}
            className="bg-green-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              ✅ Save Receipt
            </Text>
          </Pressable>

          <Pressable 
            onPress={handleReject}
            className="bg-red-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center font-semibold text-lg">
              ❌ Reject Receipt
            </Text>
          </Pressable>
        </View>

        <Link 
          href="/"
          className="bg-gray-500 p-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            ← Back to Home
          </Text>
        </Link>
      </ScrollView>
    </Container>
  );
}
