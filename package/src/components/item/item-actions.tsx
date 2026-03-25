import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useItem } from "./context";

export interface ItemActionsProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function ItemActions(props: PropsWithRender<ItemActionsProps>) {
  const item = useItem();

  const composedStyle = calculateComposedStyles(item.styles, item.state, "actions", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
