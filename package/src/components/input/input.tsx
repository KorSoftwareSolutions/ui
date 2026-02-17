import type { TextInputRef } from "../../types/element.types";
import { forwardRef, useState } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { useFieldOptional } from "../field/context";
import type { InputState } from "./types";
import { InputVariants } from "./variants";

export type InputProps = Omit<TextInputProps, "onChange"> & {
  variant?: keyof typeof InputVariants;

  ref?: React.Ref<TextInputRef>;
  onChange?: TextInputProps["onChangeText"];
  isDisabled?: boolean;
};

const calculateState = (props: InputProps, isFocused: boolean): InputState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (isFocused) {
    return "focused";
  }
  return "default";
};

export const Input = forwardRef<TextInputRef, InputProps>((props, ref) => {
  const variantStyles = InputVariants[props.variant || "default"]();
  const [isFocused, setIsFocused] = useState(false);
  const state = calculateState(props, isFocused);
  const field = useFieldOptional();

  const composedStyles = StyleSheet.flatten([variantStyles.default?.style, variantStyles[state]?.style, props.style]);
  const composedProps = {
    ...variantStyles.default,
    ...variantStyles[state],
    ...props,
  };

  return (
    <TextInput
      {...composedProps}
      ref={ref}
      id={field?.id}
      onChange={undefined}
      onChangeText={props.onChange}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      readOnly={props.isDisabled || props.readOnly}
      style={composedStyles}
    />
  );
});

Input.displayName = "Input";
