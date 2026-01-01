import React, { useState } from "react";
import { Pressable, Text, type PressableProps, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import { addMonths, subMonths } from "../../utils/date-utils";
import { useCalendarContext } from "./context";
import type { CalendarNavButtonState } from "./types";

export interface CalendarNavButtonProps extends PressableProps {
  children?: React.ReactNode;
  direction: "prev" | "next";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const calculateState = (isDisabled: boolean, isHovered: boolean): CalendarNavButtonState => {
  if (isDisabled) return "disabled";
  if (isHovered) return "hovered";
  return "default";
};

export function CalendarNavButton(props: CalendarNavButtonProps) {
  const { children = props.direction === "prev" ? "‹" : "›", direction, style, textStyle, ...pressableProps } = props;
  const { currentMonth, setCurrentMonth, minDate, maxDate, styles } = useCalendarContext();
  const [isHovered, setIsHovered] = useState(false);

  const isDisabled = React.useMemo(() => {
    if (direction === "prev" && minDate) {
      const prevMonth = subMonths(currentMonth, 1);
      return prevMonth < minDate;
    }
    if (direction === "next" && maxDate) {
      const nextMonth = addMonths(currentMonth, 1);
      return nextMonth > maxDate;
    }
    return false;
  }, [direction, currentMonth, minDate, maxDate]);

  const state = calculateState(isDisabled, isHovered);

  const handlePress = () => {
    if (isDisabled) return;
    const newMonth = direction === "prev" ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const buttonStyle = [styles?.navButton?.default, styles?.navButton?.[state], style];
  const textStyleCombined = [styles?.navButtonText?.default, styles?.navButtonText?.[state], textStyle];

  return (
    <Pressable
      {...pressableProps}
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      disabled={isDisabled}
      style={buttonStyle}
    >
      <Text style={textStyleCombined}>{children}</Text>
    </Pressable>
  );
}
