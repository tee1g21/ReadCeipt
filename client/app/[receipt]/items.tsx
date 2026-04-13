import { ItemsCard } from "@/components/receipt-detail-screen/items/ItemsCard";
import { Screen } from "@/components/ui";

export default function MaximisedItemsScreen() {
  return (
    <Screen className="px-4 py-2">
      <ItemsCard expanded />
    </Screen>
  );
}
