import React, { useState } from "react";
import { Pressable, type CursorValue, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { ButtonPrimitiveContext } from "./button-context";
import type { ButtonState, ButtonStyles } from "./types";

export interface ButtonPrimitiveRootProps extends PressableProps {
  children?: React.ReactNode;

  isDisabled?: boolean;
  isLoading?: boolean;

  style?: StyleProp<ViewStyle>;
  styles?: ButtonStyles;
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

const cursorValue = (state: ButtonState): CursorValue => {
  switch (state) {
    case "disabled":
      return "not-allowed" as CursorValue;
    case "loading":
      return "wait" as CursorValue;
    default:
      return "pointer";
  }
};

export function ButtonRoot(props: ButtonPrimitiveRootProps) {
  const [isHovered, setIsHovered] = useState(false);

  const state = calculateState(props, isHovered);

  const calculatedStyle = [props.styles?.root?.default, props.styles?.root?.[state], props.style];

  const handlePress: PressableProps["onPress"] = (event) => {
    if (props.isDisabled || props.isLoading) {
      event.preventDefault();
      return;
    }
    props.onPress?.(event);
  };

  return (
    <ButtonPrimitiveContext.Provider value={{ disabled: props.isDisabled, state, styles: props.styles }}>
      <Pressable
        {...props}
        onPress={handlePress}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        disabled={props.isDisabled}
        style={[
          calculatedStyle,
          {
            cursor: cursorValue(state),
          },
        ]}
      />
    </ButtonPrimitiveContext.Provider>
  );
}
