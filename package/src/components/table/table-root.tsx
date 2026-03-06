import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useComponentConfig } from "../../themes/provider";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles, mergeStyles } from "../../utils/calculate-styles";
import { TableContext } from "./context";
import { TableVariants } from "./variants";

export interface TableRootProps {
  variant?: keyof typeof TableVariants;
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function TableRoot(props: PropsWithRender<TableRootProps>) {
  const variantStyles = TableVariants[props.variant || "default"]();
  const componentConfig = useComponentConfig("table");

  const mergedStyles = mergeStyles(variantStyles, componentConfig?.styles);

  const composedStyle = calculateComposedStyles(mergedStyles, "default", "root", props.style);

  const Component = props.render ?? View;
  return (
    <TableContext.Provider
      value={{
        state: "default",
        styles: mergedStyles,
      }}
    >
      <Component {...props} style={composedStyle} />
    </TableContext.Provider>
  );
}
