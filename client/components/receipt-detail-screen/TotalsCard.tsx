import { View } from "react-native";
import { Surface, AppText } from "@/components/ui";

export function TotalsCard() {
  return (
    <Surface variant="secondary" className="m-4 mb-2 px-6 gap-2 flex-none">
      {/* Subtotal */}
      <View className="flex-row justify-between items-end">
        <AppText variant="muted">SUBTOTAL</AppText>
        <AppText variant="body" className="font-sans-bold">
          £5.84
        </AppText>
      </View>
      {/* Discounts */}
      <View className="flex-row justify-between items-end">
        <AppText variant="muted">DISCOUNTS</AppText>
        <AppText variant="body" className="text-success font-sans-bold">
          -£1.15
        </AppText>
      </View>
      {/* Total Amount */}
      <View className="flex-row justify-between items-end pt-4 mt-2 border-t border-muted">
        <AppText variant="h3">TOTAL</AppText>
        <AppText variant="h3" className="text-primary">
          £4.69
        </AppText>
      </View>
    </Surface>
  );
}
