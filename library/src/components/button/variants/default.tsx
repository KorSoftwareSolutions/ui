import { ButtonStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useButtonVariantDefault = (): ButtonStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily }): ButtonStyles => ({
      root: {
        default: {
          flexDirection: "row",
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: radius,
          gap: 8,
          alignItems: "center",
          justifyContent: "center",
        },
        disabled: {
          opacity: 0.5,
        },
        loading: {
          opacity: 0.8,
        },
      },
      label: {
        default: {
          color: colors.primaryForeground,
          fontSize: 16,
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
    })
  );
};
