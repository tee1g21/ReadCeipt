import { useCameraPermissions } from "expo-camera";
import { Screen, Button, AppText } from "@/components/ui";
import ScanInterface from "@/components/scan/ScanInterface";
import { useState } from "react";
import { ConfirmImage } from "@/components/scan/ConfirmImage";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<{
    uri: string;
    base64?: string;
  } | null>(null);

  if (!permission) {
    return (
      <Screen className="items-center justify-center bg-black-900">
        <AppText variant="h2" className="text-secondary">
          Loading camera...
        </AppText>
      </Screen>
    );
  }

  if (!permission.granted) {
    return (
      <Screen className="items-center justify-center p-6 gap-y-4">
        <AppText variant="h2" align="center">
          Camera Access Required
        </AppText>
        <AppText align="center" className="mb-4">
          ReadCeipt needs access to your camera so you can scan your receipts.
        </AppText>

        <Button
          variant="primary"
          label="Grant Permission"
          onPress={requestPermission}
        />
      </Screen>
    );
  }

  if (capturedImage) {
    return (
      <ConfirmImage
        capturedImage={capturedImage}
        setCapturedImage={setCapturedImage}
      />
    );
  }

  return <ScanInterface setCapturedImage={setCapturedImage} />;
}
