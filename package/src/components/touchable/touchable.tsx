import React, { useState } from "react";
import { Pressable, type PressableProps } from "react-native";
import type { PressableState } from "./types";
import { PressableVariants } from "./variants";

type ExtendablePressableProps = Omit<PressableProps, "disabled">;

export interface TouchableProps extends ExtendablePressableProps {
  variant?: keyof typeof PressableVariants;
  children?: React.ReactNode;
  isDisabled?: boolean;
}

const calculateState = (
  props: TouchableProps,
  isPressed: boolean,
  isHovered: boolean,
): PressableState => {
  if (props.isDisabled) return "disabled";
  if (isPressed) return "pressed";
  if (isHovered) return "hovered";
  return "default";
};

export function Touchable(props: TouchableProps) {
  const { variant = "default", isDisabled, style, children, ...rest } = props;
  const variantStyles = PressableVariants[variant]();
  const [isHovered, setIsHovered] = useState(false);

  const handlePress: PressableProps["onPress"] = (event) => {
    if (isDisabled) return;
    rest.onPress?.(event);
  };

  return (
    <Pressable
      {...rest}
      onPress={handlePress}
      onHoverIn={(e) => {
        setIsHovered(true);
        rest.onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        setIsHovered(false);
        rest.onHoverOut?.(e);
      }}
      disabled={isDisabled}
      style={(styleState) => {
        const currentState = calculateState(
          props,
          styleState.pressed,
          isHovered,
        );

        return [
          variantStyles?.default,
          variantStyles?.[currentState],
          typeof style === "function" ? style(styleState) : style,
        ];
      }}
    >
      {children}
    </Pressable>
  );
}
