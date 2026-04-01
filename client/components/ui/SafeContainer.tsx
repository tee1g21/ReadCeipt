import { Platform, View, type ViewProps } from "react-native";
import {
  SafeAreaView,
  type Edge,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

export interface SafeContainerProps extends ViewProps {
  edges?: Edge[];
  mode?: SafeAreaViewProps["mode"];
}

export function SafeContainer({
  className,
  edges,
  mode,
  ...props
}: SafeContainerProps) {
  if (Platform.OS === "web") {
    return <View className={className} {...props} />;
  }

  return (
    <SafeAreaView className={className} edges={edges} mode={mode} {...props} />
  );
}
