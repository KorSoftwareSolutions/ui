import React, { useState } from "react";
import { Pressable, type CursorValue, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { ButtonContext } from "../context";
import type { ButtonState } from "../types";
import { ButtonVariants } from "../variants";

export interface ButtonRootProps extends PressableProps {
  variant?: keyof typeof ButtonVariants;
  children?: React.ReactNode;

  isDisabled?: boolean;
  isLoading?: boolean;

  style?: StyleProp<ViewStyle>;
}

const calculateState = (props: ButtonRootProps, isHovered: boolean): ButtonState => {
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

export function ButtonRoot(props: ButtonRootProps) {
  const variantStyles = ButtonVariants[props.variant ?? "default"]();
  const [isHovered, setIsHovered] = useState(false);

  const state = calculateState(props, isHovered);

  const calculatedStyle = [variantStyles.root?.default, variantStyles.root?.[state], props.style];

  const handlePress: PressableProps["onPress"] = (event) => {
    if (props.isDisabled || props.isLoading) {
      event.preventDefault();
      return;
    }
    props.onPress?.(event);
  };

  const contextValue: ButtonContext = { state, styles: variantStyles };

  return (
    <ButtonContext.Provider value={contextValue}>
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
    </ButtonContext.Provider>
  );
}
