import React from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";
import type { TextChildren } from "../../types/element.types";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useDescriptionList } from "./context";

export interface DescriptionListTermProps {
  children?: TextChildren;

  style?: StyleProp<TextStyle>;
}

export function DescriptionListTerm(props: PropsWithRender<DescriptionListTermProps>) {
  const dl = useDescriptionList();

  const composedStyle = calculateComposedStyles(dl.styles, dl.state, "term", props.style);

  const Component = props.render ?? Text;
  return <Component {...props} style={composedStyle} />;
}
