import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button, Icon } from "../ui";
import { cn } from "@/lib/cn";
import * as ImagePicker from "expo-image-picker";

type CameraControlsProps = {
  className?: string;
  isTorchOn: boolean;
  setIsTorchOn: Dispatch<SetStateAction<boolean>>;
};

export function CameraControls({
  className,
  isTorchOn,
  setIsTorchOn,
}: CameraControlsProps) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      console.log("Image successfully selected from Gallery!");

      // result.assets[0].base64 is the giant string of text representing your image.
      // result.assets[0].uri is the temporary local file path on the phone.

      // For now, let's just log that we got it:
      console.log("URI:", result.assets[0].uri);
    } else {
      console.log("User cancelled the image picker.");
    }
  };

  return (
    <View className={cn("flex-row justify-between items-center ", className)}>
      {/* Gallery Button */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/40 rounded-full"
        icon={<Icon name="image" className="text-white" />}
        onPress={pickImage}
      />

      {/* Shutter Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-20 w-20 rounded-full bg-white border-4 border-primary/50 active:scale-90 transition-all"
        onPress={() => console.log("SNAP!")}
      />

      {/* Flash Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="bg-black/40 rounded-full"
        icon={
          <Icon name={isTorchOn ? "zap" : "zap-off"} className="text-white" />
        }
        onPress={() => setIsTorchOn(!isTorchOn)}
      />
    </View>
  );
}
