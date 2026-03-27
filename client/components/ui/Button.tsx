import React from "react";
import { Pressable, PressableProps, View } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { AppText } from "./AppText";

// The Button Container
const buttonVariants = cva(
  "flex-row items-center justify-center rounded-xl active:scale-95 active:opacity-80 transition-all",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        outline: "border-2 border-primary bg-transparent",
        ghost: "bg-transparent active:bg-primary/10",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-9 px-4 rounded-lg",
        lg: "h-14 px-8 rounded-2xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("font-sans-bold", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      secondary: "text-body",
      outline: "text-primary",
      ghost: "text-primary",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends PressableProps, VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: React.ReactNode;
}

export function Button({
  className,
  variant,
  size,
  label,
  icon,
  ...props
}: ButtonProps) {
  const textClass = buttonTextVariants({ variant, size });

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {icon && React.isValidElement(icon) && (
        <View className={label ? "mr-2" : ""}>
          {React.cloneElement(icon as React.ReactElement<any>, {
            className: cn(
              textClass,
              (icon as React.ReactElement<any>).props.className,
            ),
          })}
        </View>
      )}

      {label && (
        <AppText className={cn(buttonTextVariants({ variant, size }))}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
}
