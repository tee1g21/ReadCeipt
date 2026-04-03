import { SafeContainer, type SafeContainerProps } from "./SafeContainer";
import { cn } from "@/lib/cn";

export function Screen({ className, ...props }: SafeContainerProps) {
  return (
    <SafeContainer
      className={cn("flex-1 bg-background w-full", className)}
      {...props}
    />
  );
}
