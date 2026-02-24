import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  type LayoutRectangle,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import {
  DEFAULT_LAYOUT,
  DEFAULT_POSITION,
  type LayoutPosition,
} from "../../../hooks";
import { ComboboxContext } from "../context";
import type { ComboboxState } from "../types";
import { ComboboxVariants } from "../variants";

export interface ComboboxRootProps {
  variant?: keyof typeof ComboboxVariants;

  value?: string;
  onChange?: (value: string) => void;

  /** Called when the text input value changes. Use this to filter options on the consumer side. */
  onInputChange?: (text: string) => void;

  isDisabled?: boolean;

  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: ComboboxRootProps): ComboboxState => {
  if (props.isDisabled) {
    return "disabled";
  }
  return "default";
};

export function ComboboxRoot(props: ComboboxRootProps) {
  const variantStyles = ComboboxVariants[props.variant ?? "default"]();

  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] =
    useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] =
    useState<LayoutPosition>(DEFAULT_POSITION);
  const [inputValue, setInputValueInternal] = useState("");

  const onInputChangeRef = useRef(props.onInputChange);
  onInputChangeRef.current = props.onInputChange;

  const setInputValue: React.Dispatch<React.SetStateAction<string>> =
    useCallback((action) => {
      setInputValueInternal((prev) => {
        const next = typeof action === "function" ? action(prev) : action;
        if (next !== prev) {
          onInputChangeRef.current?.(next);
        }
        return next;
      });
    }, []);

  const state = calculateState(props);
  const composedStyles = StyleSheet.flatten([
    variantStyles?.root?.default,
    variantStyles?.root?.[state],
    props.style,
  ]);

  const contextValue: ComboboxContext = useMemo(
    () => ({
      value: props.value,
      onChange: props.onChange,
      isOpen,
      setIsOpen,
      triggerPosition,
      setTriggerPosition,
      contentLayout,
      setContentLayout,
      inputValue,
      setInputValue,
      state,
      isDisabled: props.isDisabled ?? false,
      styles: variantStyles,
    }),
    [
      props.value,
      props.onChange,
      isOpen,
      triggerPosition,
      contentLayout,
      inputValue,
      setInputValue,
      state,
      props.isDisabled,
      variantStyles,
    ],
  );

  return (
    <ComboboxContext.Provider value={contextValue}>
      <View style={composedStyles}>{props.children}</View>
    </ComboboxContext.Provider>
  );
}
