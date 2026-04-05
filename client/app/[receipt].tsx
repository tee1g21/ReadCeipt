import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Screen,
  AppText,
  Header,
  Surface,
  Icon,
  Button,
} from "@/components/ui";
import { View, ScrollView, Modal, Pressable, Platform } from "react-native";
import { Image } from "expo-image";

export default function ReceiptDetailPage() {
  useLocalSearchParams<{ receipt?: string }>();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
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
    { id: "6", name: "Free Range Eggs", quantity: 3, unitPrice: 2.4 },
  ];

  return (
    <Screen className="items-center">
      <View className="flex-1 w-full">
        <Header
          back
          title="Review Receipt"
          rightAction={{ icon: "edit-2", onPress: () => {} }}
        />
        {/* <ScrollView
          className="flex-1 w-full"
          showsVerticalScrollIndicator={false}
        > */}
        <View className="gap-4 px-4 pb-4 flex-1 w-full">
          {/* Top Card */}
          <Surface className="flex-none flex-row items-stretch gap-2 ">
            <View className="w-1/3 self-stretch">
              <View className="relative flex-1 rounded-xl overflow-hidden border-2 border-secondary">
                <Image
                  source={require("@/assets/images/receipt-example.jpg")}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  transition={200}
                  accessibilityLabel="Receipt image"
                />

                <Button
                  variant="secondary"
                  size="icon"
                  icon={<Icon name="maximize" size="sm" />}
                  className="absolute bottom-2 right-2 w-7 h-7"
                  onPress={() => setIsImageModalOpen(true)}
                >
                  <Icon name="search" />
                </Button>
              </View>
            </View>
            <View className="flex-1 min-w-0 px-2">
              <View className="pb-4 ">
                <AppText variant="body">MERCHANT</AppText>
                <AppText
                  variant="h1"
                  className="text-primary mb-1"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  Sainsbury&apos;s
                </AppText>
                <View className="flex-row items-start gap-2 min-w-0">
                  <Icon
                    name="map-pin"
                    size="sm"
                    className="text-muted mt-0.5 shrink-0"
                  />
                  <AppText
                    variant="muted"
                    className="flex-1 shrink"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    12 Curzon Rd, Sale M33 7SA
                  </AppText>
                </View>
              </View>
              <View className="mt-2 border-t-2 border-muted flex-row justify-between pt-4 items-end ">
                <AppText variant="h3">TOTAL</AppText>
                <AppText variant="h2" className="text-primary">
                  £104.69
                </AppText>
              </View>
            </View>
          </Surface>

          {/* Maximise image modal */}
          <Modal
            visible={isImageModalOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setIsImageModalOpen(false)}
          >
            <Pressable
              className="flex-1 bg-black/80 items-center justify-center px-4"
              onPress={() => setIsImageModalOpen(false)}
            >
              <Image
                source={require("@/assets/images/receipt-example.jpg")}
                style={{ width: "100%", height: "85%" }}
                contentFit="contain"
                transition={200}
                accessibilityLabel="Receipt image enlarged"
              />
            </Pressable>
          </Modal>

          {/* Date and Category */}
          <Surface variant="secondary" className="flex-none gap-6">
            <View className="flex-row justify-between items-center">
              <AppText>TRANSACTION DATE</AppText>
              <View className="flex-row gap-4 items-center">
                <AppText className="font-sans-bold">APR 03, 2026</AppText>
                <Icon name="calendar" className="text-primary" />
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <AppText>CATEGORY</AppText>
              <View className="flex-row gap-4 items-center">
                <AppText className="font-sans-bold">GROCERIES</AppText>
                <Icon name="chevron-down" className="text-primary" />
              </View>
            </View>
          </Surface>

          {/* Item list */}
          <Surface variant="secondary" className="gap-4 w-full flex-1 min-h-0">
            <View className="flex-row justify-between items-center w-full">
              <View className="flex-row gap-3 items-center">
                <AppText variant="h3" className="">
                  Items
                </AppText>
                <Surface
                  variant="primary"
                  className="justify-center p-0 flex-none px-3 py-1 items-center"
                >
                  <AppText variant="body" className="font-sans-bold">
                    {lineItems.length}
                  </AppText>
                </Surface>
              </View>
              <Icon name="chevron-down" className="text-primary" />
            </View>

            <ScrollView
              className="flex-1 min-h-0"
              showsVerticalScrollIndicator={
                Platform.OS === "web" ? false : true
              }
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

          {/* Totals */}

          <Surface variant="secondary" className="gap-2 flex-none">
            <View className="flex-row justify-between items-end">
              <AppText variant="muted">SUBTOTAL</AppText>
              <AppText variant="body" className="font-sans-bold">
                £5.84
              </AppText>
            </View>
            <View className="flex-row justify-between items-end">
              <AppText variant="muted">DISCOUNTS</AppText>
              <AppText variant="body" className="text-success font-sans-bold">
                -£1.15
              </AppText>
            </View>
            <View className="flex-row justify-between"></View>
            <View className="flex-row justify-between items-end pt-4 border-t border-muted">
              <AppText variant="h3">Total Amount</AppText>
              <AppText variant="h3" className="text-primary">
                £4.69
              </AppText>
            </View>
          </Surface>
        </View>
        {/* </ScrollView> */}
      </View>
    </Screen>
  );
}
