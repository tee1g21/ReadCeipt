import { AppText, Button, ReceiptThumbnail } from "@/components/ui";
import { View } from "react-native";
import { router } from "expo-router";
import { useDashboardStats } from "@/hooks/dashboard/useDashboardStats";

export function RecentActivity() {
  const { recentActivity } = useDashboardStats();

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
        {recentActivity.length > 0 ? (
          recentActivity.map((receipt) => (
            <ReceiptThumbnail key={receipt.id} receipt={receipt} />
          ))
        ) : (
          <View className="py-4 items-center justify-center">
            <AppText variant="muted" className="text-lg">
              No recent activity to display
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
}
