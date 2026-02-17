import { type BadgeStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useBadgeVariantSecondary = (): BadgeStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): BadgeStyles => ({
      root: {
        default: {
          backgroundColor: colors.secondary,
          paddingVertical: 4,
          paddingHorizontal: 8,
          borderRadius: radius,
          alignSelf: "flex-start",
        },
      },
      label: {
        default: {
          color: colors.secondaryForeground,
          fontSize: fontSize * 0.75,
          fontWeight: "600",
          fontFamily,
        },
      },
    }),
  );
};
