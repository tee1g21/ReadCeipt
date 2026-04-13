import { Screen, Header } from "@/components/ui";
import { View } from "react-native";
import { ImagePreview } from "@/components/receipt-detail-screen/ImagePreview";
import { DateTimeMerchantAddressCard } from "@/components/receipt-detail-screen/DateTimeMerchantAddressCard";
import { CategorySelector } from "@/components/receipt-detail-screen/CategorySelector";
import { TotalsCard } from "@/components/receipt-detail-screen/TotalsCard";
import { ItemsCard } from "@/components/receipt-detail-screen/items/ItemsCard";

export default function ReceiptDetailScreen() {
  return (
    <Screen className="items-center">
      <View className="flex-1 w-full">
        <Header
          back
          title="Review Receipt Test"
          rightAction={{ icon: "edit-2", onPress: () => {} }}
        />

        <View className="gap-4 px-4 flex-1 w-full">
          <View className="flex-row gap-4">
            <View className="w-3/12">
              <ImagePreview />
            </View>

            <View className="gap-4 flex-1">
              <DateTimeMerchantAddressCard />

              <CategorySelector />
            </View>
          </View>

          <ItemsCard />
        </View>
        <TotalsCard />
      </View>
    </Screen>
  );
}
