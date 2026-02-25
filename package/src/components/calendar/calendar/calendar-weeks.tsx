import React from "react";
import {
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import { getWeekDays, getWeeksInMonth } from "../../../utils/date-utils";
import { useCalendarContext } from "../shared/calendar-context";
import { CalendarDay } from "../shared/calendar-day";
import type { CalendarStyles } from "./types";

export interface CalendarWeekProps extends ViewProps {
  index: number;
  style?: StyleProp<ViewStyle>;
}

function CalendarWeek(props: CalendarWeekProps) {
  const { style, ...viewProps } = props;
  const { currentMonth, styles } = useCalendarContext();
  const calStyles = styles as CalendarStyles;

  const days = getWeekDays(
    currentMonth.getMonth(),
    currentMonth.getFullYear(),
    props.index,
  );

  const composedStyle = [calStyles?.week, style];
  return (
    <View {...viewProps} style={composedStyle}>
      {days.map((day, index) => {
        if (!day) {
          return <View key={index} style={styles?.dayButton?.default} />;
        }
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
  const calStyles = styles as CalendarStyles;

  const weeks = getWeeksInMonth(currentMonth);

  const composedStyle = [calStyles?.weeks, props.style];

  return (
    <View style={composedStyle}>
      {Array.from({ length: weeks }).map((_, index) => {
        return <CalendarWeek key={index} index={index} />;
      })}
    </View>
  );
}
