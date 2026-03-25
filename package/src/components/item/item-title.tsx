import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import type { TextChildren } from "../../types/element.types";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useItem } from "./context";

export interface ItemTitleProps {
  children?: TextChildren;
  numberOfLines?: number;

  style?: StyleProp<TextStyle>;
}

export function ItemTitle(props: PropsWithRender<ItemTitleProps>) {
  const item = useItem();

  const composedStyle = calculateComposedStyles(item.styles, item.state, "title", props.style);

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
