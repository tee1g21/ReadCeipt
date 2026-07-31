import { View, Image, Alert } from "react-native";
import {
  Button,
  SafeContainer,
  Icon,
  NavBottomGradient,
} from "@/components/ui";
import { router } from "expo-router";
import { useScanReceipt } from "@/hooks/useScanReceipt";

interface ConfirmImageProps {
  capturedImage: { uri: string; base64?: string };
  setCapturedImage: React.Dispatch<
    React.SetStateAction<{ uri: string; base64?: string } | null>
  >;
}

export function ConfirmImage({
  capturedImage,
  setCapturedImage,
}: ConfirmImageProps) {
  const { scanReceipt, isLoading, error } = useScanReceipt();

  const processReceipt = async () => {
    const result = await scanReceipt(capturedImage);

    if (result) {
      // Success - navigate to receipt detail
      router.push({
        pathname: "/[receiptId]",
        params: { receiptId: result.receiptId, from: "scan" },
      });
    } else {
      // Error - show alert and reset to camera
      Alert.alert("Failed to Process Receipt", error || "Please try again.", [
        {
          text: "OK",
          onPress: () => setCapturedImage(null), // Back to camera
        },
      ]);
    }
  };

  return (
    <View className="flex-1 bg-black relative">
      {/* Full screen static image preview */}
      <Image
        source={{ uri: capturedImage.uri }}
        className="flex-1"
        resizeMode="cover"
      />

      <NavBottomGradient />

      {/* Review Controls Overlay */}
      <SafeContainer
        className="absolute inset-0 z-10 justify-end px-8 py-10"
        pointerEvents="box-none"
      >
        <View className="flex-row justify-between items-center px-4">
          <Button
            variant="secondary"
            label="Retake"
            onPress={() => setCapturedImage(null)}
            disabled={isLoading}
          />

          <Button
            variant="primary"
            label={isLoading ? "Loading" : "Confirm"}
            icon={isLoading ? <Icon name="loader" /> : <Icon name="check" />}
            onPress={processReceipt}
            disabled={isLoading}
          />
        </View>
      </SafeContainer>
    </View>
  );
}
