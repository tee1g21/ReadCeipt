import { Pressable, View } from "react-native";
import { Surface, AppText, Icon } from "@/components/ui";

export function ReceiptPreview() {
  return (
    <Pressable className="flex-row justify-between active:scale-95 active:opacity-80 transition-all">
      <View className=" flex-row gap-2">
        <Surface variant="secondary" className="flex-none">
          <Icon name="file-text" size="lg" className="text-primary" />
        </Surface>
        <View className="">
          <AppText variant="body" className="font-sans-bold">
            Whole Foods Market
          </AppText>
          <AppText>Today · 2:15 AM</AppText>
        </View>
      </View>

      <View className="items-end">
        <AppText variant="body" className="font-sans-bold pr-1">
          £142.67
        </AppText>
        <Surface variant="secondary" className="justify-center px-2 py-0">
          <AppText variant="muted" className="text-xs">
            GROCERIES
          </AppText>
        </Surface>
      </View>
    </Pressable>
  );
}
