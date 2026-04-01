import { View } from "react-native";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <View className={cn(className, "flex-row justify-between p-4 w-full")}>
      <Button
        variant="secondary"
        size="icon"
        icon={<Icon name="user" size="lg" />}
      />
      <Button
        variant="secondary"
        size="icon"
        icon={<Icon name="menu" size="lg" />}
      />
    </View>
  );
}
