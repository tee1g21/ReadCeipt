import { RefObject } from "react";
import { Button } from "@/components/ui";
import { CameraView } from "expo-camera";

interface ShutterButtonProps {
  cameraRef: RefObject<CameraView | null>;
  setCapturedImage: React.Dispatch<
    React.SetStateAction<{ uri: string; base64?: string } | null>
  >;
}
export function ShutterButton({
  cameraRef,
  setCapturedImage,
}: ShutterButtonProps) {
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.7,
        });

        if (photo) {
          setCapturedImage({ uri: photo.uri, base64: photo.base64 });
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-20 w-20 rounded-full bg-white border-4 border-primary/50 active:scale-90 transition-all"
      onPress={takePicture}
    />
  );
}
