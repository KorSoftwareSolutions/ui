import { CheckboxPrimitive } from "@/primitives";
import React from "react";
import { View } from "react-native";
import { CheckboxVariants } from "./variants";

interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  title?: string;
  description?: string;
  isDisabled?: boolean;
  variant?: keyof typeof CheckboxVariants;
}

export function Checkbox(props: CheckboxProps) {
  const { value, onChange, title, description, isDisabled, variant = "default" } = props;

  const useVariantStyles = CheckboxVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <CheckboxPrimitive.Root value={value} onChange={onChange} isDisabled={isDisabled} styles={variantStyles}>
      <CheckboxPrimitive.Indicator />
      {(title || description) && (
        <View style={{ flex: 1 }}>
          {title && <CheckboxPrimitive.Title>{title}</CheckboxPrimitive.Title>}
          {description && <CheckboxPrimitive.Description>{description}</CheckboxPrimitive.Description>}
        </View>
      )}
    </CheckboxPrimitive.Root>
  );
}
