import { type ButtonStyles } from "../..";
import { hslaSetRelativeLightness } from "../../../utils/hsla-utils";
import { useThemedStyles } from "../../../utils/use-themed-styles";

export const useButtonVariantGhost = (): ButtonStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): ButtonStyles => ({
      root: {
        default: {
          flexDirection: "row",
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: radius,
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        },
        disabled: {
          opacity: 0.5,
        },
        loading: {
          opacity: 0.5,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.secondary, -1),
        },
      },
      label: {
        default: {
          color: colors.foreground,
          fontSize,
          fontFamily,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
      spinner: {
        default: {
          color: colors.foreground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
    }),
  );
};
