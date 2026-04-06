import { SafeContainer, type SafeContainerProps } from "./SafeContainer";
import { cn } from "@/lib/cn";

export function Screen({ className, edges, ...props }: SafeContainerProps) {
  return (
    <SafeContainer
      className={cn("flex-1 bg-background w-full", className)}
      edges={edges}
      {...props}
    />
  );
}
