import { Surface, AppText } from "@/components/ui";
import { View } from "react-native";
import { cn } from "@/lib/cn";

export function MonthlyBreakdown() {
  const monthlySpend = {
    Oct: 120,
    Nov: 300,
    Dec: 150,
    Jan: 400,
    Feb: 200,
    Mar: 500,
    Apr: 100,
  };

  const monthlySpendEntries = Object.entries(monthlySpend);
  const maxSpend = Math.max(...Object.values(monthlySpend));
  const chartYear = "2025–2026";

  return (
    <Surface>
      <View className="flex-row items-end justify-between gap-2 mb-4">
        <AppText variant="h3" className="text-primary">
          Monthly Breakdown
        </AppText>
        <AppText variant="muted" className="text-right">
          {chartYear}
        </AppText>
      </View>
      <View className="flex-row gap-x-2 w-full">
        {monthlySpendEntries.map(([month, amount], index) => {
          // 3. Calculate how tall this specific bar should be
          const heightPercentage = (amount / maxSpend) * 100;

          // Highlight the current month (the last item in the array)
          const isCurrentMonth = index === monthlySpendEntries.length - 1;

          return (
            <View key={month} className="flex-1 items-center gap-2">
              <View className="w-full h-32 justify-end">
                <View
                  className={cn(
                    "w-full rounded-md",
                    isCurrentMonth ? "bg-primary shadow-md" : "bg-muted/50",
                  )}
                  style={{ height: `${heightPercentage}%` }}
                />
              </View>
              <AppText variant="muted" className="text-center text-[10px]">
                {month}
              </AppText>
            </View>
          );
        })}
      </View>
    </Surface>
  );
}
