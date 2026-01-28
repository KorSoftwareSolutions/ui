import { type ProgressStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useProgressVariantDefault = (): ProgressStyles => {
  return useThemedStyles(
    ({ colors, radius }): ProgressStyles => ({
      root: {
        default: {
          width: "100%",
          height: 8,
          backgroundColor: colors.muted,
          borderRadius: radius,
          overflow: "hidden",
        },
      },
      indicator: {
        default: {
          height: "100%",
          backgroundColor: colors.primary,
          borderRadius: radius,
        },
      },
    }),
  );
};
