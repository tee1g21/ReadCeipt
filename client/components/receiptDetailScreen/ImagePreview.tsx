import { Surface, AppPressable, Icon } from "@/components/ui";
import { Image } from "expo-image";
import { Modal, Pressable } from "react-native";
import { useState } from "react";

export function ImagePreview() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <>
      <AppPressable
        className="relative flex-1 rounded-2xl overflow-hidden"
        onPress={() => setIsImageModalOpen(true)}
      >
        <Image
          source={require("@/assets/images/receipt-example.jpg")}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={200}
          accessibilityLabel="Receipt image"
        />

        <Surface
          variant="secondary"
          className="absolute bottom-2 right-2 items-center justify-center h-9 w-9 p-0"
        >
          <Icon name="maximize" size="default" className="text-body" />
        </Surface>
      </AppPressable>

      <Modal
        visible={isImageModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsImageModalOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/80 items-center justify-center px-4"
          onPress={() => setIsImageModalOpen(false)}
        >
          <Image
            source={require("@/assets/images/receipt-example.jpg")}
            style={{ width: "100%", height: "85%" }}
            contentFit="contain"
            transition={200}
            accessibilityLabel="Receipt image enlarged"
          />
        </Pressable>
      </Modal>
    </>
  );
}
