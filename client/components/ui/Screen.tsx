import { SafeContainer } from "./SafeContainer";
import { ViewProps } from "react-native";
import { cn } from "@/lib/cn";

export function Screen({ className, ...props }: ViewProps) {
  return (
    <SafeContainer
      className={cn("flex-1 bg-background", className)}
      {...props}
    />
  );
}
