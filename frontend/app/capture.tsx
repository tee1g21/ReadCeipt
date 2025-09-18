import { View, Text, Platform, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Pressable } from "react-native";

export default function CaptureScreen() {
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  const handleCapture = () => {
    Alert.alert(
      "Capture Receipt",
      "Camera functionality will be implemented here!",
      [{ text: "OK" }]
    );
  };

  const handleGallery = () => {
    Alert.alert(
      "Select from Gallery",
      "Image picker functionality will be implemented here!",
      [{ text: "OK" }]
    );
  };

  return (
    <Container className="flex-1 bg-blue-50">
      <ScrollView className="p-6">
        <Text className="text-2xl font-bold text-center mb-6 text-blue-800">
          📸 Capture Receipt
        </Text>

        <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <Text className="text-lg text-center mb-4 text-gray-700">
            Choose how to add your receipt:
          </Text>

          <Pressable 
            onPress={handleCapture}
            className="bg-blue-500 p-4 rounded-lg mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              📷 Take Photo
            </Text>
          </Pressable>

          <Pressable 
            onPress={handleGallery}
            className="bg-green-500 p-4 rounded-lg mb-4"
          >
            <Text className="text-white text-center font-semibold text-lg">
              🖼️ Choose from Gallery
            </Text>
          </Pressable>
        </View>

        <View className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-6">
          <Text className="text-yellow-800 text-center">
            💡 Tip: Make sure the receipt is well-lit and all text is clearly visible for best results.
          </Text>
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
