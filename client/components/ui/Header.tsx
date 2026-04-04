import { View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "./Button";
import { Icon, type IconName } from "./Icon";
import { AppText } from "./AppText";
import { cn } from "@/lib/cn";

interface HeaderAction {
  icon: IconName;
  onPress: () => void;
}

interface HeaderProps {
  className?: string;
  title?: string;
  back?: boolean;
  leftAction?: HeaderAction | null;
  rightAction?: HeaderAction | null;
}

export function Header({
  className,
  title,
  back = false,
  leftAction,
  rightAction,
}: HeaderProps) {
  const router = useRouter();

  const mainLeftAction: HeaderAction = {
    icon: "user",
    onPress: () => {},
  };

  const mainRightAction: HeaderAction = {
    icon: "menu",
    onPress: () => {},
  };

  const backAction: HeaderAction = {
    icon: "arrow-left",
    onPress: () => router.back(),
  };

  const defaultActions = back
    ? { left: backAction, right: null as HeaderAction | null }
    : { left: mainLeftAction, right: mainRightAction };

  const resolvedLeftAction =
    leftAction !== undefined ? leftAction : defaultActions.left;
  const resolvedRightAction =
    rightAction !== undefined ? rightAction : defaultActions.right;

  const renderAction = (action?: HeaderAction | null) => {
    if (!action) return null;

    return (
      <Button
        variant="secondary"
        size="icon"
        icon={<Icon name={action.icon} size="lg" />}
        onPress={action.onPress}
      />
    );
  };

  return (
    <View
      className={cn(className, "relative flex-row justify-between items-center p-4 w-full")}
    >
      {renderAction(resolvedLeftAction)}
      {title ? <AppText variant="h3" className="mt-2">{title}</AppText> : null}
      {renderAction(resolvedRightAction)}
    </View>
  );
}
