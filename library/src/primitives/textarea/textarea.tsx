import { TextInput, TextInputProps } from "react-native";
import { TextareaState, TextareaStyles } from "./types";
import { useState } from "react";

export type TextareaPrimitiveBaseProps = Omit<TextInputProps, "onChange"> & {
  onChange?: TextInputProps["onChangeText"];

  isDisabled?: boolean;
};

export interface TextareaPrimitiveProps extends TextareaPrimitiveBaseProps {
  render?: (props: TextareaPrimitiveProps) => React.ReactNode;

  styles?: TextareaStyles;
}

const calculateState = (props: TextareaPrimitiveProps, isFocused: boolean): TextareaState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (isFocused) {
    return "focused";
  }
  return "default";
};

export function TextareaPrimitive(props: TextareaPrimitiveProps) {
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
      multiline
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
