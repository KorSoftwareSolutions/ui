import type { TextInputRef } from "@/types/element.types";
import { measureLayoutPosition } from "@/utils/normalize-layout";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Platform, StyleSheet, TextInput, type StyleProp, type TextInputProps, type TextStyle } from "react-native";
import { useFieldOptional } from "../../field/context";
import { useAutocomplete } from "../context";

export interface AutocompleteInputProps extends Omit<TextInputProps, "onChange" | "value"> {
  style?: StyleProp<TextStyle>;
}

const TIMEOUT_DELAY = Platform.select({
  default: 300,
  web: 100,
});

export const AutocompleteInput = forwardRef<TextInputRef, AutocompleteInputProps>((props, ref) => {
  const autocomplete = useAutocomplete();
  const field = useFieldOptional();
  const inputRef = useRef<TextInputRef>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const focusTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const composedStyles = [autocomplete.styles?.input?.default, autocomplete.styles?.input?.[autocomplete.state], props.style];
  const placeholderTextColor = autocomplete.styles?.input?.placeholderTextColor;
  const selectionColor = autocomplete.styles?.input?.selectionColor;

  const handleFocus: TextInputProps["onFocus"] = (e) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    if (!autocomplete.isDisabled) {
      focusTimeoutRef.current = setTimeout(() => {
        measureLayoutPosition(inputRef.current, (layout) => {
          autocomplete.setInputPosition(layout);
          autocomplete.setIsOpen(true);
        });
      }, TIMEOUT_DELAY);
    }

    props.onFocus?.(e);
  };

  const handleBlur: TextInputProps["onBlur"] = (e) => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }

    blurTimeoutRef.current = setTimeout(() => {
      autocomplete.setIsOpen(false);
    }, TIMEOUT_DELAY);

    props.onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    autocomplete.onInputChange?.(text);

    props.onChangeText?.(text);
  };

  useImperativeHandle(ref, () => inputRef.current!);
  useEffect(() => {
    autocomplete.setInputRef(inputRef.current);
  }, []);

  return (
    <TextInput
      {...props}
      ref={inputRef}
      id={field?.id}
      value={autocomplete.inputValue}
      placeholderTextColor={placeholderTextColor}
      selectionColor={selectionColor}
      onChangeText={handleChangeText}
      onFocus={handleFocus}
      onBlur={handleBlur}
      editable={!autocomplete.isDisabled}
      style={StyleSheet.flatten(composedStyles)}
    />
  );
});

AutocompleteInput.displayName = "AutocompleteInput";
