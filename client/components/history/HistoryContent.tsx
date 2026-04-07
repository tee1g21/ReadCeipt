import { View, ScrollView } from "react-native";
import { Button, AppText } from "@/components/ui";
import { ReceiptThumbnailList } from "../ui/ReceiptThumbnailList";
import { cn } from "@/lib/cn";

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
      {historyItems.map((item, index) => {
        const verticalPadding = index === 0 ? "pb-4" : "py-4";
        return (
          <View key={item.date}>
            <View
              className={cn(
                "flex-row items-end justify-between",
                verticalPadding,
              )}
            >
              <AppText variant="h3">{item.period}</AppText>
              <AppText variant="muted">{item.date}</AppText>
            </View>

            <ReceiptThumbnailList items={item.itemIds} />
          </View>
        );
      })}

      <Button
        variant="secondary"
        className="w-2/3 self-center m-6"
        label="LOAD MORE"
      />
    </ScrollView>
  );
}
