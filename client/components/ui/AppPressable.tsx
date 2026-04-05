import { cn } from "@/lib/cn";
import { Pressable } from "react-native";

interface AppPressableProps extends React.ComponentProps<typeof Pressable> {
  className?: string;
}

export function AppPressable({ className, ...props }: AppPressableProps) {
  return (
    <Pressable
      className={cn("active:scale-95 active:opacity-80 transition-all", className)}
      {...props}
    />
  );
}
