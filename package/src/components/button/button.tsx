import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { useOrganizedChildren } from "../../hooks/use-organized-children";
import type { ButtonState } from "./types";
import { ButtonVariants } from "./variants";

export interface ButtonProps extends Omit<PressableProps, "disabled"> {
  variant?: keyof typeof ButtonVariants;
  children?: React.ReactNode;

  isDisabled?: boolean;
  isLoading?: boolean;

  style?: StyleProp<ViewStyle>;
}

const calculateState = (
  props: ButtonProps,
  isHovered: boolean,
): ButtonState => {
  if (props.isDisabled) return "disabled";
  if (props.isLoading) return "loading";
  if (isHovered) return "hovered";
  return "default";
};

export function Button(props: ButtonProps) {
  const variantStyles = ButtonVariants[props.variant ?? "default"]();
  const [isHovered, setIsHovered] = useState(false);

  const state = calculateState(props, isHovered);

  const textStyle = StyleSheet.flatten([
    variantStyles.text?.default,
    variantStyles.text?.[state],
  ]);
  const iconProps = StyleSheet.flatten([
    variantStyles.icon?.default,
    variantStyles.icon?.[state],
  ]);

  const organizedChildren = useOrganizedChildren(
    props.children,
    textStyle,
    iconProps,
  );

  const handlePress: PressableProps["onPress"] = (event) => {
    if (props.isDisabled || props.isLoading) {
      event.preventDefault();
      return;
    }
    props.onPress?.(event);
  };

  const spinnerProps = {
    ...variantStyles.spinner?.[state],
    ...variantStyles.spinner?.default,
  };

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      disabled={props.isDisabled}
      style={[
        variantStyles.root?.default,
        variantStyles.root?.[state],
        props.style,
      ]}
    >
      {organizedChildren}
      {props.isLoading && <ActivityIndicator {...spinnerProps} />}
    </Pressable>
  );
}
