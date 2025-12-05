import React, { useState } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import { ButtonStyles, ButtonState } from "./types";
import { ButtonPrimitiveContext } from "./button-context";

export interface ButtonPrimitiveRootProps extends PressableProps {
  children?: React.ReactNode;

  isDisabled?: boolean;
  isLoading?: boolean;

  style?: StyleProp<ViewStyle>;
  styles?: ButtonStyles;

  render?: (props: this) => React.ReactElement;
}

const calculateState = (props: ButtonPrimitiveRootProps, isHovered: boolean): ButtonState => {
  if (props.isDisabled) {
    return "disabled";
  }
  if (props.isLoading) {
    return "loading";
  }
  if (isHovered) {
    return "hovered";
  }
  return "default";
};

export function ButtonRoot(props: ButtonPrimitiveRootProps) {
  const [isHovered, setIsHovered] = useState(false);

  const state = calculateState(props, isHovered);

  const calculatedStyle = [props.styles?.root?.default, props.styles?.root?.[state], props.style];

  const Container = props.render ?? Pressable;
  return (
    <ButtonPrimitiveContext.Provider value={{ disabled: props.isDisabled, state, styles: props.styles }}>
      <Container {...props} onHoverIn={() => setIsHovered(true)} onHoverOut={() => setIsHovered(false)} style={calculatedStyle} />
    </ButtonPrimitiveContext.Provider>
  );
}
