import { type BadgeStyles } from "../..";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useBadgeVariantSecondary = (): BadgeStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): BadgeStyles => ({
      root: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: colors.secondary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: radius,
      },
      text: {
        color: colors.secondaryForeground,
        fontSize: fontSize * 0.75,
        fontWeight: "600",
        fontFamily,
      },
      icon: {
        color: colors.secondaryForeground,
        size: fontSize * 0.75,
      },
    }),
  );
};
