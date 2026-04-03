import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { View } from "react-native";

const surfaceVariants = cva("rounded-2xl flex-1 p-4", {
  variants: {
    variant: {
      primary: "bg-surface drop-shadow-sm",
      secondary: "bg-secondary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface SurfaceProps
  extends
    React.ComponentProps<typeof View>,
    VariantProps<typeof surfaceVariants> {
  className?: string;
}

export function Surface({ className, variant, ...props }: SurfaceProps) {
  return (
    <View className={cn(surfaceVariants({ variant }), className)} {...props} />
  );
}
