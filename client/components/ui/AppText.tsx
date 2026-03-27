import { Text, TextProps } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const textVariants = cva(
  "font-sans text-foreground", // Base: Applies your font and light/dark text color
  {
    variants: {
      variant: {
        h1: "text-4xl font-sans-bold tracking- text-headline",
        h2: "text-2xl font-sans-bold tracking-tight text-headline",
        h3: "text-xl font-sans-semibold text-headline",
        body: "text-base leading-relaxed text-body",
        muted: "text-sm text-muted",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      variant: "body",
      align: "left",
    },
  },
);

interface AppTextProps extends TextProps, VariantProps<typeof textVariants> {}

export function AppText({
  className,
  variant,
  align,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={cn(textVariants({ variant, align }), className)}
      style={style}
      {...props}
    />
  );
}
