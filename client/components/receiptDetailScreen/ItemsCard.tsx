import { AppText, Surface, Icon, Button } from "@/components/ui";
import { View, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import { cn } from "@/lib/cn";
import { Receipt } from "@/db/schema";
import { useReceiptDetailScreen } from "@/hooks/receiptDetailScreen/useReceiptDetailScreen";
import { formatCurrency } from "@/lib/currencyFormatter";

interface ItemsCardProps {
  expanded?: boolean;
  receipt: Receipt;
}

export function ItemsCard({ expanded, receipt }: ItemsCardProps) {
  const { items } = useReceiptDetailScreen(receipt.id);

  const handlePress = () => {
    if (!expanded) {
      router.push(`/${receipt.id}/items`);
    } else {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }
  };

  return (
    <Surface
      variant="primary"
      className={cn(
        "gap-4 w-full flex-none",
        expanded ? "h-full" : "shrink min-h-0",
      )}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center w-full">
        <View className="flex-row gap-3 items-center">
          <AppText variant="h3" className="">
            Items
          </AppText>
          <Surface
            variant="secondary"
            className="justify-center p-0 flex-none px-3 h-12 items-center"
          >
            <AppText variant="body" className="font-sans-bold">
              {items.length}
            </AppText>
          </Surface>
        </View>
        <Button
          variant="secondary"
          size="icon"
          onPress={handlePress}
          icon={
            <Icon name={expanded ? "minimize-2" : "maximize-2"} className="" />
          }
        />
      </View>

      {/* Items */}
      <ScrollView
        className="min-h-0"
        showsVerticalScrollIndicator={Platform.OS === "web" ? false : true}
      >
        <View className="gap-2 px-2 mr-1">
          {items.map((item) => {
            return (
              <View
                key={item.id}
                className="flex-row justify-between items-start"
              >
                <View className="flex-1 min-w-0 pr-4">
                  <AppText
                    variant="body"
                    className="font-sans-bold"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </AppText>
                  <AppText className="text-sm">
                    {item.quantity} x {formatCurrency(item.unitPrice)}
                  </AppText>
                </View>
                <AppText variant="h3" className="text-primary">
                  {formatCurrency(item.totalPrice)}
                </AppText>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Surface>
  );
}
