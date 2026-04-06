import { Screen, Header, SearchBar } from "@/components/ui";
import { View } from "react-native";
import { CategoryFilter, HistoryContent } from "@/components/history";

export default function History() {
  return (
    <Screen>
      <Header title="History" />

      <View className="flex-1 gap-4 px-4 pb-4">
        <SearchBar />

        <CategoryFilter />

        <HistoryContent />
      </View>
    </Screen>
  );
}
