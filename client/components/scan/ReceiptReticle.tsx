import { View } from "react-native";
import { AppText } from "../ui";
import { cn } from "@/lib/cn";

type ReceiptReticleProps = {
  className?: string;
};

export function ReceiptReticle({ className }: ReceiptReticleProps) {
  return (
    <View
      className={cn("flex-1 w-full max-w-lg self-center", className)}
      pointerEvents="none"
    >
      {/* Top Left */}
      <View className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white rounded-tl-3xl opacity-80" />
      {/* Top Right */}
      <View className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white rounded-tr-3xl opacity-80" />
      {/* Bottom Left */}
      <View className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white rounded-bl-3xl opacity-80" />
      {/* Bottom Right */}
      <View className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white rounded-br-3xl opacity-80" />

      <View className="absolute inset-0 items-center justify-center">
        <AppText className="text-white opacity-50 font-sans-semibold tracking-wider uppercase text-sm">
          Align Receipt
        </AppText>
      </View>
    </View>
  );
}
