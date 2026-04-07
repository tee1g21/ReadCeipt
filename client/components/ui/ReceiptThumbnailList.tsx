import { View } from "react-native";
import { ReceiptThumbnail } from "./ReceiptThumbnail";

interface ReceiptThumbnailListProps {
  items: string[];
}

export function ReceiptThumbnailList({ items }: ReceiptThumbnailListProps) {
  return (
    <View className="gap-4">
      {items.map((itemId) => (
        <ReceiptThumbnail key={itemId} receiptId={itemId} />
      ))}
    </View>
  );
}
