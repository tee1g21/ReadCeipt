import { cn } from "@/lib/cn";
import { View } from "react-native";

interface SurfaceProps extends React.ComponentProps<typeof View> {
  className?: string;
}

export function Surface({ className, ...props }: SurfaceProps) {
  return (
    <View
      className={cn(
        "bg-surface rounded-2xl shadow-md p-4 w-full min-h-24",
        className
      )}
      {...props}
    />
  );
}