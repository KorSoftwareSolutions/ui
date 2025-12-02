import React from "react";
import { SelectPrimitive, SelectRootBaseProps } from "@/primitives";
import { SelectVariants } from "./variants";

export interface SelectOption<T> {
  value: T;
  label: string;
}

export interface SelectProps<T> extends SelectRootBaseProps {
  options: SelectOption<T>[];
  variant?: keyof typeof SelectVariants;
}

export function Select<T>(props: SelectProps<T>) {
  const useVariantStyles = SelectVariants[props.variant ?? "default"];
  const variantStyles = useVariantStyles();
  return (
    <SelectPrimitive.Root {...props} styles={variantStyles}>
      <SelectPrimitive.Trigger>
        <SelectPrimitive.Value />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay />
        <SelectPrimitive.Content>
          {props.options.map((option) => (
            <SelectPrimitive.Option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectPrimitive.Option>
          ))}
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
