import { View, ScrollView } from "react-native";
import { Button, AppText } from "@/components/ui";
import { ReceiptThumbnailList } from "../ui/ReceiptThumbnailList";
import { cn } from "@/lib/cn";
import { ReceiptSection } from "@/lib/receiptGrouping";

interface HistoryContentProps {
  groupedReceipts: ReceiptSection[];
}

export function HistoryContent({ groupedReceipts }: HistoryContentProps) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="w-full px-2">
      {groupedReceipts.map((section, index) => {
        const verticalPadding = index === 0 ? "pb-4" : "py-4";
        return (
          <View key={section.title}>
            <View
              className={cn(
                "flex-row items-end justify-between",
                verticalPadding,
              )}
            >
              <AppText variant="h3">{section.title}</AppText>
              {/*<AppText variant="muted">{section.date}</AppText>*/}
            </View>

            <ReceiptThumbnailList receipts={section.receipts} />
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
