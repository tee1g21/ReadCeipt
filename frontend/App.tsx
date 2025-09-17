import { useState } from "react";
import { View, Text, TextInput, Pressable, FlatList, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function App() {
  const [items, setItems] = useState<string[]>([]);
  const [text, setText] = useState("");

  const addItem = () => {
    if (text.trim().length === 0) return;
    setItems((prev) => [...prev, text.trim()]);
    setText("");
  };

  // Use View for web, SafeAreaView for mobile
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  return (
    <Container className="flex-1">
    <View className="flex-1 bg-gray-100 p-6">
      <Text className="text-2xl font-bold text-blue-600 mb-4">
        ReadCeipt Test App
      </Text>

      {/* Input */}
      <TextInput
        className="border border-gray-400 rounded-lg p-3 bg-white mb-4"
        placeholder="Type something..."
        value={text}
        onChangeText={setText}
      />

      {/* Add button */}
      <Pressable
        onPress={addItem}
        className="bg-blue-500 px-4 py-2 rounded-lg items-center mb-6"
      >
        <Text className="text-white font-semibold">Add Item</Text>
      </Pressable>

      {/* List */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center mb-2">
            <Text className="text-base text-gray-800">
              {index + 1}. {item}
            </Text>
          </View>
        )}
      />
    </View>
    </Container>
  );
}







