import { Screen, Header } from "@/components/ui";
import { View, ScrollView } from "react-native";
import {
  CurrentMonthSpending,
  MonthlyBreakdown,
  NumberScanned,
  RecentActivity,
  TopCategory,
} from ".";

export function Dashboard() {
  return (
    <Screen edges={["top", "left", "right"]}>
      <Header title="ReadCeipt" />

      <ScrollView className="flex-1 w-full">
        <View className="flex gap-4 px-4">
          <CurrentMonthSpending />

          <MonthlyBreakdown />

          <View className="flex-row gap-4">
            <TopCategory />
            <NumberScanned />
          </View>

          <RecentActivity />
        </View>
      </ScrollView>
    </Screen>
  );
}
