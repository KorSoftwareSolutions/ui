import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useTable } from "./context";

export interface TableBodyProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function TableBody(props: PropsWithRender<TableBodyProps>) {
  const table = useTable();

  const composedStyle = calculateComposedStyles(table.styles, table.state, "body", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
