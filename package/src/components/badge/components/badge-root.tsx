import type { ElementChildren } from "../../../types/element.types";
import { calculateComposedStyles } from "../../../utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { BadgeContext } from "../context";
import { BadgeVariants } from "../variants";

export interface BadgeRootProps {
  variant?: keyof typeof BadgeVariants;
  color?: string;
  children?: ElementChildren;

  render?: (props: BadgeRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function BadgeRoot(props: BadgeRootProps) {
  const variantStyles = BadgeVariants[props.variant || "default"]();

  const customStyle = props.color ? { backgroundColor: props.color } : undefined;

  const composedStyle = calculateComposedStyles(variantStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <BadgeContext.Provider
      value={{
        state: "default",
        styles: variantStyles,
      }}
    >
      <Component {...props} style={[composedStyle, customStyle]} />
    </BadgeContext.Provider>
  );
}
