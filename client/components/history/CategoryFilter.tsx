import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui";
import { type ReceiptCategoryId } from "@/app/(tabs)/history";
import { CATEGORY_LIST } from "@/context/useCategories";

const receiptCategories = [
  { id: "all", label: "ALL RECEIPTS" },
  ...CATEGORY_LIST.map((category) => ({
    id: category.id,
    label: category.label,
  })),
] as const;

interface CategoryFilterProps {
  selectedCategory: ReceiptCategoryId;
  setSelectedCategory: (key: ReceiptCategoryId) => void;
}

export function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [categoryLayouts, setCategoryLayouts] = useState<
    Partial<Record<ReceiptCategoryId, { x: number; width: number }>>
  >({});
  const categoryScrollRef = useRef<ScrollView>(null);

  const handleSelectCategory = (key: ReceiptCategoryId) => {
    setSelectedCategory(key);

    const layout = categoryLayouts[key];
    if (!layout || scrollViewWidth <= 0) return;

    const centeredOffsetX = Math.max(
      0,
      layout.x + layout.width / 2 - scrollViewWidth / 2,
    );

    categoryScrollRef.current?.scrollTo({
      x: centeredOffsetX,
      animated: true,
    });
  };

  return (
    <ScrollView
      ref={categoryScrollRef}
      className="flex-none"
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={(event) => setScrollViewWidth(event.nativeEvent.layout.width)}
      contentContainerStyle={{ gap: 8 }}
      style={{ scrollbarWidth: "none" } as any}
    >
      {receiptCategories.map((category) => (
        <View
          key={category.id}
          onLayout={(event) => {
            const { x, width } = event.nativeEvent.layout;

            setCategoryLayouts((prev) => ({
              ...prev,
              [category.id]: { x, width },
            }));
          }}
        >
          <Button
            variant={selectedCategory === category.id ? "primary" : "secondary"}
            size="sm"
            label={category.label}
            onPress={() => handleSelectCategory(category.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
