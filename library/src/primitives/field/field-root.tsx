import React, { useState } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { FieldContext } from "./context";
import { FieldState, FieldStyles } from "./types";

export interface FieldRootProps {
  value?: string | null;
  onChange?: (value: string) => void;

  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;

  styles?: FieldStyles<unknown>;
}

const calculateState = (props: FieldRootProps, focused: boolean, hovered: boolean): FieldState => {
  if (props.disabled) {
    return "disabled";
  }
  if (props.error) {
    return "error";
  }
  if (focused) {
    return "focused";
  }
  if (hovered) {
    return "hovered";
  }

  return "default";
};

export function FieldRoot(props: FieldRootProps) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const state = calculateState(props, focused, hovered);

  const calculatedStyle = [props.styles?.root?.default, props.styles?.root?.[state], props.style];

  return (
    <FieldContext.Provider
      value={{
        value: props.value ?? null,
        onChange: props.onChange,

        focused,
        setFocused,

        hovered,
        setHovered,

        required: props.required,
        disabled: props.disabled,
        error: props.error ?? null,

        state: state,
        styles: props.styles,
      }}
    >
      <Pressable onHoverIn={() => setHovered(true)} onHoverOut={() => setHovered(false)} style={calculatedStyle}>
        {props.children}
      </Pressable>
    </FieldContext.Provider>
  );
}
