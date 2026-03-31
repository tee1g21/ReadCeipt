import { Button, Icon, type IconName } from "@/components/ui";

interface CameraButtonProps {
  iconName: IconName;
  onPress?: React.ComponentProps<typeof Button>["onPress"];
}

export function CameraButton({ iconName, onPress }: CameraButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="bg-black/40 rounded-full"
      icon={<Icon name={iconName} className="text-white" />}
      onPress={onPress}
    />
  );
}
