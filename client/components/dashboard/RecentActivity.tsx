import { AppText, Button, ReceiptThumbnail } from "@/components/ui";
import { View } from "react-native";
import { router } from "expo-router";
import { getFilteredReceipts } from "@/db/queries/receipts";

export function RecentActivity() {
  const receipts = getFilteredReceipts({ limit: 3 });

  return (
    <View className="px-2">
      <View className="flex-row justify-between items-center pb-2">
        <AppText variant="h3">Recent Activity</AppText>
        <Button
          variant="ghost"
          className="text-primary p-0"
          label="View More"
          onPress={() => router.push("/(tabs)/history")}
        />
      </View>

      <View className="gap-4">
        {receipts.map((receipt) => (
          <ReceiptThumbnail key={receipt.id} receipt={receipt} />
        ))}
      </View>
    </View>
  );
}
