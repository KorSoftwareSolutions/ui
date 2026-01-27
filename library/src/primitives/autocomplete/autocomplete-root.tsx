import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "@/hooks";
import type { TextInputRef } from "@/types/element.types";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import { setInnerInputValue } from "@/utils/input-utils";
import React, { useEffect, useMemo, useState } from "react";
import { type LayoutRectangle, type StyleProp, View, type ViewStyle } from "react-native";
import { AutocompleteContext } from "./context";
import type { AutocompleteOption, AutocompleteState } from "./types";
import { AutocompleteVariants } from "./variants";

export interface AutocompleteRootBaseProps {
  value?: string;
  onChange?: (value: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  isDisabled?: boolean;
  openOnFocus?: boolean;
}

export interface AutocompleteRootProps extends AutocompleteRootBaseProps {
  variant?: keyof typeof AutocompleteVariants;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: AutocompleteRootProps, isFocused: boolean): AutocompleteState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (isFocused) {
    return "focused";
  }
  return "default";
};

export function AutocompleteRoot(props: AutocompleteRootProps) {
  const variantStyles = AutocompleteVariants[props.variant ?? "default"]();

  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [inputPosition, setInputPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [options, setOptions] = useState<Array<AutocompleteOption>>([]);
  const [inputRef, setInputRef] = useState<TextInputRef | null>(null);

  useEffect(() => {
    if (!inputRef) return;
    if (props.value) {
      const selectedOption = options.find((opt) => opt.value === props.value);
      if (selectedOption) {
        props.onInputChange?.(selectedOption.label);
        setInnerInputValue(inputRef, selectedOption.label);
      }
    }
  }, [props.value, options, inputRef]);

  const state = calculateState(props, isOpen);
  const composedStyles = calculateComposedStyles(variantStyles, state, "root", props.style);

  const contextValue = useMemo(
    () =>
      ({
        value: props.value,
        onChange: props.onChange,
        inputValue: props.inputValue,
        onInputChange: props.onInputChange,
        isOpen,
        setIsOpen,
        inputPosition,
        setInputPosition,
        contentLayout,
        setContentLayout,
        options,
        setOptions,
        openOnFocus: props.openOnFocus ?? true,
        inputRef,
        setInputRef,
        state,
        isDisabled: props.isDisabled ?? false,
        styles: variantStyles,
      }) satisfies AutocompleteContext,
    [
      props.value,
      props.onChange,
      props.openOnFocus,
      props.isDisabled,
      variantStyles,
      props.inputValue,
      props.onInputChange,
      isOpen,
      inputPosition,
      contentLayout,
      options,
      state,
    ],
  );

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <View style={composedStyles}>{props.children}</View>
    </AutocompleteContext.Provider>
  );
}
