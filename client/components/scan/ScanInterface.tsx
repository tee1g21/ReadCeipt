import { View, StyleSheet } from "react-native";
import { ReceiptReticle } from "./ReceiptReticle";
import { useState, useRef } from "react";
import { CameraView } from "expo-camera";
import { CameraControls } from "./controls/CameraControls";
import { SafeContainer, NavBottomGradient } from "@/components/ui";

interface ScanInterfaceProps {
  setCapturedImage: React.Dispatch<
    React.SetStateAction<{ uri: string; base64?: string } | null>
  >;
}

export default function ScanInterface({
  setCapturedImage,
}: ScanInterfaceProps) {
  const cameraRef = useRef<CameraView>(null);
  const [isTorchOn, setIsTorchOn] = useState(false);

  return (
    <View className="flex-1 bg-black">
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={isTorchOn}
      />

      <SafeContainer className="flex-1 justify-end px-8 pt-4 pb-10">
        <NavBottomGradient />

        <ReceiptReticle className="my-10 relative" />

        <CameraControls
          className="px-4"
          cameraRef={cameraRef}
          isTorchOn={isTorchOn}
          setIsTorchOn={setIsTorchOn}
          setCapturedImage={setCapturedImage}
        />
      </SafeContainer>
    </View>
  );
}
