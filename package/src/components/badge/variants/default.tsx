import type { BadgeStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useBadgeVariantDefault = (): BadgeStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): BadgeStyles => ({
      root: {
        default: {
          backgroundColor: colors.primary,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: radius,
          alignSelf: "flex-start",
        },
      },
      label: {
        default: {
          color: colors.primaryForeground,
          fontSize: fontSize * 0.75,
          fontWeight: "600",
          fontFamily,
        },
      },
    }),
  );
};
