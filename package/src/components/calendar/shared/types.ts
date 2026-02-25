import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import type { IconProps } from "../../icon";

export type CalendarDayState =
  | "default"
  | "selected"
  | "today"
  | "disabled"
  | "hovered";
export type CalendarNavButtonState = "default" | "disabled" | "hovered";

export interface BaseCalendarStyles {
  root?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  headerTitle?: StyleProp<TextStyle>;
  navButtons?: StyleProp<ViewStyle>;
  navButton?: Partial<Record<CalendarNavButtonState, ViewStyle>>;
  navButtonIcon?: Partial<Record<CalendarNavButtonState, IconProps>>;
  weekLabels?: StyleProp<ViewStyle>;
  weekLabel?: StyleProp<TextStyle>;
  dayButton?: Partial<Record<CalendarDayState, StyleProp<ViewStyle>>>;
  dayText?: Partial<Record<CalendarDayState, StyleProp<TextStyle>>>;
  dayMarker?: StyleProp<ViewStyle>;
}
