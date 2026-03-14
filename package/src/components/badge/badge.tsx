import React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import { useOrganizedChildren } from "../../hooks/use-organized-children";
import { useComponentConfig } from "../../themes/provider";
import { mergeStyles } from "../../utils/calculate-styles";
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
  const componentConfig = useComponentConfig("badge");

  const customStyle = props.color ? { backgroundColor: props.color } : undefined;

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
  const composedStyle = StyleSheet.flatten([mergedStyles.root, props.style]);

  const organizedChildren = useOrganizedChildren(props.children, mergedStyles.text, mergedStyles.icon);

  const Component = props.render ?? View;
  return (
    <BadgeContext.Provider
      value={{
        styles: mergedStyles,
      }}
    >
      <Component {...props} style={[composedStyle, customStyle]}>
        {organizedChildren}
      </Component>
    </BadgeContext.Provider>
  );
}
