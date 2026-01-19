import type { TextInputRef } from "@/types/element.types";
import { measureLayoutPosition } from "@/utils/normalize-layout";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { StyleSheet, TextInput, type StyleProp, type TextInputProps, type TextStyle } from "react-native";
import { useFieldOptional } from "../field/context";
import { useAutocomplete } from "./context";

export interface AutocompleteInputProps extends Omit<TextInputProps, "onChange" | "value"> {
  style?: StyleProp<TextStyle>;
}

export const AutocompleteInput = forwardRef<TextInputRef, AutocompleteInputProps>((props, ref) => {
  const autocomplete = useAutocomplete();
  const field = useFieldOptional();
  const inputRef = useRef<TextInputRef>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const composedStyles = [autocomplete.styles?.input?.default, autocomplete.styles?.input?.[autocomplete.state], props.style];
  const placeholderTextColor = autocomplete.styles?.input?.placeholderTextColor;
  const selectionColor = autocomplete.styles?.input?.selectionColor;

  const handleFocus: TextInputProps["onFocus"] = (e) => {
    // Clear any pending blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    // Measure layout position and open dropdown
    if (autocomplete.openOnFocus && !autocomplete.isDisabled) {
      measureLayoutPosition(inputRef.current, (layout) => {
        autocomplete.setInputPosition(layout);
        autocomplete.setIsOpen(true);
      });
    }

    props.onFocus?.(e);
  };

  const handleBlur: TextInputProps["onBlur"] = (e) => {
    blurTimeoutRef.current = setTimeout(() => {
      autocomplete.setIsOpen(false);
    }, 150);

    props.onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    autocomplete.setInputValue?.(text);

    // Open dropdown when typing
    if (!autocomplete.isOpen && text.trim() && autocomplete.openOnFocus) {
      measureLayoutPosition(inputRef.current, (layout) => {
        autocomplete.setInputPosition(layout);
        autocomplete.setIsOpen(true);
      });
    }

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
      placeholder={autocomplete.placeholder}
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
