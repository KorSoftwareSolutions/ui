import { hslaSetRelativeLightness } from "../../../../utils/hsla-utils";
import { useThemedStyles } from "../../../../utils/use-themed-styles";
import type { WeekCalendarStyles } from "../types";

export const useWeekCalendarVariantDefault = (): WeekCalendarStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): WeekCalendarStyles => ({
      root: {
        padding: 16,
        backgroundColor: colors.background,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingHorizontal: 8,
      },
      headerTitle: {
        fontSize: fontSize * 1.125,
        fontWeight: "600",
        fontFamily,
        color: colors.foreground,
      },
      navButtons: {
        flexDirection: "row",
        gap: 4,
      },
      navButton: {
        default: {
          width: 32,
          height: 32,
          borderRadius: radius,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        },
        disabled: {
          opacity: 0.5,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.secondary, -1),
        },
      },
      navButtonIcon: {
        default: {
          color: colors.foreground,
          size: fontSize * 1.25,
          style: {
            color: colors.foreground,
            fontSize: fontSize * 1.25,
            lineHeight: fontSize * 1.25,
            textAlign: "center",
            fontWeight: "500",
            pointerEvents: "none",
          },
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      weekLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingVertical: 8,
        gap: 2,
      },
      weekLabel: {
        fontSize: fontSize * 0.875,
        fontWeight: "500",
        fontFamily,
        color: colors.mutedForeground,
        width: 40,
        textAlign: "center",
      },
      swipeContainer: {
        overflow: "hidden",
      },
      weekStrip: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 2,
      },
      dayButton: {
        default: {
          width: 40,
          height: 40,
          borderRadius: radius * 0.5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        },
        selected: {
          backgroundColor: colors.primary,
        },
        today: {
          borderWidth: 1,
          borderColor: colors.primary,
        },
        disabled: {
          opacity: 0.3,
        },
        hovered: {
          backgroundColor: colors.muted,
        },
      },
      dayText: {
        default: {
          fontSize,
          fontFamily,
          color: colors.foreground,
          fontWeight: "400",
          pointerEvents: "none",
        },
        selected: {
          color: colors.primaryForeground,
          fontWeight: "600",
        },
        today: {
          color: colors.primary,
          fontWeight: "600",
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      dayMarker: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: colors.primary,
        marginTop: 2,
        alignSelf: "center",
      },
    }),
  );
};
