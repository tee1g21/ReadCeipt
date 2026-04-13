import { Ionicons } from "@expo/vector-icons";

export type CategoryId =
  | "groceries"
  | "dining"
  | "retail"
  | "utilities"
  | "health"
  | "entertainment"
  | "education"
  | "travel"
  | "other";

export interface Category {
  id: CategoryId;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export const CATEGORIES: Record<string, Category> = {
  groceries: { id: "groceries", label: "GROCERIES", iconName: "cart" },
  dining: { id: "dining", label: "DINING", iconName: "restaurant" },
  retail: { id: "retail", label: "RETAIL", iconName: "bag" },
  utilities: { id: "utilities", label: "UTILITIES", iconName: "flash" },
  health: { id: "health", label: "HEALTH", iconName: "medkit" },
  entertainment: {
    id: "entertainment",
    label: "ENTERTAINMENT",
    iconName: "film",
  },
  education: { id: "education", label: "EDUCATION", iconName: "school" },
  travel: { id: "travel", label: "TRAVEL", iconName: "airplane" },
  other: { id: "other", label: "OTHER", iconName: "receipt" },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export const getCategory = (id: string | null | undefined): Category => {
  if (!id) return CATEGORIES["other"];
  return CATEGORIES[id] || CATEGORIES["other"];
};
