import { View } from "react-native";
import { Container, AppText } from "@/components/ui";

export function CurrentMonthSpending() {
  return (
    <Container className="gap-1">
      <AppText variant="body">CURRENT MONTH SPENDING</AppText>
      <View className="flex-row">
        <AppText variant="h1" className="text-primary text-6xl">
          £3,842
        </AppText>
        <AppText variant="h1" className="text-muted pt-4 mt-0.5">
          .50
        </AppText>
      </View>
    </Container>
  );
}
