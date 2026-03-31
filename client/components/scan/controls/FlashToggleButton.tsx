import { CameraButton } from "@/components/ui";
import { Dispatch, SetStateAction } from "react";

interface FlashToggleButtonProps {
  isTorchOn: boolean;
  setIsTorchOn: Dispatch<SetStateAction<boolean>>;
}

export function FlashToggleButton({
  isTorchOn,
  setIsTorchOn,
}: FlashToggleButtonProps) {
  return (
    <CameraButton
      iconName={isTorchOn ? "zap" : "zap-off"}
      onPress={() => setIsTorchOn((prev) => !prev)}
    />
  );
}
