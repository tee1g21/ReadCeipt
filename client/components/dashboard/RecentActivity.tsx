import { AppText, ReceiptPreview, Button } from "@/components/ui";
import { View } from "react-native";
import { router } from "expo-router";

export function RecentActivity() {
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
        <ReceiptPreview receiptId={"recent-1"} />
        <ReceiptPreview receiptId={"recent-2"} />
        <ReceiptPreview receiptId={"recent-3"} />
      </View>
    </View>
  );
}
