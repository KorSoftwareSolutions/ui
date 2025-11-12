import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { FieldContext } from "./field-context";
import { FieldLabelProps } from "./field-label";
import { FieldControlProps } from "./field-control";

export interface FieldStyles {
  root?: FieldRootProps["style"];
  label?: FieldLabelProps["style"];
  control?: FieldControlProps["style"];
}

interface FieldRootProps {
  value?: string;
  onChange?: (value: string) => void;

  required?: boolean;
  disabled?: boolean;
  error?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  styles?: FieldStyles;
}

export function FieldRoot(props: FieldRootProps) {
  const calculatedStyle = props.styles?.root ?? props.style;

  return (
    <FieldContext.Provider
      value={{
        value: props.value,
        onChange: props.onChange,

        required: props.required,
        disabled: props.disabled,
        error: props.error,

        styles: props.styles,
      }}
    >
      <View style={calculatedStyle}>{props.children}</View>
    </FieldContext.Provider>
  );
}
