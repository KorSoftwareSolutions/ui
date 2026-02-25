import { CalendarDay } from "../shared/calendar-day";
import { CalendarHeader } from "../shared/calendar-header";
import { CalendarNavButtons } from "../shared/calendar-nav-buttons";
import { CalendarTitle } from "../shared/calendar-title";
import { CalendarWeekLabels } from "../shared/calendar-week-labels";
import { CalendarRoot } from "./calendar-root";
import { CalendarWeeks } from "./calendar-weeks";

export const Calendar = {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Title: CalendarTitle,
  NavButtons: CalendarNavButtons,
  CalendarWeekLabels: CalendarWeekLabels,
  Weeks: CalendarWeeks,
  Day: CalendarDay,
};

export type { CalendarDayProps } from "../shared/calendar-day";
export type { CalendarHeaderProps } from "../shared/calendar-header";
export type { CalendarNavButtonsProps } from "../shared/calendar-nav-buttons";
export type { CalendarTitleProps } from "../shared/calendar-title";
export type { CalendarWeekLabelsProps } from "../shared/calendar-week-labels";
export type { CalendarRootProps } from "./calendar-root";
export type { CalendarWeeksProps } from "./calendar-weeks";
export type { CalendarStyles } from "./types";
