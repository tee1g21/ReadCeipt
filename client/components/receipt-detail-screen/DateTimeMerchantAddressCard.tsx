import { PressableSurface, AppText, Icon } from "@/components/ui";
import { View } from "react-native";

export function DateTimeMerchantAddressCard() {
  return (
    <PressableSurface className="flex-none flex-row gap-4">
      <View className="flex-1 min-w-0">
        <AppText variant="body">APR 03, 2026 · 15:34 PM</AppText>

        <AppText
          variant="h1"
          className="text-primary mb-2 text-3xl"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Sainsbury&apos;s
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
            12 Curzon Rd, Sale M33 7SA
          </AppText>
        </View>
      </View>
    </PressableSurface>
  );
}
