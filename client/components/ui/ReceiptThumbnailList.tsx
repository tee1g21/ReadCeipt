import { View } from "react-native";
import { ReceiptThumbnail } from "./ReceiptThumbnail";
import { Receipt } from "@/db/schema";

interface ReceiptThumbnailListProps {
  receipts: Receipt[];
}

export function ReceiptThumbnailList({ receipts }: ReceiptThumbnailListProps) {
  return (
    <View className="gap-4">
      {receipts.map((receipt) => (
        <ReceiptThumbnail key={receipt.id} receipt={receipt} />
      ))}
    </View>
  );
}
