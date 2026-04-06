import { Screen, Header } from "@/components/ui";
import { ScrollView, View } from "react-native";
import {
  CurrentMonthSpending,
  MonthlyBreakdown,
  NumberScanned,
  RecentActivity,
  TopCategory,
} from "@/components/dashboard";

export default function Dashboard() {
  return (
    <Screen className="items-center">
      <ScrollView className="flex-1 w-full">
        <Header title="ReadCeipt" />

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
