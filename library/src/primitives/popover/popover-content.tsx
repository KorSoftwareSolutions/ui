import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { usePopover } from "./context";
import { useRelativePosition } from "@/hooks/useRelativePosition";

export interface PopoverContentProps {
  children?: React.ReactNode;

  render?: (props: PopoverContentProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function PopoverContent(props: PopoverContentProps) {
  const popover = usePopover();

  const positionStyle = useRelativePosition({
    align: "start",
    avoidCollisions: true,
    triggerPosition: popover.triggerPosition,
    contentLayout: popover.contentLayout,
    alignOffset: 0,
    side: "bottom",
    sideOffset: 0,
  });

  const composedStyle = [positionStyle, popover.styles?.content, props.style];

  const Component = props.render ?? View;
  return (
    <Component
      {...props}
      onLayout={(e) => {
        popover.setContentLayout(e.nativeEvent.layout);
      }}
      style={composedStyle}
    />
  );
}
