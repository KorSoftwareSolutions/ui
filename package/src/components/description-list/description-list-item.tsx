import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useDescriptionList } from "./context";

export interface DescriptionListItemProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function DescriptionListItem(props: PropsWithRender<DescriptionListItemProps>) {
  const dl = useDescriptionList();

  const composedStyle = calculateComposedStyles(dl.styles, dl.state, "item", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
