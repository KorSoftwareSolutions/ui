import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import { EmptyContext } from "../context";
import { EmptyVariants } from "../variants";

export interface EmptyRootProps {
  variant?: keyof typeof EmptyVariants;
  children: React.ReactNode;
  render?: (props: EmptyRootProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function EmptyRoot(props: EmptyRootProps) {
  const variantStyles = EmptyVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("empty");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const composedStyles = [mergedStyles.root, props.style];
  const Component = props.render ?? View;
  return (
    <EmptyContext.Provider value={{ styles: mergedStyles }}>
      <Component {...props} style={composedStyles} />
    </EmptyContext.Provider>
  );
}
