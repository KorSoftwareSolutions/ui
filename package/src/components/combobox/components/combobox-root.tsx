import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  type LayoutRectangle,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "../../../hooks";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import type { Size } from "../../../utils/size-scale";
import { ComboboxContext } from "../context";
import type { ComboboxState } from "../types";
import { ComboboxVariants } from "../variants";

const defaultGetItemValue = (item: unknown): string => {
  if (typeof item === "string") return item;
  if (typeof item === "object" && item !== null && "value" in item) {
    return String((item as Record<string, unknown>).value);
  }
  return String(item);
};

const defaultGetItemLabel = (item: unknown): string => {
  if (typeof item === "string") return item;
  if (typeof item === "object" && item !== null && "label" in item) {
    return String((item as Record<string, unknown>).label);
  }
  return defaultGetItemValue(item);
};

export interface ComboboxRootProps<T> {
  /** The full list of selectable items. */
  items: readonly T[];

  /** The currently selected item. */
  value?: T;

  /** Called when the user selects an item. */
  onChange?: (item: T) => void;

  /**
   * Extracts a unique string identifier from an item.
   * Defaults to reading `item.value` or `String(item)`.
   */
  getItemValue?: (item: T) => string;

  /**
   * Extracts a display label from an item (shown in the trigger when selected).
   * Defaults to reading `item.label` or falling back to `getItemValue`.
   */
  getItemLabel?: (item: T) => string;

  /**
   * Custom filter function. Return `true` to include the item.
   * Defaults to case-insensitive label includes query.
   * Pass `null` to disable built-in filtering (useful for async search).
   */
  filter?: ((item: T, query: string) => boolean) | null;

  /** Called when the text input value changes. Useful for async search. */
  onInputChange?: (text: string) => void;

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

export function ComboboxRoot<T>(props: ComboboxRootProps<T>) {
  const {
    items,
    value,
    onChange,
    getItemValue = defaultGetItemValue as (item: T) => string,
    getItemLabel = defaultGetItemLabel as (item: T) => string,
    filter,
    onInputChange,
    variant = "default",
    size = "md",
    isDisabled = false,
  } = props;

  const variantStyles = ComboboxVariants[variant](size);
  const globalStyles = useComponentConfig("combobox");
  const mergedStyles = mergeStyles(variantStyles, globalStyles?.styles);

  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] = useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition>(DEFAULT_POSITION);
  const [inputValue, setInputValue] = useState("");

  // Reset input value when closing
  const prevOpen = useRef(isOpen);
  useEffect(() => {
    if (prevOpen.current && !isOpen) {
      setInputValue("");
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  // Notify consumer when input value changes
  const onInputChangeRef = useRef(onInputChange);
  onInputChangeRef.current = onInputChange;
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onInputChangeRef.current?.(inputValue);
  }, [inputValue]);

  const filteredItems = useMemo(() => {
    if (filter === null) return items;
    if (!inputValue) return items;

    const filterFn =
      filter ??
      ((item: T, query: string) => {
        const label = getItemLabel(item);
        return label.toLowerCase().includes(query.toLowerCase());
      });

    return items.filter((item) => filterFn(item, inputValue));
  }, [items, inputValue, filter, getItemLabel]);

  const state = calculateState(props);
  const composedStyles = StyleSheet.flatten([
    mergedStyles?.root?.default,
    mergedStyles?.root?.[state],
    props.style,
  ]);

  const handleChange = useCallback(
    (item: unknown) => {
      onChange?.(item as T);
    },
    [onChange],
  );

  const contextValue: ComboboxContext = useMemo(
    () => ({
      items,
      filteredItems,
      getItemValue: getItemValue as (item: unknown) => string,
      getItemLabel: getItemLabel as (item: unknown) => string,
      value,
      onChange: handleChange,
      isOpen,
      setIsOpen,
      triggerPosition,
      setTriggerPosition,
      contentLayout,
      setContentLayout,
      inputValue,
      setInputValue,
      state,
      isDisabled,
      styles: mergedStyles,
    }),
    [
      items,
      filteredItems,
      getItemValue,
      getItemLabel,
      value,
      handleChange,
      isOpen,
      triggerPosition,
      contentLayout,
      inputValue,
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
