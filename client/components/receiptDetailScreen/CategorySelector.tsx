import { PressableSurface, AppText, CategoryIcon } from "@/components/ui";
import { Receipt } from "@/db/schema";
import { View } from "react-native";
import { getCategory } from "@/context/useCategories";

interface CategorySelectorProps {
  receipt: Receipt;
}

export function CategorySelector({ receipt }: CategorySelectorProps) {
  const category = getCategory(receipt.categoryId);

  return (
    <PressableSurface variant="secondary" className="flex-none">
      <View className="flex-row justify-between items-center">
        <AppText className="font-sans-bold">{category.label}</AppText>
        {/*<Icon name="chevron-down" className="text-primary" />*/}
        <CategoryIcon categoryId={category.id} />
      </View>
    </PressableSurface>
  );
}
