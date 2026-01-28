import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { ProgressContext } from "../context";
import { ProgressVariants } from "../variants";

export interface ProgressRootProps {
  variant?: keyof typeof ProgressVariants;
  children?: React.ReactNode;

  render?: (props: ProgressRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;

  value?: number;
  max?: number;
}

export function ProgressRoot(props: ProgressRootProps) {
  const { value = 0, max = 100 } = props;
  const variantStyles = ProgressVariants[props.variant || "default"]();
  const composedStyle = calculateComposedStyles(variantStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <ProgressContext.Provider
      value={{
        state: "default",
        styles: variantStyles,
        value,
        max,
      }}
    >
      <Component {...props} style={composedStyle} />
    </ProgressContext.Provider>
  );
}
