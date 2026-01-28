import { type TabsStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useTabsVariantDefault = (): TabsStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): TabsStyles => ({
      list: {
        flexDirection: "row",
        backgroundColor: colors.muted,
        padding: 4,
        borderRadius: radius,
        gap: 4,
      },
      trigger: {
        default: {
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: radius,
          backgroundColor: "transparent",
        },
        active: {
          backgroundColor: colors.background,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
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
    }),
  );
};
