import Feather from "@expo/vector-icons/Feather";
import { cssInterop } from "nativewind";

cssInterop(Feather, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

const ICON_SIZES = {
  sm: 16,
  default: 20,
  lg: 24,
  xl: 32,
};

type IconName = React.ComponentProps<typeof Feather>["name"];

interface IconProps {
  name: IconName;
  size?: keyof typeof ICON_SIZES;
  className?: string;
}

export function Icon({ name, size = "default", className }: IconProps) {
  return <Feather name={name} size={ICON_SIZES[size]} className={className} />;
}
