import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useTable } from "./context";

export interface TableHeaderProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function TableHeader(props: PropsWithRender<TableHeaderProps>) {
  const table = useTable();

  const composedStyle = calculateComposedStyles(table.styles, table.state, "header", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
