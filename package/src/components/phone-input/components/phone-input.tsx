import React from "react";
import {
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextStyle,
} from "react-native";
import { usePhoneInput } from "../context";

export interface PhoneInputProps {
  placeholder?: string;
  style?: StyleProp<TextStyle>;
}

export function PhoneInput({
  placeholder = "Enter phone number",
  style,
}: PhoneInputProps) {
  const { styles, state, setIsFocused, phoneMask, isDisabled } =
    usePhoneInput();

  const inputStyles = StyleSheet.flatten([
    styles.input?.default,
    styles.input?.[state],
    style,
  ]);

  return (
    <TextInput
      value={phoneMask.displayValue}
      onChangeText={phoneMask.onChangeText}
      keyboardType={phoneMask.keyboardType}
      placeholder={placeholder}
      placeholderTextColor={
        StyleSheet.flatten(styles.countryButtonText?.disabled)?.color
      }
      readOnly={isDisabled}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={inputStyles}
    />
  );
}
