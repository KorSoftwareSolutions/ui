import { getWeekDays, getWeeksInMonth } from "../../../utils/date-utils";
import React from "react";
import { View, type StyleProp, type ViewProps, type ViewStyle } from "react-native";
import { useCalendarContext } from "../context";
import { CalendarDay } from "./calendar-day";

export interface CalendarWeekProps extends ViewProps {
  index: number;

  style?: StyleProp<ViewStyle>;
}

function CalendarWeek(props: CalendarWeekProps) {
  const { style, ...viewProps } = props;
  const { currentMonth, styles } = useCalendarContext();

  const days = getWeekDays(currentMonth.getMonth(), currentMonth.getFullYear(), props.index);

  const composedStyle = [styles?.week, style];
  return (
    <View {...viewProps} style={composedStyle}>
      {days.map((day, index) => {
        return <CalendarDay key={index} date={day} />;
      })}
    </View>
  );
}

export interface CalendarWeeksProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

export function CalendarWeeks(props: CalendarWeeksProps) {
  const { currentMonth, styles } = useCalendarContext();

  const weeks = getWeeksInMonth(currentMonth);

  const composedStyle = [styles?.weeks, props.style];

  return (
    <View style={composedStyle}>
      {Array.from({ length: weeks }).map((_, index) => {
        return <CalendarWeek key={index} index={index} />;
      })}
    </View>
  );
}
