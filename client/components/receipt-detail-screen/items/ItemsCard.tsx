import { AppText, Surface, Icon, Button } from "@/components/ui";
import { View, ScrollView, Platform } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { cn } from "@/lib/cn";

interface ItemsCardProps {
  expanded?: boolean;
}

export function ItemsCard({ expanded }: ItemsCardProps) {
  const { receiptId } = useLocalSearchParams<{ receiptId?: string }>();

  const lineItems = [
    {
      id: "1",
      name: "Flash Kitchen Spray with Sodium Peroxide ",
      quantity: 1,
      unitPrice: 2.5,
    },
    { id: "2", name: "BY JS Malted Milk", quantity: 2, unitPrice: 0.49 },
    { id: "3", name: "JS Medium Noodles", quantity: 1, unitPrice: 0.95 },
    { id: "4", name: "Wholemeal Bread", quantity: 2, unitPrice: 1.2 },
    { id: "5", name: "Semi-Skimmed Milk", quantity: 1, unitPrice: 1.5 },
    { id: "6", name: "Free Range Eggs", quantity: 1, unitPrice: 2.4 },
    { id: "7", name: "Bananas", quantity: 6, unitPrice: 0.18 },
    { id: "8", name: "Pink Lady Apples", quantity: 4, unitPrice: 0.35 },
    { id: "9", name: "Seedless Grapes", quantity: 1, unitPrice: 2.25 },
    { id: "10", name: "Baby Spinach 200g", quantity: 1, unitPrice: 1.1 },
    { id: "11", name: "Cucumber", quantity: 2, unitPrice: 0.75 },
    { id: "12", name: "Cherry Tomatoes 250g", quantity: 1, unitPrice: 1.6 },
    { id: "13", name: "Red Onions", quantity: 3, unitPrice: 0.28 },
    { id: "14", name: "Sweet Potatoes", quantity: 2, unitPrice: 0.85 },
    { id: "15", name: "Chicken Breast Fillets", quantity: 1, unitPrice: 4.8 },
    { id: "16", name: "Salmon Fillet", quantity: 2, unitPrice: 3.25 },
    { id: "17", name: "Greek Yogurt", quantity: 2, unitPrice: 1.35 },
    { id: "18", name: "Cheddar Cheese Block", quantity: 1, unitPrice: 2.95 },
    { id: "19", name: "Orange Juice 1L", quantity: 1, unitPrice: 1.75 },
    { id: "20", name: "Sparkling Water 6 Pack", quantity: 1, unitPrice: 3.4 },
    { id: "21", name: "Brown Rice 1kg", quantity: 1, unitPrice: 1.9 },
    { id: "22", name: "Penne Pasta", quantity: 2, unitPrice: 0.95 },
    { id: "23", name: "Olive Oil 500ml", quantity: 1, unitPrice: 4.5 },
    { id: "24", name: "Dark Chocolate 70%", quantity: 3, unitPrice: 1.2 },
  ];

  const handlePress = () => {
    if (!expanded) {
      router.push(`/${receiptId}/items`);
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
      className={cn("gap-4 w-full flex-none ", expanded || "shrink min-h-0")}
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
              {lineItems.length}
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
          {lineItems.map((item) => {
            const total = item.quantity * item.unitPrice;

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
                    {item.quantity} x £{item.unitPrice.toFixed(2)}
                  </AppText>
                </View>
                <AppText variant="h3" className="text-primary">
                  £{total.toFixed(2)}
                </AppText>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Surface>
  );
}
