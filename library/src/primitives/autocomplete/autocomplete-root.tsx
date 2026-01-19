import { DEFAULT_LAYOUT, DEFAULT_POSITION, type LayoutPosition } from "@/hooks";
import type { TextInputRef } from "@/types/element.types";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import { setInnerInputValue } from "@/utils/input-utils";
import React, { useEffect, useMemo, useState } from "react";
import { type LayoutRectangle, type StyleProp, View, type ViewStyle } from "react-native";
import { AutocompleteContext } from "./context";
import type { AutocompleteOption, AutocompleteState, AutocompleteStyles } from "./types";

export interface AutocompleteRootBaseProps {
  value?: string;
  onChange?: (value: string) => void;
  inputValue?: string;
  setInputValue?: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  openOnFocus?: boolean;
}

export interface AutocompleteRootProps extends AutocompleteRootBaseProps {
  children?: React.ReactNode;
  styles?: AutocompleteStyles;
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
        props.setInputValue?.(selectedOption.label);
        setInnerInputValue(inputRef, selectedOption.label);
      }
    } else {
      props.setInputValue?.("");
      setInnerInputValue(inputRef, "");
    }
  }, [props.value, options, inputRef]);

  const state = calculateState(props, isOpen);
  const composedStyles = calculateComposedStyles(props.styles, state, "root", props.style);

  const contextValue = useMemo(
    () =>
      ({
        value: props.value,
        onChange: props.onChange,
        placeholder: props.placeholder,
        inputValue: props.inputValue,
        setInputValue: props.setInputValue,
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
        styles: props.styles ?? null,
      }) satisfies AutocompleteContext,
    [
      props.value,
      props.onChange,
      props.placeholder,
      props.openOnFocus,
      props.isDisabled,
      props.styles,
      props.inputValue,
      props.setInputValue,
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
