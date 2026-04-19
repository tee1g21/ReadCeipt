import { View, SectionList } from "react-native";
import { AppText, ReceiptThumbnail } from "@/components/ui";
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
  const totalReceipts = groupedReceipts.reduce(
    (sum, section) => sum + section.data.length,
    0,
  );

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
          <View className="py-10 items-center justify-center">
            <AppText variant="muted">
              Showing all {totalReceipts} matching receipts
            </AppText>
          </View>
        ) : null
      }
      stickySectionHeadersEnabled={false}
    />
  );
}
