import { cn } from "@/lib/cn";
import { type VariantProps } from "class-variance-authority";
import { Pressable, type PressableProps } from "react-native";
import { surfaceVariants } from "./Surface";

interface PressableSurfaceProps
  extends PressableProps, VariantProps<typeof surfaceVariants> {
  className?: string;
}

export function PressableSurface({
  className,
  variant,
  ...props
}: PressableSurfaceProps) {
  return (
    <Pressable
      className={cn(
        surfaceVariants({ variant }),
        "active:scale-95 active:opacity-80 transition-all",
        className,
      )}
      {...props}
    />
  );
}
