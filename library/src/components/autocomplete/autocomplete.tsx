import { AutocompletePrimitive, type AutocompleteOption, type AutocompleteRootBaseProps } from "@/primitives";
import React from "react";
import { AutocompleteVariants } from "./variants";

export type { AutocompleteOption };

export interface AutocompleteProps extends AutocompleteRootBaseProps {
  options: AutocompleteOption[];
  variant?: keyof typeof AutocompleteVariants;
  emptyMessage?: string;
}

export function Autocomplete(props: AutocompleteProps) {
  const { options, variant = "default", emptyMessage = "No results found", ...rootProps } = props;
  const useVariantStyles = AutocompleteVariants[variant];
  const variantStyles = useVariantStyles();

  return (
    <AutocompletePrimitive.Root {...rootProps} styles={variantStyles}>
      <AutocompletePrimitive.Input />
      <AutocompletePrimitive.Portal>
        <AutocompletePrimitive.Overlay />
        <AutocompletePrimitive.Content>
          {options.map((option) => (
            <AutocompletePrimitive.Option key={option.value} value={option.value}>
              {option.label}
            </AutocompletePrimitive.Option>
          ))}
          {!options.length && <AutocompletePrimitive.Empty>{emptyMessage}</AutocompletePrimitive.Empty>}
        </AutocompletePrimitive.Content>
      </AutocompletePrimitive.Portal>
    </AutocompletePrimitive.Root>
  );
}
