import { type AlertStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useAlertVariantDestructive = (): AlertStyles => {
  return useThemedStyles(
    ({ colors, radius, fontSize }): AlertStyles => ({
      root: {
        padding: 16,
        backgroundColor: colors.background,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.danger,
        flexDirection: "row",
        gap: 12,
      },
      icon: {
        color: colors.danger,
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
        color: colors.danger,
        marginBottom: 4,
      },
      description: {
        fontSize: fontSize * 0.875,
        color: colors.danger,
        lineHeight: 20,
        opacity: 0.9,
      },
    }),
  );
};
