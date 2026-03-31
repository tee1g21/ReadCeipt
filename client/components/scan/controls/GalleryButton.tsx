import { CameraButton } from "@/components/ui";
import { launchImageLibraryAsync } from "expo-image-picker";

interface GalleryButtonPops {
  setCapturedImage: React.Dispatch<
    React.SetStateAction<{ uri: string; base64?: string } | null>
  >;
}

export function GalleryButton({ setCapturedImage }: GalleryButtonPops) {
  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setCapturedImage({
        uri: result.assets[0].uri,
        base64: result.assets[0].base64 || undefined,
      });
    }
  };

  return <CameraButton iconName="image" onPress={pickImage} />;
}
