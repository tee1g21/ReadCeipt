import { AppText, Button, ReceiptThumbnail } from "@/components/ui";
import { View } from "react-native";
import { router } from "expo-router";

export function RecentActivity() {
  const activityItems = ["recent-1", "recent-2", "recent-3"];

  return (
    <View className="px-2">
      <View className="flex-row justify-between items-center">
        <AppText variant="h3">Recent Activity</AppText>
        <Button
          variant="ghost"
          className="text-primary p-0"
          label="View More"
          onPress={() => router.push("/(tabs)/history")}
        />
      </View>

      <View className="gap-4">
        {activityItems.map((itemId) => (
          <ReceiptThumbnail key={itemId} receiptId={itemId} />
        ))}
      </View>
    </View>
  );
}
