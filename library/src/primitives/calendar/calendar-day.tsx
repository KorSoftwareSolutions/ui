import React, { useMemo, useState } from "react";
import { Text, StyleProp, TextStyle, ViewStyle, Pressable } from "react-native";
import { formatDate, isDateSameDay, isDateToday, isDateBefore, isDateAfter, isSameMonth } from "@/utils/date-utils";
import { useCalendarContext } from "./context";
import { CalendarDayState } from "./types";

export interface CalendarDayProps {
  date: Date;
  onPress?: () => void;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const calculateState = (
  date: Date,
  selected: Date | null | undefined,
  isCurrentMonth: boolean,
  isDisabled: boolean,
  isHovered: boolean
): CalendarDayState => {
  if (isDisabled) return "disabled";
  if (selected && isDateSameDay(date, selected)) return "selected";
  if (isDateToday(date)) return "today";
  if (isHovered) return "hovered";
  if (!isCurrentMonth) return "deprioritized";
  return "default";
};

export function CalendarDay(props: CalendarDayProps) {
  const calendar = useCalendarContext();
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentMonth = isSameMonth(props.date, calendar.currentMonth);

  const isDisabled = useMemo(() => {
    if (calendar.minDate && isDateBefore(props.date, calendar.minDate)) return true;
    if (calendar.maxDate && isDateAfter(props.date, calendar.maxDate)) return true;
    return false;
  }, [props.date, calendar.minDate, calendar.maxDate]);

  const state = calculateState(props.date, calendar.value, isCurrentMonth, isDisabled, isHovered);

  const handlePress = () => {
    console.log("Day pressed:", isDisabled, calendar.onChange);
    if (isDisabled || !calendar.onChange) return;
    calendar.onChange(props.date);
  };

  const composedStyle = [calendar.styles?.dayButton?.default, calendar.styles?.dayButton?.[state], props.style];
  const composedTextStyle = [calendar.styles?.dayText?.default, calendar.styles?.dayText?.[state], props.textStyle];

  return (
    <Pressable
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      disabled={isDisabled}
      style={composedStyle}
    >
      <Text style={composedTextStyle}>{formatDate(props.date, "d")}</Text>
    </Pressable>
  );
}
