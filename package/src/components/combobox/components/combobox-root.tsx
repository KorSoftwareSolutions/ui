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
import type { ComboboxOption, ComboboxState } from "../types";
import { ComboboxVariants } from "../variants";

export interface ComboboxRootProps {
  variant?: keyof typeof ComboboxVariants;

  value?: string;
  onChange?: (value: string) => void;

  /** Called when the search input text changes. Use for async/remote filtering. */
  onSearchChange?: (query: string) => void;

  /** Custom filter function. Receives option value and search query, returns whether to show the option.
   * Default: case-insensitive match against option label/keywords.
   * For async/remote filtering, pass `() => true` to show all options. */
  filter?: (value: string, query: string) => boolean;

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

const defaultFilter = (
  value: string,
  query: string,
  options: Array<ComboboxOption>,
): boolean => {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  const option = options.find((o) => o.value === value);
  if (!option) return true;

  if (option.keywords) {
    return option.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery));
  }

  if (typeof option.label === "string") {
    return option.label.toLowerCase().includes(lowerQuery);
  }

  return true;
};

export function ComboboxRoot(props: ComboboxRootProps) {
  const variantStyles = ComboboxVariants[props.variant ?? "default"]();

  const [isOpen, setIsOpen] = useState(false);
  const [contentLayout, setContentLayout] =
    useState<LayoutRectangle>(DEFAULT_LAYOUT);
  const [triggerPosition, setTriggerPosition] =
    useState<LayoutPosition>(DEFAULT_POSITION);
  const [options, setOptions] = useState<Array<ComboboxOption>>([]);
  const [searchQuery, setSearchQueryInternal] = useState("");

  const onSearchChangeRef = useRef(props.onSearchChange);
  onSearchChangeRef.current = props.onSearchChange;

  const setSearchQuery: React.Dispatch<React.SetStateAction<string>> =
    useCallback((action) => {
      setSearchQueryInternal((prev) => {
        const next = typeof action === "function" ? action(prev) : action;
        if (next !== prev) {
          onSearchChangeRef.current?.(next);
        }
        return next;
      });
    }, []);

  const filterRef = useRef(props.filter);
  filterRef.current = props.filter;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const filter = useCallback(
    (value: string, query: string) =>
      filterRef.current
        ? filterRef.current(value, query)
        : defaultFilter(value, query, optionsRef.current),
    [],
  );

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
      options,
      setOptions,
      searchQuery,
      setSearchQuery,
      filter,
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
      options,
      searchQuery,
      setSearchQuery,
      filter,
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
