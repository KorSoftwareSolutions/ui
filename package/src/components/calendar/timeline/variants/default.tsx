import { useThemedStyles } from "../../../../utils/use-themed-styles";
import type { TimelineStyles } from "../types";

const HOUR_HEIGHT = 60;
const TIME_COLUMN_WIDTH = 60;

export const useTimelineVariantDefault = (): TimelineStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): TimelineStyles => ({
      container: {
        backgroundColor: colors.background,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
      },
      timeline: {
        flexDirection: "row",
        minHeight: HOUR_HEIGHT * 24,
      },
      timeColumn: {
        width: TIME_COLUMN_WIDTH,
        borderRightWidth: 1,
        borderRightColor: colors.border,
      },
      timeSlot: {
        height: HOUR_HEIGHT,
        paddingHorizontal: 8,
        alignItems: "flex-end",
      },
      timeText: {
        fontSize: fontSize * 0.75,
        fontWeight: "500",
        fontFamily,
        color: colors.mutedForeground,
      },
      eventsColumn: {
        flex: 1,
        position: "relative",
      },
      hourLine: {
        height: HOUR_HEIGHT,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      currentTimeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: -5,
        backgroundColor: colors.danger,
      },
      currentTimeLineBar: {
        flex: 1,
        height: 2,
        backgroundColor: colors.danger,
      },
    }),
  );
};
