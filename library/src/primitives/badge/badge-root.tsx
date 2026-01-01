import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { BadgeContext } from "./context";
import type { BadgeStyles } from "./types";

export interface BadgeRootProps {
  children?: React.ReactNode;

  render?: (props: BadgeRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
  styles?: BadgeStyles;
}

export function BadgeRoot(props: BadgeRootProps) {
  const composedStyle = calculateComposedStyles(props.styles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <BadgeContext.Provider
      value={{
        state: "default",
        styles: props.styles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </BadgeContext.Provider>
  );
}
