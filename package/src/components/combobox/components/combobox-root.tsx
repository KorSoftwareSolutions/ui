import React, { useMemo, useRef, useState } from "react";
import {
  type LayoutRectangle,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "../../../hooks";
import { useComponentConfig } from "../../../themes/provider";
import type { TextInputRef } from "../../../types/element.types";
import { mergeStyles } from "../../../utils/calculate-styles";
import type { Size } from "../../../utils/size-scale";
import { ComboboxContext } from "../context";
import type { ComboboxState } from "../types";
import { ComboboxVariants } from "../variants";

export interface ComboboxRootProps<T> {
  items: T[];

  value: T | null;
  onChange: (item: T) => void;

  inputValue: string;
  onInputChange: (text: string) => void;

  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;

  variant?: keyof typeof ComboboxVariants;
  size?: Size;
  isDisabled?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const calculateState = <T,>(props: ComboboxRootProps<T>): ComboboxState => {
  if (props.isDisabled) return "disabled";
  return "default";
};

export function ComboboxRoot<T>({
  variant = "default",
  size = "md",
  isDisabled = false,
  ...props
}: ComboboxRootProps<T>) {
  const variantStyles = ComboboxVariants[variant](size);
  const globalStyles = useComponentConfig("combobox");
  const mergedStyles = mergeStyles(variantStyles, globalStyles?.styles);

  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const inputRef = useRef<TextInputRef>(null);

  const state = calculateState(props);
  const composedStyles = StyleSheet.flatten([
    mergedStyles?.root?.default,
    mergedStyles?.root?.[state],
    props.style,
  ]);

  const contextValue = useMemo<ComboboxContext>(
    () => ({
      items: props.items,
      filteredItems: props.items,
      value: props.value,
      onChange: props.onChange,
      inputValue: props.inputValue,
      onInputChange: props.onInputChange,
      inputRef,
      getItemValue: props.getItemValue,
      getItemLabel: props.getItemLabel,
      isOpen,
      setIsOpen,
      triggerPosition,
      setTriggerPosition,
      contentLayout,
      setContentLayout,
      state,
      isDisabled,
      styles: mergedStyles,
    }),
    [
      props.items,
      props.value,
      props.onChange,
      props.inputValue,
      props.onInputChange,
      props.getItemValue,
      props.getItemLabel,
      isOpen,
      triggerPosition,
      contentLayout,
      state,
      isDisabled,
      mergedStyles,
    ],
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <View style={composedStyles}>{props.children}</View>
    </ComboboxContext.Provider>
  );
}
