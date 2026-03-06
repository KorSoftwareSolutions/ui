import React, { useId } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../../themes/provider";
import { mergeStyles } from "../../../utils/calculate-styles";
import { FieldContext } from "../context";
import { FieldVariants } from "../variants";

export interface FieldRootProps {
  variant?: keyof typeof FieldVariants;
  children?: React.ReactNode;

  render?: (props: FieldRootProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function FieldRoot(props: FieldRootProps) {
  const variantStyles = FieldVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("field");
  const id = useId();

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const composedStyles = [mergedStyles.root, props.style];
  const Component = props.render ?? View;
  return (
    <FieldContext.Provider value={{ styles: mergedStyles, id }}>
      <Component {...props} style={composedStyles} />
    </FieldContext.Provider>
  );
}
