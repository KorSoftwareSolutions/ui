import React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { useOrganizedChildren } from "../../hooks/use-organized-children";
import { BadgeContext } from "./context";
import { BadgeVariants } from "./variants";

export interface BadgeProps {
  variant?: keyof typeof BadgeVariants;
  color?: string;
  children?: React.ReactNode;

  render?: (props: BadgeProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function Badge(props: BadgeProps) {
  const variantStyles = BadgeVariants[props.variant || "default"]();

  const customStyle = props.color
    ? { backgroundColor: props.color }
    : undefined;

  const composedStyle = StyleSheet.flatten([variantStyles.root, props.style]);

  const textStyle = variantStyles.text;
  const iconStyle = variantStyles.icon;
  const organizedChildren = useOrganizedChildren(
    props.children,
    textStyle,
    iconStyle,
  );

  const Component = props.render ?? View;
  return (
    <BadgeContext.Provider
      value={{
        styles: variantStyles,
      }}
    >
      <Component {...props} style={[composedStyle, customStyle]}>
        {organizedChildren}
      </Component>
    </BadgeContext.Provider>
  );
}
