import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps } from "react-native";
import { cn } from "@/lib/cn";

export function Screen({ className, ...props }: ViewProps) {
  return (
    <SafeAreaView
      className={cn("flex-1 bg-background", className)}
      {...props}
    />
  );
}
