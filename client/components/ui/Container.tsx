import { cn } from "@/lib/cn";
import { View } from "react-native";

interface ContainerProps extends React.ComponentProps<typeof View> {
  className?: string;
}

export function Container({ className, ...props }: ContainerProps) {
  return <View className={cn("p-4", className)} {...props} />;
}
