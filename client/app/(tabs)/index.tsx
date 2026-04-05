import {
  Screen,
  Header,
  Surface,
  AppText,
  Button,
  Icon,
  Container,
  ReceiptPreview,
} from "@/components/ui";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { cn } from "@/lib/cn";

export default function Dashboard() {
  const router = useRouter();

  const monthlySpend = {
    Oct: 120,
    Nov: 300,
    Dec: 150,
    Jan: 400,
    Feb: 200,
    Mar: 500,
    Apr: 100,
  } as const;

  const monthlySpendEntries = Object.entries(monthlySpend);
  const maxSpend = Math.max(...Object.values(monthlySpend));
  const chartYear = "2025–2026";

  return (
    <Screen className="items-center">
      <ScrollView className="flex-1 w-full ">
        <Header title="ReadCeipt"/>
        <View className="flex gap-4 px-4">
          {/* Monthly spend view */}
          <Container className="gap-1">
            <AppText variant="body">CURRENT MONTH SPENDING</AppText>
            <View className="flex-row">
              <AppText variant="h1" className="text-primary text-6xl">
                £3,842
              </AppText>
              <AppText variant="h1" className="text-muted pt-4 mt-0.5">
                .50
              </AppText>
            </View>
          </Container>

          {/* Monthly Breakdown */}
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
                          isCurrentMonth
                            ? "bg-primary shadow-md"
                            : "bg-muted/50",
                        )}
                        style={{ height: `${heightPercentage}%` }}
                      />
                    </View>
                    <AppText
                      variant="muted"
                      className="text-center text-[10px]"
                    >
                      {month}
                    </AppText>
                  </View>
                );
              })}
            </View>
          </Surface>

          {/* Top Category and Number Scanned */}
          <View className="flex-row gap-4">
            <Surface variant="secondary">
              <Icon name="pie-chart" size="lg" className="text-primary mb-1" />
              <AppText>TOP CATEGORY</AppText>
              <AppText className="font-sans-bold">DINING</AppText>
            </Surface>
            <Surface variant="secondary">
              <Icon name="file-text" size="lg" className="text-primary mb-1" />
              <AppText>SCANNED</AppText>
              <AppText className="font-sans-bold">42</AppText>
            </Surface>
          </View>

          {/* Recent History */}
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
        </View>
      </ScrollView>
    </Screen>
  );
}
