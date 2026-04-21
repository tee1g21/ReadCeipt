import { Surface, Icon, AppText } from "@/components/ui";
import { useDashboardStats } from "@/hooks/dashboard/useDashboardStats";

export function NumberScanned() {
  const { totalScanned } = useDashboardStats();

  return (
    <Surface variant="secondary" className="flex-1">
      <Icon name="file-text" size="lg" className="text-primary mb-1" />
      <AppText>SCANNED</AppText>
      <AppText className="font-sans-bold">{totalScanned}</AppText>
    </Surface>
  );
}
