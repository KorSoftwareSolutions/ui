import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { FieldContext } from "./context";
import { FieldStyles } from "./types";

export interface FieldPrimitiveRootProps {
  children?: React.ReactNode;

  render?: (props: FieldPrimitiveRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
  styles?: FieldStyles;
}

export function FieldRoot(props: FieldPrimitiveRootProps) {
  const composedStyles = [props.styles?.root, props.style];
  const Component = props.render ?? View;
  return (
    <FieldContext.Provider value={{ styles: props.styles }}>
      <Component {...props} style={composedStyles} />
    </FieldContext.Provider>
  );
}
