import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useTable } from "./context";

export interface TableRowProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function TableRow(props: PropsWithRender<TableRowProps>) {
  const table = useTable();

  const composedStyle = calculateComposedStyles(table.styles, table.state, "row", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
