import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useItem } from "./context";

export interface ItemMediaProps {
  variant?: "default" | "icon";
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function ItemMedia(props: PropsWithRender<ItemMediaProps>) {
  const item = useItem();

  const styleKey = props.variant === "icon" ? "mediaIcon" : "media";
  const composedStyle = calculateComposedStyles(item.styles, item.state, styleKey, props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
