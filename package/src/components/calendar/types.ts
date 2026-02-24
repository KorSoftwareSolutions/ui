import type { TextStyle, ViewStyle } from "react-native";
import type { CalendarDayProps } from "./components/calendar-day";
import type { CalendarHeaderProps } from "./components/calendar-header";
import type { CalendarRootProps } from "./components/calendar-root";
import type { CalendarTitleProps } from "./components/calendar-title";
import type { CalendarWeekLabelProps, CalendarWeekLabelsProps } from "./components/calendar-week-labels";
import type { CalendarWeekProps, CalendarWeeksProps } from "./components/calendar-weeks";

export type CalendarDayState = "default" | "selected" | "today" | "disabled" | "hovered";
export type CalendarNavButtonState = "default" | "disabled" | "hovered";

export interface CalendarStyles {
  root?: CalendarRootProps["style"];
  header?: CalendarHeaderProps["style"];
  headerTitle?: CalendarTitleProps["style"];
  navButton?: Partial<Record<CalendarNavButtonState, ViewStyle>>;
  navButtonText?: Partial<Record<CalendarNavButtonState, TextStyle>>;
  weekLabels: CalendarWeekLabelsProps["style"];
  weekLabel?: CalendarWeekLabelProps["style"];
  weeks?: CalendarWeekProps["style"];
  week?: CalendarWeeksProps["style"];
  dayButton?: Partial<Record<CalendarDayState, CalendarDayProps["style"]>>;
  dayText?: Partial<Record<CalendarDayState, CalendarDayProps["textStyle"]>>;
}

export type Months = [
  january: number,
  february: number,
  march: number,
  april: number,
  may: number,
  june: number,
  july: number,
  august: number,
  september: number,
  october: number,
  november: number,
  december: number,
];
