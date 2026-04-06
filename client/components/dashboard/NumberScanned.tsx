import { Surface, Icon, AppText } from "@/components/ui";

export function NumberScanned() {
  return (
    <Surface variant="secondary" className="flex-1">
      <Icon name="file-text" size="lg" className="text-primary mb-1" />
      <AppText>SCANNED</AppText>
      <AppText className="font-sans-bold">42</AppText>
    </Surface>
  );
}
