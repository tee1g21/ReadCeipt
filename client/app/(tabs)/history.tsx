import { Screen, Header, SearchBar } from "@/components/ui";
import { View } from "react-native";
import { CategoryFilter, HistoryContent } from "@/components/history";
import { useState } from "react";
import { useFocusEffect } from "expo-router";
import { useReceiptHistory } from "@/hooks/useReceiptHistory";
import { CATEGORY_LIST } from "@/lib/categories";

export type ReceiptCategoryId = "all" | (typeof CATEGORY_LIST)[number]["id"];

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ReceiptCategoryId>("all");

  const { groupedReceipts, refreshHistory } = useReceiptHistory({
    searchQuery,
    categoryId: selectedCategory === "all" ? undefined : selectedCategory,
  });

  useFocusEffect(() => {
    refreshHistory();
  });

  return (
    <Screen edges={["top", "left", "right"]}>
      <Header title="History" />

      <View className="flex-1 gap-4 px-4">
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <HistoryContent
          key={`${selectedCategory}-${searchQuery}`}
          groupedReceipts={groupedReceipts}
        />
      </View>
    </Screen>
  );
}
