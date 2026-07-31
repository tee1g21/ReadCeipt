import { Screen, Header } from "@/components/ui";
import { View, BackHandler, Alert } from "react-native";
import { ImagePreview } from "@/components/receiptDetailScreen/ImagePreview";
import { DateTimeMerchantAddressCard } from "@/components/receiptDetailScreen/DateTimeMerchantAddressCard";
import { CategorySelector } from "@/components/receiptDetailScreen/CategorySelector";
import { TotalsCard } from "@/components/receiptDetailScreen/TotalsCard";
import { ItemsCard } from "@/components/receiptDetailScreen/ItemsCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useReceiptDetailScreen } from "@/hooks/receiptDetailScreen/useReceiptDetailScreen";
import { markReceiptAsViewed, deleteReceipt } from "@/db/queries/receipts";
import { useCallback, useEffect } from "react";

export default function ReceiptDetailScreen() {
  const { receiptId, from } = useLocalSearchParams<{
    receiptId: string;
    from?: string;
  }>();
  const { receipt } = useReceiptDetailScreen(receiptId || "");
  const router = useRouter();

  useEffect(() => {
    if (receipt) {
      markReceiptAsViewed(receipt.id);
    }
  }, [receipt]);

  const handleBack = useCallback(() => {
    if (from === "scan") {
      // Came from scan flow → go to Scan tab
      router.push("/(tabs)/scan");
    } else {
      // Came from dashboard/history → go back normally
      router.back();
    }
  }, [from, router]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Delete Receipt",
      "Are you sure you want to delete this receipt?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: async () => {
            await deleteReceipt(receiptId || "");
            handleBack();
          },
          style: "destructive",
        },
      ],
    );
  }, [receiptId, handleBack]);

  useEffect(() => {
    const onHardwareBackPress = () => {
      handleBack();
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onHardwareBackPress,
    );

    return () => subscription.remove();
  }, [handleBack]);

  if (!receipt) {
    return (
      <Screen>
        <Header back title="Loading..." />
      </Screen>
    );
  }

  return (
    <Screen className="items-center">
      <View className="flex-1 w-full">
        <Header
          title="Receipt"
          rightAction={{ icon: "trash-2", onPress: handleDelete }}
          leftAction={{
            icon: "arrow-left",
            onPress: handleBack,
          }}
        />

        <View className="gap-4 px-4 flex-1 w-full">
          <View className="flex-row gap-4">
            <View className="w-3/12">
              <ImagePreview receipt={receipt} />
            </View>

            <View className="gap-4 flex-1">
              <DateTimeMerchantAddressCard receipt={receipt} />

              <CategorySelector receipt={receipt} />
            </View>
          </View>

          <ItemsCard receipt={receipt} />
        </View>
        <TotalsCard receipt={receipt} />
      </View>
    </Screen>
  );
}
