import type { TextInputRef } from "@/types/element.types";
import { forwardRef, useState } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";
import { useFieldOptional } from "../field/context";
import type { InputState, InputStyles } from "./types";

export type InputPrimitiveBaseProps = Omit<TextInputProps, "onChange"> & {
  ref?: React.Ref<TextInputRef>;
  onChange?: TextInputProps["onChangeText"];
  isDisabled?: boolean;
};

export interface InputPrimitiveProps extends InputPrimitiveBaseProps {
  styles?: InputStyles;
}

const calculateState = (props: InputPrimitiveProps, isFocused: boolean): InputState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (isFocused) {
    return "focused";
  }
  return "default";
};

export const InputPrimitive = forwardRef<TextInputRef, InputPrimitiveProps>((props, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const state = calculateState(props, isFocused);
  const field = useFieldOptional();

  const composedStyles = StyleSheet.flatten([props.styles?.default?.style, props.styles?.[state]?.style, props.style]);
  const composedProps = {
    ...props.styles?.default,
    ...props.styles?.[state],
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

InputPrimitive.displayName = "InputPrimitive";
