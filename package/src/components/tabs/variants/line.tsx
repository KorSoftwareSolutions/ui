import { type TabsStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useTabsVariantLine = (): TabsStyles => {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): TabsStyles => ({
      root: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      },
      item: {
        default: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginBottom: -1,
          borderBottomWidth: 2,
          borderBottomColor: "transparent",
          backgroundColor: "transparent",
        },
        active: {
          borderBottomColor: colors.primary,
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
