import { Surface } from "./Surface";
import { Icon } from "./Icon";
import { TextInput, TextInputProps, useColorScheme } from "react-native";
import { cn } from "@/lib/cn";

export interface SearchBarProps extends TextInputProps {
  className?: string;
}

export function SearchBar({ className, ...props }: SearchBarProps) {
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
        placeholderTextColor={placeholderColor}
        className={cn(
          "w-full p-4 text-body text-lg web:outline-none",
          className,
        )}
        {...props}
      />
    </Surface>
  );
}
