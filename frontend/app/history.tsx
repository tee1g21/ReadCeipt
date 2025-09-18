import { View, Text, Platform, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Pressable } from "react-native";

// Mock data for demonstration
const mockReceipts = [
  {
    id: '1',
    store: 'Grocery Store',
    amount: '$45.67',
    date: '2025-09-15',
    category: 'Food & Dining'
  },
  {
    id: '2',
    store: 'Gas Station',
    amount: '$32.10',
    date: '2025-09-14',
    category: 'Transportation'
  },
  {
    id: '3',
    store: 'Coffee Shop',
    amount: '$8.50',
    date: '2025-09-13',
    category: 'Food & Dining'
  },
  {
    id: '4',
    store: 'Hardware Store',
    amount: '$127.89',
    date: '2025-09-12',
    category: 'Home & Garden'
  }
];

export default function HistoryScreen() {
  const Container = Platform.OS === 'web' ? View : SafeAreaView;

  const ReceiptItem = ({ item }: { item: typeof mockReceipts[0] }) => (
    <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-gray-800">{item.store}</Text>
        <Text className="text-lg font-bold text-green-600">{item.amount}</Text>
      </View>
      <Text className="text-gray-600 mb-1">{item.date}</Text>
      <View className="bg-blue-100 rounded-full px-3 py-1 self-start">
        <Text className="text-blue-800 text-xs font-medium">{item.category}</Text>
      </View>
    </View>
  );

  return (
    <Container className="flex-1 bg-green-50">
      <View className="p-6 flex-1">
        <Text className="text-2xl font-bold text-center mb-6 text-green-800">
          📋 Receipt History
        </Text>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-center text-gray-600">
            Total Receipts: {mockReceipts.length}
          </Text>
          <Text className="text-center text-2xl font-bold text-green-600 mt-1">
            $214.16
          </Text>
        </View>

        <FlatList
          data={mockReceipts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReceiptItem item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <Link 
          href="/"
          className="bg-gray-500 p-4 rounded-lg mt-4"
        >
          <Text className="text-white text-center font-semibold">
            ← Back to Home
          </Text>
        </Link>
      </View>
    </Container>
  );
}
