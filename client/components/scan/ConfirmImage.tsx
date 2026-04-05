import { View, Image } from "react-native";
import {
  Button,
  SafeContainer,
  Icon,
  NavBottomGradient,
} from "@/components/ui";

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
  const processReceipt = () => {
    console.log("Approved Image URI:", capturedImage?.uri);
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
          />

          <Button
            variant="primary"
            label="Confirm"
            icon={<Icon name="check" />}
            onPress={processReceipt}
          />
        </View>
      </SafeContainer>
    </View>
  );
}
