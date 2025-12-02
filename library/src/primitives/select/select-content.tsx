import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { calculateComposedStyles } from "../../utils/calculate-styles";
import { useSelect } from "./context";

export interface SelectContentProps {
  children?: React.ReactNode;

  render?: (props: SelectContentProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

export function SelectContent(props: SelectContentProps) {
  const select = useSelect();
  const composedStyles = calculateComposedStyles(select.styles, select.state, "content", props.style);

  const Component = props.render ?? View;
  return (
    <Component
      style={[
        composedStyles,
        {
          position: "absolute",
          top: select.triggerLayout?.y! + select.triggerLayout?.height!,
          left: select.triggerLayout?.x!,
          width: select.triggerLayout?.width!,
        },
      ]}
    >
      {props.children}
    </Component>
  );
}
