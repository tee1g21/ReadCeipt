import { Surface, Icon, AppText } from "@/components/ui";

export function TopCategory() {
  return (
    <Surface variant="secondary" className="flex-1">
      <Icon name="pie-chart" size="lg" className="text-primary mb-1" />
      <AppText>TOP CATEGORY</AppText>
      <AppText className="font-sans-bold">DINING</AppText>
    </Surface>
  );
}
