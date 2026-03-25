import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import type { PropsWithRender } from "../../types/props.types";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useDescriptionList } from "./context";

export interface DescriptionListActionsProps {
  children?: React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function DescriptionListActions(props: PropsWithRender<DescriptionListActionsProps>) {
  const dl = useDescriptionList();

  const composedStyle = calculateComposedStyles(dl.styles, dl.state, "actions", props.style);

  const Component = props.render ?? View;
  return <Component {...props} style={composedStyle} />;
}
