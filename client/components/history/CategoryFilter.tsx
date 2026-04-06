import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui";

const receiptCategories = [
  { key: "all", label: "ALL RECEIPTS" },
  { key: "groceries", label: "GROCERIES" },
  { key: "dining", label: "DINING" },
  { key: "transport", label: "TRANSPORT" },
  { key: "utilities", label: "UTILITIES" },
  { key: "entertainment", label: "ENTERTAINMENT" },
  { key: "shopping", label: "SHOPPING" },
  { key: "health", label: "HEALTH" },
  { key: "travel", label: "TRAVEL" },
  { key: "subscriptions", label: "SUBSCRIPTIONS" },
] as const;

type ReceiptCategoryKey = (typeof receiptCategories)[number]["key"];

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] =
    useState<ReceiptCategoryKey>("all");
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [categoryLayouts, setCategoryLayouts] = useState<
    Partial<Record<ReceiptCategoryKey, { x: number; width: number }>>
  >({});
  const categoryScrollRef = useRef<ScrollView>(null);

  const handleSelectCategory = (key: ReceiptCategoryKey) => {
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
          key={category.key}
          onLayout={(event) => {
            const { x, width } = event.nativeEvent.layout;

            setCategoryLayouts((prev) => ({
              ...prev,
              [category.key]: { x, width },
            }));
          }}
        >
          <Button
            variant={
              selectedCategory === category.key ? "primary" : "secondary"
            }
            size="sm"
            label={category.label}
            onPress={() => handleSelectCategory(category.key)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
