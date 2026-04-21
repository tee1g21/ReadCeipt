import { View } from "react-native";
import { Container, AppText } from "@/components/ui";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { formatCurrency } from "@/lib/currencyFormatter";

export function CurrentMonthSpending() {
  const { currentMonthSpend } = useDashboardStats();
  const currentMonthSpendFormatted = formatCurrency(currentMonthSpend);

  return (
    <Container className="gap-1">
      <AppText variant="body">CURRENT MONTH SPENDING</AppText>
      <View className="flex-row">
        <AppText variant="h1" className="text-primary text-6xl">
          {currentMonthSpendFormatted.split(".")[0]}
        </AppText>
        <AppText variant="h1" className="text-muted pt-4 mt-0.5">
          .{currentMonthSpendFormatted.split(".")[1]}
        </AppText>
      </View>
    </Container>
  );
}
