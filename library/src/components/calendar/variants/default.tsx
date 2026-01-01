import { type CalendarStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useCalendarVariantDefault = (): CalendarStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): CalendarStyles => ({
      root: {
        padding: 16,
        backgroundColor: colors.background,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        width: 324,
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
      navButton: {
        default: {
          width: 32,
          height: 32,
          borderRadius: radius * 0.5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        },
        disabled: {
          opacity: 0.3,
        },
      },
      navButtonText: {
        default: {
          fontSize: fontSize * 1.5,
          color: colors.foreground,
          fontWeight: "500",
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
      weeks: {
        flexDirection: "column",
        gap: 2,
      },
      week: {
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
        deprioritized: {
          backgroundColor: "transparent",
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
        deprioritized: {
          color: colors.mutedForeground,
          opacity: 0.5,
        },
      },
    })
  );
};
