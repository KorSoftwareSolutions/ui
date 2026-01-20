import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { ProgressContext } from "./context";
import type { ProgressStyles } from "./types";

export interface ProgressRootProps {
  children?: React.ReactNode;

  render?: (props: ProgressRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
  styles?: ProgressStyles;

  value?: number;
  max?: number;
}

export function ProgressRoot(props: ProgressRootProps) {
  const { value = 0, max = 100 } = props;
  const composedStyle = calculateComposedStyles(props.styles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <ProgressContext.Provider
      value={{
        state: "default",
        styles: props.styles,
        value,
        max,
      }}
    >
      <Component {...props} style={composedStyle} />
    </ProgressContext.Provider>
  );
}
