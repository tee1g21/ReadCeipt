import { CategoryFilter } from "@/components/History/CategoryFilter";
import {
  Screen,
  Header,
  SearchBar,
  Button,
  AppText,
  ReceiptPreview,
} from "@/components/ui";
import { ScrollView, View } from "react-native";

export default function History() {
  return (
    <Screen className="items-center">
      <View className="flex-1 w-full ">
        <Header />
        <View className="flex-1 gap-4 px-4 ">
          <SearchBar />
          <CategoryFilter />

          <ScrollView showsVerticalScrollIndicator={false} className="w-full">
            <View>
              <View className="flex-row items-end justify-between py-4">
                <AppText variant="h3">Today</AppText>
                <AppText variant="muted">APR 03, 2026</AppText>
              </View>
              <View className="gap-4">
                <ReceiptPreview />
                <ReceiptPreview />
              </View>
            </View>

            <View>
              <View className="flex-row items-end justify-between py-4">
                <AppText variant="h3">Yesterday</AppText>
                <AppText variant="muted">APR 02, 2026</AppText>
              </View>
              <View className="gap-4">
                <ReceiptPreview />
                <ReceiptPreview />
                <ReceiptPreview />
              </View>
            </View>

            <View>
              <View className="flex-row items-end justify-between py-4">
                <AppText variant="h3">Last Week</AppText>
                <AppText variant="muted">MAR 27, 2026</AppText>
              </View>
              <View className="gap-4">
                <ReceiptPreview />
                <ReceiptPreview />
                <ReceiptPreview />
                <ReceiptPreview />
                <ReceiptPreview />
                <ReceiptPreview />
                <ReceiptPreview />
              </View>
            </View>

            <Button
              variant="secondary"
              className="w-2/3 self-center m-6"
              label="LOAD MORE"
            />
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
}
