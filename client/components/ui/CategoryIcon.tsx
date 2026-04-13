import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
import { getCategory, CategoryId } from "@/context/useCategories";
import { cn } from "@/lib";

cssInterop(Ionicons, {
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

interface CategoryIconProps {
  categoryId: CategoryId | string | null | undefined;
  size?: keyof typeof ICON_SIZES;
  className?: string;
}

export function CategoryIcon({
  categoryId,
  size = "default",
  className,
}: CategoryIconProps) {
  const category = getCategory(categoryId);

  return (
    <Ionicons
      name={category.iconName}
      size={ICON_SIZES[size]}
      className={cn("text-primary", { className })}
    />
  );
}
