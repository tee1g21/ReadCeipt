import { LinearGradient } from "expo-linear-gradient";

export function NavBottomGradient() {
  return (
    <LinearGradient
      colors={["transparent", "rgba(0,0,0,0.6)", "#000000"]}
      locations={[0, 0.6, 1]}
      className="absolute bottom-0 left-0 right-0 h-36 z-0"
      pointerEvents="none"
    />
  );
}
