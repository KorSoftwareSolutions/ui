import type { StyleProp, ViewStyle } from "react-native";
import type { BaseCalendarStyles } from "../shared/types";

export interface CalendarStyles extends BaseCalendarStyles {
  weeks?: StyleProp<ViewStyle>;
  week?: StyleProp<ViewStyle>;
}
