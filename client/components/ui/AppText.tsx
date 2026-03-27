import { Text, TextProps } from "react-native";
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "@/lib/cn";

const textVariants = cva(
  "font-sans", 
  {
    variants: { 
      variant: {
        headline: "text-headline text-xl",
        body: "text-body text-md", 
      }
    }, 
    defaultVariants: {
      variant: "body",
    }
    }
)

interface AppTextProps extends TextProps, VariantProps<typeof textVariants> {}

export function AppText({ className, variant, style, ...props }: AppTextProps) {
  return (
    <Text
      className={cn(textVariants({ variant }), className)}      
      style={style}
      {...props}
    />
  );
}
