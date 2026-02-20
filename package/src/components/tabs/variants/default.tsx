import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type TabsStyles } from "../types";

export const useTabsVariantDefault = (): TabsStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): TabsStyles => ({
      root: {
        flexDirection: "row",
        backgroundColor: colors.muted,
        padding: 4,
        borderRadius: radius,
        gap: 4,
      },
      item: {
        default: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: radius - 2,
          backgroundColor: "transparent",
        },
        active: {
          backgroundColor: colors.background,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        },
        disabled: {
          opacity: 0.5,
        },
      },
      itemText: {
        default: {
          color: colors.mutedForeground,
          fontSize,
          fontFamily,
          fontWeight: "500",
        },
        active: {
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
      itemIcon: {
        default: {
          color: colors.mutedForeground,
          size: fontSize,
        },
        active: {
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
    }),
  );
};
