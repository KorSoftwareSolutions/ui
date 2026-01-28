import React, { useId } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { FieldContext } from "../context";
import { FieldVariants } from "../variants";

export interface FieldPrimitiveRootProps {
  variant?: keyof typeof FieldVariants;
  children?: React.ReactNode;

  render?: (props: FieldPrimitiveRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function FieldRoot(props: FieldPrimitiveRootProps) {
  const variantStyles = FieldVariants[props.variant || "default"]();
  const id = useId();

  const composedStyles = [variantStyles.root, props.style];
  const Component = props.render ?? View;
  return (
    <FieldContext.Provider value={{ styles: variantStyles, id }}>
      <Component {...props} style={composedStyles} />
    </FieldContext.Provider>
  );
}
