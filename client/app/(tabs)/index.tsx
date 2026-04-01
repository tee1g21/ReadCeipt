import {
  Screen,
  Header,
  Surface,
} from "@/components/ui";
import { ScrollView, View } from "react-native";

export default function Dashboard() {
  return (
    <Screen className="items-center ">
      <ScrollView className="flex-1 bg-blu w-full">
        <Header />
        <View className="flex-1 w-full items-center px-4">
          <Surface className="w-full" />
        </View>
      </ScrollView>
    </Screen>
  );
}
