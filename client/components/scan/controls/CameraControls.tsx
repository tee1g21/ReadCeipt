import { Dispatch, SetStateAction, RefObject } from "react";
import { View } from "react-native";
import { cn } from "@/lib/cn";
import { CameraView } from "expo-camera";
import {
  GalleryButton,
  ShutterButton,
  FlashToggleButton,
} from "@/components/scan/controls";

interface CameraControlsProps {
  className?: string;
  cameraRef: RefObject<CameraView | null>;
  isTorchOn: boolean;
  setIsTorchOn: Dispatch<SetStateAction<boolean>>;
  setCapturedImage: React.Dispatch<
    React.SetStateAction<{ uri: string; base64?: string } | null>
  >;
}

export function CameraControls({
  className,
  cameraRef,
  isTorchOn,
  setIsTorchOn,
  setCapturedImage,
}: CameraControlsProps) {
  return (
    <View className={cn("flex-row justify-between items-center ", className)}>
      <GalleryButton setCapturedImage={setCapturedImage} />

      <ShutterButton
        cameraRef={cameraRef}
        setCapturedImage={setCapturedImage}
      />

      <FlashToggleButton isTorchOn={isTorchOn} setIsTorchOn={setIsTorchOn} />
    </View>
  );
}
