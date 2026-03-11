import { forwardRef, useState } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import type { TextInputRef } from "../../types/element.types";
import { mergeStyles } from "../../utils/calculate-styles";
import type { Size } from "../../utils/size-scale";
import { useFieldOptional } from "../field/context";
import type { InputState } from "./types";
import { InputVariants } from "./variants";

export type InputProps = Omit<TextInputProps, "onChange" | "onChangeText"> & {
  variant?: keyof typeof InputVariants;
  size?: Size;

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
  const variantStyles = InputVariants[props.variant || "default"](props.size ?? "md");
  const componentConfig = useComponentConfig("input");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
  const [isFocused, setIsFocused] = useState(false);
  const state = calculateState(props, isFocused);
  const field = useFieldOptional();

  const composedStyles = StyleSheet.flatten([
    mergedStyles.default?.style,
    mergedStyles[state]?.style,
    props.style,
  ]);
  const composedProps = {
    ...mergedStyles.default,
    ...mergedStyles[state],
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
