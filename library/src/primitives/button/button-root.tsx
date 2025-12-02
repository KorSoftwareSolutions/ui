import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";
import { ButtonStyles, ButtonState } from "./types";
import { ButtonPrimitiveContext } from "./button-context";

export interface ButtonPrimitiveRootProps {
  children?: React.ReactNode;

  onPress?: () => void;

  isDisabled?: boolean;
  isLoading?: boolean;

  style?: StyleProp<ViewStyle>;
  styles?: ButtonStyles;

  render?: (props: this) => React.ReactElement;
}

const calculateState = (props: ButtonPrimitiveRootProps): ButtonState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (props.isLoading) {
    return "loading";
  }
  return "default";
};

export function ButtonRoot(props: ButtonPrimitiveRootProps) {
  const state = calculateState(props);

  const calculatedStyle = [props.styles?.root?.default, props.styles?.root?.[state], props.style];

  const Container = props.render ?? Pressable;
  return (
    <ButtonPrimitiveContext.Provider value={{ disabled: props.isDisabled, state, styles: props.styles }}>
      <Container {...props} style={calculatedStyle} />
    </ButtonPrimitiveContext.Provider>
  );
}
