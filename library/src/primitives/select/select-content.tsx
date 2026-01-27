import { useRelativePosition } from "@/hooks/use-relative-position";
import { calculateComposedStyles } from "@/utils/calculate-styles";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useSelect } from "./context";

export interface SelectContentProps {
  children?: React.ReactNode;

  render?: (props: SelectContentProps) => React.ReactElement;

  style?: StyleProp<ViewStyle>;
}

export function SelectContent(props: SelectContentProps) {
  const select = useSelect();
  const composedStyles = calculateComposedStyles(select.styles, select.state, "content", props.style);

  const positionStyle = useRelativePosition({
    align: "start",
    triggerPosition: select.triggerPosition,
    contentLayout: select.contentLayout,
    alignOffset: 0,
    preferredSide: "bottom",
    sideOffset: 0,
  });

  const Component = props.render ?? View;
  return (
    <Component
      style={[positionStyle, composedStyles, { width: select.triggerPosition.width }]}
      onLayout={(e) => {
        select.setContentLayout(e.nativeEvent.layout);
      }}
      pointerEvents="box-none"
    >
      {props.children}
    </Component>
  );
}
