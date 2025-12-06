import { ViewStyle, TextStyle } from "react-native";
import { CalendarWeekProps, CalendarWeeksProps } from "./calendar-weeks";
import { CalendarWeekLabelProps, CalendarWeekLabelsProps } from "./calendar-week-labels";
import { CalendarDayProps } from "./calendar-day";
import { CalendarRootProps } from "./calendar-root";
import { CalendarHeaderProps } from "./calendar-header";
import { CalendarTitleProps } from "./calendar-title";

export type CalendarDayState = "default" | "selected" | "today" | "disabled" | "deprioritized" | "hovered";
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
  december: number
];
