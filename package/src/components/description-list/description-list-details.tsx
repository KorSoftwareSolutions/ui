import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useDescriptionList } from "./context";

export interface DescriptionListDetailsProps {
  children?: React.ReactNode;

  style?: StyleProp<TextStyle>;
}

export function DescriptionListDetails(props: PropsWithRender<DescriptionListDetailsProps>) {
  const dl = useDescriptionList();

  const composedStyle = calculateComposedStyles(dl.styles, dl.state, "details", props.style);

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
