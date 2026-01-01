import React, { useId } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { FieldContext } from "./context";
import type { FieldStyles } from "./types";

export interface FieldPrimitiveRootProps {
  children?: React.ReactNode;

  render?: (props: FieldPrimitiveRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
  styles?: FieldStyles;
}

export function FieldRoot(props: FieldPrimitiveRootProps) {
  const id = useId();
  const composedStyles = [props.styles?.root, props.style];
  const Component = props.render ?? View;
  return (
    <FieldContext.Provider value={{ styles: props.styles, id }}>
      <Component {...props} style={composedStyles} />
    </FieldContext.Provider>
  );
}
