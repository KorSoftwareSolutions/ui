import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { SidebarStyles } from "../types";

export function useSidebarVariantDefault(): SidebarStyles {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize, spacing }): SidebarStyles => ({
      root: {
        height: "100%",
        flexShrink: 0,
        flexDirection: "column",
        backgroundColor: colors.surface,
        borderColor: colors.border,
        overflow: "hidden",
      },
      header: {
        paddingHorizontal: spacing * 2,
        paddingTop: spacing * 2,
        paddingBottom: spacing,
      },
      footer: {
        paddingHorizontal: spacing * 2,
        paddingTop: spacing,
        paddingBottom: spacing * 2,
      },
      content: {
        flex: 1,
        paddingHorizontal: spacing * 2,
      },
      group: {
        paddingVertical: spacing,
        gap: spacing * 0.5,
      },
      groupLabel: {
        fontFamily,
        fontSize: fontSize * 0.75,
        lineHeight: Math.round(fontSize * 0.75 * 1.25),
        fontWeight: "500",
        color: colors.mutedForeground,
        paddingHorizontal: spacing,
        paddingVertical: spacing * 0.5,
        letterSpacing: 0.5,
        textTransform: "uppercase",
      },
      menu: {
        gap: 1,
      },
      menuItem: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          gap: spacing,
          paddingVertical: spacing,
          paddingHorizontal: spacing * 1.5,
          borderRadius: radius,
          minHeight: 36,
        },
        active: {
          backgroundColor: colors.muted,
        },
        hovered: {
          backgroundColor: colors.muted,
          opacity: 0.8,
        },
      },
      menuItemText: {
        default: {
          fontFamily,
          fontSize: fontSize * 0.875,
          fontWeight: "500",
          color: colors.foreground,
          lineHeight: fontSize * 1.25,
          flex: 1,
        },
        active: {
          color: colors.primary,
        },
        hovered: {},
      },
      menuItemIcon: {
        default: {
          color: colors.foreground,
          size: fontSize * 1.25,
        },
        active: {
          color: colors.primary,
        },
      },
      menuSub: {
        paddingLeft: spacing * 3,
        gap: 1,
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
        marginLeft: spacing * 2,
      },
    }),
  );
}
