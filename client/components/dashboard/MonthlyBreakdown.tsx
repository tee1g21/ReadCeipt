import { Surface, AppText } from "@/components/ui";
import { View } from "react-native";
import { cn } from "@/lib/cn";
import { useMonthlyBreakdown } from "@/hooks/dashboard/useMonthlyBreakdown";

export function MonthlyBreakdown() {
  const { monthlyBreakdown, chartYear } = useMonthlyBreakdown();

  const maxSpend = Math.max(...monthlyBreakdown.map((m) => m.amount), 1);

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
      <View className="flex-row gap-x-2 w-full justify-center">
        {monthlyBreakdown.map(({ label, amount }, index) => {
          const heightPercentage = (amount / maxSpend) * 100;

          const isCurrentMonth = index === monthlyBreakdown.length - 1;

          return (
            <View key={label} className="flex-1 items-center gap-2 max-w-16">
              <View
                className={cn(
                  "w-full h-32 justify-end  rounded-md overflow-hidden",
                  isCurrentMonth ? "bg-primary/15" : "bg-muted/10",
                )}
              >
                <View
                  className={cn(
                    "w-full rounded-md",
                    isCurrentMonth ? "bg-primary shadow-md" : "bg-muted/50",
                  )}
                  style={{ height: `${heightPercentage}%` }}
                />
              </View>
              <AppText variant="muted" className="text-center text-[10px]">
                {label}
              </AppText>
            </View>
          );
        })}
      </View>
    </Surface>
  );
}
