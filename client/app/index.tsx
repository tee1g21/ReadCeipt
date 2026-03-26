import { View, Text, TouchableOpacity } from "react-native";
import { useReceiptStore, type Receipt } from "../store/useReceiptStore";

export default function Home() {
  // Pull exactly what you need from the store
  const receipts = useReceiptStore((state) => state.receipts);
  const addReceipt = useReceiptStore((state) => state.addReceipt);
  const latestReceipt = receipts[0];

  const handleFakeScan = () => {
    // Simulate getting data back from your Python/Gemini backend
    const fakeData: Receipt = {
      id: Date.now(),
      storeName: "Grocery Mart",
      total: 45.99,
      date: new Date().toISOString(),
    };
    addReceipt(fakeData);
  };

  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <Text className="text-2xl font-bold mb-4 text-slate-800">
        Receipts Scanned: {receipts.length}
      </Text>

      <TouchableOpacity
        className="bg-indigo-500 px-6 py-3 rounded-full shadow-md"
        onPress={handleFakeScan}
      >
        <Text className="text-white font-semibold text-lg">Simulate Scan</Text>
      </TouchableOpacity>

      {/* Show the latest receipt if we have one */}
      {latestReceipt && (
        <View className="mt-8 bg-white p-4 rounded-xl shadow-sm w-3/4">
          <Text className="font-bold text-lg">
            {latestReceipt.storeName ?? "Unknown Store"}
          </Text>
          <Text className="text-slate-500">${latestReceipt.total ?? 0}</Text>
        </View>
      )}
    </View>
  );
}
