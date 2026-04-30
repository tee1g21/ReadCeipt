import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { Surface } from "./Surface";
import { AppText } from "./AppText";
import { getCategory } from "@/lib/categories";
import { CategoryIcon } from "./CategoryIcon";
import type { Receipt } from "@/db/schema";
import { formatReceiptThumbnailTimeStamp } from "@/lib/dateFormatter";
import { formatCurrency } from "@/lib/formatCurrency";

interface ReceiptPreviewProps {
  receipt: Receipt;
}

export function ReceiptThumbnail({ receipt }: ReceiptPreviewProps) {
  const router = useRouter();

  const category = getCategory(receipt.categoryId);

  return (
    <Pressable
      className="flex-row justify-between active:scale-95 active:opacity-80 transition-all"
      onPress={() => router.push(`/${receipt.id}`)}
    >
      <View className="flex-1 flex-row gap-3">
        <Surface
          variant="secondary"
          className="flex-none p-0 w-14 h-14 items-center justify-center"
        >
          <CategoryIcon
            categoryId={category.id}
            size="lg"
            className="text-primary"
          />
        </Surface>
        <View className="flex-1 mr-2">
          <AppText
            variant="body"
            className="font-sans-bold"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {receipt.merchant}
          </AppText>
          <AppText>
            {formatReceiptThumbnailTimeStamp(receipt.dateTimestamp)}
          </AppText>
        </View>
      </View>

      <View className="items-end">
        <AppText variant="body" className="font-sans-bold pr-1">
          {formatCurrency(receipt.totalAmount)}
        </AppText>
        <Surface variant="secondary" className="justify-center px-2 py-0">
          <AppText variant="muted" className="text-xs">
            {category.label}
          </AppText>
        </Surface>
      </View>
    </Pressable>
  );
}
