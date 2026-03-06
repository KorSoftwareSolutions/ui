import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { calculateComposedStyles, mergeStyles } from "../../../utils/calculate-styles";
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
  const componentConfig = useComponentConfig("progress");
  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);
  const composedStyle = calculateComposedStyles(mergedStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <ProgressContext.Provider
      value={{
        state: "default",
        styles: mergedStyles,
        value,
        max,
      }}
    >
      <Component {...props} style={composedStyle} />
    </ProgressContext.Provider>
  );
}
