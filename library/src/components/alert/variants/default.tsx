import { type AlertStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useAlertVariantDefault = (): AlertStyles => {
  return useThemedStyles(
    ({ colors, radius, fontSize }): AlertStyles => ({
      root: {
        padding: 16,
        backgroundColor: colors.background,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        gap: 12,
      },
      icon: {
        color: colors.foreground,
        size: 20,
        style: {
          marginTop: 2,
        },
      },
      body: {
        flex: 1,
      },
      title: {
        fontSize: fontSize,
        fontWeight: "600",
        color: colors.foreground,
        marginBottom: 4,
      },
      description: {
        fontSize: fontSize * 0.875,
        color: colors.mutedForeground,
        lineHeight: 20,
      },
    }),
  );
};
