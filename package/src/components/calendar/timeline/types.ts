import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface TimelineStyles {
  container?: StyleProp<ViewStyle>;
  timeline?: StyleProp<ViewStyle>;
  timeColumn?: StyleProp<ViewStyle>;
  timeSlot?: StyleProp<ViewStyle>;
  timeText?: StyleProp<TextStyle>;
  eventsColumn?: StyleProp<ViewStyle>;
  hourLine?: StyleProp<ViewStyle>;
  currentTimeDot?: StyleProp<ViewStyle>;
  currentTimeLineBar?: StyleProp<ViewStyle>;
}
