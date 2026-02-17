import { useRelativePosition } from "../../../hooks/use-relative-position";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { useMenu } from "../context";

export interface MenuContentProps {
  children?: React.ReactNode;

  render?: (props: MenuContentProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function MenuContent(props: MenuContentProps) {
  const menu = useMenu();

  const positionStyle = useRelativePosition({
    align: "start",
    triggerPosition: menu.triggerPosition,
    contentLayout: menu.contentLayout,
    alignOffset: 0,
    preferredSide: "bottom",
    sideOffset: 0,
  });

  const composedStyle = [positionStyle, menu.styles?.content, props.style];

  const Component = props.render ?? View;
  return (
    <Component
      {...props}
      onLayout={(e) => {
        menu.setContentLayout(e.nativeEvent.layout);
      }}
      style={composedStyle}
    />
  );
}
