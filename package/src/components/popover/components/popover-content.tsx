import { useRelativePosition } from "../../../hooks/use-relative-position";
import { useSafeAreaInsets } from "../../../safe-area";
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { usePopover } from "../context";

export interface PopoverContentProps {
  children?: React.ReactNode;

  render?: (props: PopoverContentProps) => React.ReactNode;

  style?: StyleProp<ViewStyle>;
}

export function PopoverContent(props: PopoverContentProps) {
  const popover = usePopover();
  const insets = useSafeAreaInsets();

  const positionStyle = useRelativePosition({
    align: "start",
    triggerPosition: popover.triggerPosition,
    contentLayout: popover.contentLayout,
    alignOffset: 0,
    preferredSide: "bottom",
    sideOffset: 0,
    insets,
  });

  const composedStyle = [positionStyle, popover.styles?.content, props.style];

  const Component = props.render ?? View;
  return (
    <Component
      {...props}
      onLayout={(e) => {
        popover.setContentLayout(e.nativeEvent.layout);
      }}
      pointerEvents="box-none"
      style={composedStyle}
    />
  );
}
