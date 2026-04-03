import { Surface, Icon } from "@/components/ui";
import { cn } from "@/lib";
import { TextInput, useColorScheme } from "react-native";

export function SearchBar() {
  const isDark = useColorScheme() === "dark";
  const placeholderColor = isDark ? "#b9c9c4" : "#414a4c";

  return (
    <Surface
      variant="secondary"
      className="flex-none flex-row items-center px-6 py-0 border-2 border-muted/30 dark:border-surface"
    >
      <Icon name="search" size="default" className="text-body" />
      <TextInput
        placeholder="Search"
        className="w-full p-4 text-body text-lg web:outline-none"
        placeholderTextColor={placeholderColor}
      />
    </Surface>
  );
}
