import { View, ScrollView } from "react-native";
import { Button, AppText, ReceiptThumbnail } from "@/components/ui";

export function HistoryContent() {
  const historyItems = [
    {
      period: "Today",
      date: "APR 03, 2026",
      itemIds: ["today-1", "today-2"],
    },
    {
      period: "Yesterday",
      date: "APR 02, 2026",
      itemIds: ["yesterday-1", "yesterday-2", "yesterday-3"],
    },
    {
      period: "Last Week",
      date: "MAR 27, 2026",
      itemIds: [
        "lastweek-1",
        "lastweek-2",
        "lastweek-3",
        "lastweek-4",
        "lastweek-5",
        "lastweek-6",
        "lastweek-7",
      ],
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="w-full px-2">
      <View>
        <View className="flex-row items-end justify-between pb-4">
          <AppText variant="h3">{historyItems[0].period}</AppText>
          <AppText variant="muted">{historyItems[0].date}</AppText>
        </View>

        <View className="gap-4">
          {historyItems[0].itemIds.map((itemId) => (
            <ReceiptThumbnail key={itemId} receiptId={itemId} />
          ))}
        </View>
      </View>

      {historyItems.slice(1).map((item) => (
        <View key={item.date}>
          <View className="flex-row items-end justify-between py-4">
            <AppText variant="h3">{item.period}</AppText>
            <AppText variant="muted">{item.date}</AppText>
          </View>
          <View className="gap-4">
            {item.itemIds.map((itemId) => (
              <ReceiptThumbnail key={itemId} receiptId={itemId} />
            ))}
          </View>
        </View>
      ))}

      <Button
        variant="secondary"
        className="w-2/3 self-center m-6"
        label="LOAD MORE"
      />
    </ScrollView>
  );
}
