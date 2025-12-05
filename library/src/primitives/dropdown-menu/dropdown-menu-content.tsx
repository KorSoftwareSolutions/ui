import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useDropdownMenu } from "./context";
import { useRelativePosition } from "@/hooks/useRelativePosition";

export interface DropdownMenuContentProps {
  children?: React.ReactNode;

  render?: (props: DropdownMenuContentProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function DropdownMenuContent(props: DropdownMenuContentProps) {
  const menu = useDropdownMenu();

  const positionStyle = useRelativePosition({
    align: "start",
    avoidCollisions: true,
    triggerPosition: menu.triggerPosition,
    contentLayout: menu.contentLayout,
    alignOffset: 0,
    side: "bottom",
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
