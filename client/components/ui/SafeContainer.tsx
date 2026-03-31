import { Platform, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function SafeContainer({ className, ...props }: ViewProps) {
  const Container = Platform.OS === "web" ? View : SafeAreaView;

  return <Container className={className} {...props} />;
}
