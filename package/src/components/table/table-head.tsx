import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useTable } from "./context";

export interface TableHeadProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function TableHead(props: PropsWithRender<TableHeadProps>) {
  const table = useTable();

  const composedStyle = calculateComposedStyles(table.styles, table.state, "head", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
