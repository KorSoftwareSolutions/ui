import type { BadgeStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useBadgeVariantDefault = (): BadgeStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): BadgeStyles => ({
      root: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: colors.primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: radius,
      },
      text: {
        color: colors.primaryForeground,
        fontSize: fontSize * 0.75,
        fontWeight: "600",
        fontFamily,
      },
      icon: {
        color: colors.primaryForeground,
        size: fontSize * 0.75,
      },
    }),
  );
};
