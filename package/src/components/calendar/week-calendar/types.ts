import type { StyleProp, ViewStyle } from "react-native";
import type { BaseCalendarStyles } from "../shared/types";

export interface WeekCalendarStyles extends BaseCalendarStyles {
  weekStrip?: StyleProp<ViewStyle>;
  swipeContainer?: StyleProp<ViewStyle>;
}
