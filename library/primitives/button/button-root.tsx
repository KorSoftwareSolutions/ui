import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { ButtonStyles, ButtonState } from "./types";
import { ButtonContext } from "./button-context";

export interface ButtonRootProps {
  children?: React.ReactNode;

  onPress?: () => void;

  disabled?: boolean;

  style?: StyleProp<ViewStyle>;
  styles?: ButtonStyles;

  render?: (props: this) => React.ReactElement;
}

const calculateState = (props: ButtonRootProps): ButtonState => {
  if (props.disabled) {
    return "disabled";
  }
  return "default";
};

export function ButtonRoot(props: ButtonRootProps) {
  const state = calculateState(props);

  const calculatedStyle = [props.styles?.root?.default, props.styles?.root?.[state], props.style];

  const Container = props.render ?? Pressable;
  return (
    <ButtonContext.Provider value={{ disabled: props.disabled, state, styles: props.styles }}>
      <Container {...props} style={calculatedStyle} />
    </ButtonContext.Provider>
  );
}
