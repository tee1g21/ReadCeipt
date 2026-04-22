import { Screen, Header } from "@/components/ui";
import { View } from "react-native";
import { ImagePreview } from "@/components/receiptDetailScreen/ImagePreview";
import { DateTimeMerchantAddressCard } from "@/components/receiptDetailScreen/DateTimeMerchantAddressCard";
import { CategorySelector } from "@/components/receiptDetailScreen/CategorySelector";
import { TotalsCard } from "@/components/receiptDetailScreen/TotalsCard";
import { ItemsCard } from "@/components/receiptDetailScreen/ItemsCard";
import { useLocalSearchParams } from "expo-router";
import { useReceiptDetailScreen } from "@/hooks/receiptDetailScreen/useReceiptDetailScreen";
import { markReceiptAsViewed } from "@/db/queries/receipts";
import { useEffect } from "react";

export default function ReceiptDetailScreen() {
  const { receiptId } = useLocalSearchParams<{ receiptId: string }>();
  const { receipt } = useReceiptDetailScreen(receiptId || "");

  useEffect(() => {
    if (receipt) {
      markReceiptAsViewed(receipt.id);
    }
  }, [receipt]);

  if (!receipt) {
    return (
      <Screen>
        <Header back title="Loading..." />
      </Screen>
    );
  }

  return (
    <Screen className="items-center">
      <View className="flex-1 w-full">
        <Header
          back
          title="Receipt"
          // rightAction={{ icon: "edit-2", onPress: () => {} }}
        />

        <View className="gap-4 px-4 flex-1 w-full">
          <View className="flex-row gap-4">
            <View className="w-3/12">
              <ImagePreview />
            </View>

            <View className="gap-4 flex-1">
              <DateTimeMerchantAddressCard receipt={receipt} />

              <CategorySelector receipt={receipt} />
            </View>
          </View>

          <ItemsCard receipt={receipt} />
        </View>
        <TotalsCard receipt={receipt} />
      </View>
    </Screen>
  );
}
