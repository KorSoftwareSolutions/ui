import { ButtonStyles } from "@/primitives";
import { hslaSetRelativeLightness } from "@/utils/hsla-utils";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useButtonVariantSecondary = (): ButtonStyles => {
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
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.secondary,
        },
        disabled: {
          opacity: 0.5,
        },
        loading: {
          opacity: 0.8,
        },
        hovered: {
          backgroundColor: hslaSetRelativeLightness(colors.secondary, -1),
        },
      },
      label: {
        default: {
          color: colors.foreground,
          fontSize,
          fontWeight: "bold",
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
          color: colors.primaryForeground,
        },
        disabled: {
          color: colors.mutedForeground,
        },
        loading: {
          color: colors.mutedForeground,
        },
      },
    })
  );
};
