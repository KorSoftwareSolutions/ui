import { CalendarDay } from "./components/calendar-day";
import { CalendarHeader } from "./components/calendar-header";
import { CalendarNavButton } from "./components/calendar-nav-button";
import { CalendarRoot } from "./components/calendar-root";
import { CalendarTitle } from "./components/calendar-title";
import { CalendarWeekLabels } from "./components/calendar-week-labels";
import { CalendarWeeks } from "./components/calendar-weeks";

export const Calendar = {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Title: CalendarTitle,
  NavButton: CalendarNavButton,
  CalendarWeekLabels: CalendarWeekLabels,
  Weeks: CalendarWeeks,
  Day: CalendarDay,
};

export type { CalendarDayProps } from "./components/calendar-day";
export type { CalendarHeaderProps } from "./components/calendar-header";
export type { CalendarNavButtonProps } from "./components/calendar-nav-button";
export type { CalendarRootProps } from "./components/calendar-root";
export type { CalendarTitleProps } from "./components/calendar-title";
export type { CalendarWeekLabelsProps } from "./components/calendar-week-labels";
export type { CalendarWeeksProps } from "./components/calendar-weeks";
export type { CalendarDayState, CalendarStyles } from "./types";
