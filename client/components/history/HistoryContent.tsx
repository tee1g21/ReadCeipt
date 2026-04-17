import { View, SectionList } from "react-native";
import { Button, AppText, ReceiptThumbnail } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ReceiptSection } from "@/lib/receiptGrouping";

interface HistoryContentProps {
  groupedReceipts: ReceiptSection[];
  onLoadMore?: () => void;
}

export function HistoryContent({
  groupedReceipts,
  onLoadMore,
}: HistoryContentProps) {
  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      className="w-full px-2"
      sections={groupedReceipts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReceiptThumbnail receipt={item} />}
      ItemSeparatorComponent={() => <View className="h-4" />}
      renderSectionHeader={({ section }) => {
        const isFirstSection = section === groupedReceipts[0];
        const verticalPadding = isFirstSection ? "pb-4" : "py-4";

        return (
          <View
            className={cn(
              "flex-row items-end justify-between",
              verticalPadding,
            )}
          >
            <AppText variant="h3">{section.title}</AppText>
            {/* <AppText variant="muted">{section.date}</AppText> */}
          </View>
        );
      }}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center pt-8">
          <AppText variant="muted" className="text-lg">
            No receipts found
          </AppText>
        </View>
      }
      ListFooterComponent={
        groupedReceipts.length > 0 ? (
          <Button
            variant="secondary"
            className="w-2/3 self-center m-6"
            label="LOAD MORE"
            onPress={onLoadMore}
          />
        ) : null
      }
      stickySectionHeadersEnabled={false}
    />
  );
}
