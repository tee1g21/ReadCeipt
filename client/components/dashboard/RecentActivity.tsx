import { AppText, Button } from "@/components/ui";
import { View } from "react-native";
import { router } from "expo-router";
import { ReceiptThumbnailList } from "../ui/ReceiptThumbnailList";

export function RecentActivity() {
  const activityItems = ["recent-1", "recent-2", "recent-3"];

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

      <ReceiptThumbnailList items={activityItems} />
    </View>
  );
}
