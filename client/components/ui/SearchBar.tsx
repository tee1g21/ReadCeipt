import { Surface, Icon } from "@/components/ui";
import { TextInput, useColorScheme } from "react-native";

export function SearchBar() {
  const isDark = useColorScheme() === "dark";
  const placeholderColor = isDark ? "#b9c9c4" : "#414a4c";

  return (
    <Surface
      variant="secondary"
      className="flex-none flex-row items-center px-6 py-0"
    >
      <Icon name="search" size="sm" className="text-body" />
      <TextInput
        placeholder="Search"
        className="w-full p-4 text-body text-lg web:outline-none"
        placeholderTextColor={placeholderColor}
      />
    </Surface>
  );
}
