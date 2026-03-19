import React, { forwardRef } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import type { TextInputRef } from "../../../types/element.types";
import { usePhoneInput } from "../context";

export type ExpandableProps = Omit<TextInputProps, "value" | "onChangeText">;

export type PhoneInputProps = ExpandableProps;

export const PhoneInput = forwardRef<TextInputRef, PhoneInputProps>(
  ({ placeholder = "Enter phone number", style, ...props }, ref) => {
    const { styles, state, setIsFocused, phoneMask, isDisabled } = usePhoneInput();

    const inputStyles = StyleSheet.flatten([styles.input?.default, styles.input?.[state], style]);

    return (
      <TextInput
        {...props}
        ref={ref}
        value={phoneMask.displayValue}
        onChangeText={phoneMask.onChangeText}
        keyboardType={phoneMask.keyboardType}
        placeholder={placeholder}
        placeholderTextColor={StyleSheet.flatten(styles.countryButtonText?.disabled)?.color}
        readOnly={isDisabled}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        style={inputStyles}
      />
    );
  },
);
