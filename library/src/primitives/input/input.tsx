import { TextInput, TextInputProps } from "react-native";
import { InputState, InputStyles } from "./types";
import { useState } from "react";

export type InputPrimitiveBaseProps = Omit<TextInputProps, "onChange"> & {
  onChange?: TextInputProps["onChangeText"];

  isDisabled?: boolean;
};

export interface InputPrimitiveProps extends InputPrimitiveBaseProps {
  render?: (props: InputPrimitiveProps) => React.ReactNode;

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

export function InputPrimitive(props: InputPrimitiveProps) {
  const [isFocused, setIsFocused] = useState(false);
  const state = calculateState(props, isFocused);

  const composedStyles = [props.styles?.default?.style, props.styles?.[state]?.style, props.style];
  const composedProps = {
    ...props.styles?.default,
    ...props.styles?.[state],
    ...props,
  };
  const Component = props.render ?? TextInput;
  return (
    <Component
      {...composedProps}
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
}
