import { CalendarRoot } from "./calendar-root";
import { CalendarHeader } from "./calendar-header";
import { CalendarTitle } from "./calendar-title";
import { CalendarNavButton } from "./calendar-nav-button";
import { CalendarWeekLabels } from "./calendar-week-labels";
import { CalendarWeeks } from "./calendar-weeks";
import { CalendarDay } from "./calendar-day";

export const CalendarPrimitive = {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Title: CalendarTitle,
  NavButton: CalendarNavButton,
  CalendarWeekLabels: CalendarWeekLabels,
  Weeks: CalendarWeeks,
  Day: CalendarDay,
};

export type { CalendarRootProps } from "./calendar-root";
export type { CalendarHeaderProps } from "./calendar-header";
export type { CalendarTitleProps } from "./calendar-title";
export type { CalendarNavButtonProps } from "./calendar-nav-button";
export type { CalendarWeekLabelsProps } from "./calendar-week-labels";
export type { CalendarWeeksProps } from "./calendar-weeks";
export type { CalendarDayProps } from "./calendar-day";
export type { CalendarStyles, CalendarDayState } from "./types";
