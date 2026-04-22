import { PressableSurface, AppText, Icon } from "@/components/ui";
import { View } from "react-native";
import { Receipt } from "@/db/schema";
import { formatReceiptDetailTimeStamp } from "@/lib/dateFormatter";

interface DateTimeMerchantAddressCardProps {
  receipt: Receipt;
}

export function DateTimeMerchantAddressCard({
  receipt,
}: DateTimeMerchantAddressCardProps) {
  return (
    <PressableSurface className="flex-none flex-row gap-4">
      <View className="flex-1 min-w-0">
        <AppText variant="body">
          {formatReceiptDetailTimeStamp(receipt.dateTimestamp)}
        </AppText>

        <AppText
          variant="h1"
          className="text-primary mb-2 text-3xl"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {receipt.merchant}
        </AppText>
        <View className="flex-row items-start gap-2 min-w-0">
          <Icon
            name="map-pin"
            size="sm"
            className="text-muted mt-0.5 shrink-0"
          />
          <AppText
            variant="muted"
            className="flex-1 shrink"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {receipt.address}
          </AppText>
        </View>
      </View>
    </PressableSurface>
  );
}
