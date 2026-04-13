import { PressableSurface, AppText, Icon } from "@/components/ui";
import { View } from "react-native";

export function CategorySelector() {
  return (
    <PressableSurface variant="secondary" className="flex-none">
      <View className="flex-row justify-between items-center">
        <AppText className="font-sans-bold">GROCERIES</AppText>
        <Icon name="chevron-down" className="text-primary" />
      </View>
    </PressableSurface>
  );
}
