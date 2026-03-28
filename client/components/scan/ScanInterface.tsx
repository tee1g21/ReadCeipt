import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { ReceiptReticle } from "./ReceiptReticle";
import { useState, useRef } from "react";
import { CameraView } from "expo-camera";
import { CameraControls } from "./CameraControls";
import { SafeContainer } from "../ui/SafeContainer";

export default function ScanInterface() {
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
        <ReceiptReticle className="my-10 relative" />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.6)", "#000000"]}
          locations={[0, 0.6, 1]}
          className="absolute bottom-0 left-0 right-0 h-36 z-0"
          pointerEvents="none"
        />

        <CameraControls
          className="px-4"
          isTorchOn={isTorchOn}
          setIsTorchOn={setIsTorchOn}
        />
      </SafeContainer>
    </View>
  );
}
