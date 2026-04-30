import { Surface, Icon, AppText } from "@/components/ui";
import { useDashboardStats } from "@/hooks/dashboard/useDashboardStats";
import { getCategory } from "@/lib/categories";

export function TopCategory() {
  const { topCategoryId } = useDashboardStats();
  const categoryLabel = topCategoryId
    ? getCategory(topCategoryId).label
    : "NONE";

  return (
    <Surface variant="secondary" className="flex-1">
      <Icon name="pie-chart" size="lg" className="text-primary mb-1" />
      <AppText>TOP CATEGORY</AppText>
      <AppText className="font-sans-bold">{categoryLabel}</AppText>
    </Surface>
  );
}
