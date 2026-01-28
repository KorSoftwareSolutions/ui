import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
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

  const composedStyles = [variantStyles.root, props.style];
  const Component = props.render ?? View;
  return (
    <EmptyContext.Provider value={{ styles: variantStyles }}>
      <Component {...props} style={composedStyles} />
    </EmptyContext.Provider>
  );
}
