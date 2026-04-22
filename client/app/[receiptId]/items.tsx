import { ItemsCard } from "@/components/receiptDetailScreen/ItemsCard";
import { AppText, Screen, Surface } from "@/components/ui";
import { useLocalSearchParams } from "expo-router";
import { useReceiptDetailScreen } from "@/hooks/receiptDetailScreen/useReceiptDetailScreen";

export default function MaximisedItemsScreen() {
  const { receiptId } = useLocalSearchParams<{ receiptId: string }>();
  const { receipt } = useReceiptDetailScreen(receiptId || "");

  return (
    <Screen className="px-4 py-2">
      {receipt ? (
        <ItemsCard expanded receipt={receipt} />
      ) : (
        <Surface
          variant="primary"
          className="w-full h-full items-center justify-center"
        >
          <AppText variant="h3">Loading ...</AppText>
        </Surface>
      )}
    </Screen>
  );
}
