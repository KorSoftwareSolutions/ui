import { type TabsStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useTabsVariantLine = (): TabsStyles => {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): TabsStyles => ({
      list: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        gap: 0,
      },
      trigger: {
        default: {
          paddingVertical: 12,
          paddingHorizontal: 16,
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
      triggerText: {
        default: {
          color: colors.mutedForeground,
          fontSize,
          fontFamily,
        },
        active: {
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
      },
    })
  );
};
