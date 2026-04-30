import { View } from "react-native";
import { Surface, AppText } from "@/components/ui";
import { Receipt } from "@/db/schema";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/cn";

interface TotalsCardProps {
  receipt: Receipt;
}

export function TotalsCard({ receipt }: TotalsCardProps) {
  return (
    <Surface variant="secondary" className="m-4 mb-2 px-6 gap-2 flex-none">
      {/* Subtotal */}
      <View className="flex-row justify-between items-end">
        <AppText variant="muted">SUBTOTAL</AppText>
        <AppText variant="body" className="font-sans-bold">
          {formatCurrency(receipt.subtotal)}
        </AppText>
      </View>
      {/* Discounts */}
      <View className="flex-row justify-between items-end">
        <AppText variant="muted">DISCOUNTS</AppText>
        <AppText
          variant="body"
          className={cn(
            "font-sans-bold",
            receipt.discounts ? "text-success" : "text-muted",
          )}
        >
          {!receipt.discounts || "-"}
          {formatCurrency(receipt.discounts || 0)}
        </AppText>
      </View>
      {/* Total Amount */}
      <View className="flex-row justify-between items-end pt-4 mt-2 border-t border-muted">
        <AppText variant="h3">TOTAL</AppText>
        <AppText variant="h3" className="text-primary">
          {formatCurrency(receipt.totalAmount)}
        </AppText>
      </View>
    </Surface>
  );
}
