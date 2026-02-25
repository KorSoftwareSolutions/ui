import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { SpinnerStyles } from "../types";

export const useSpinnerVariantDefault = (): SpinnerStyles => {
  return useThemedStyles(
    ({ colors, fontSize }): SpinnerStyles => ({
      color: colors.primary,
      size: fontSize * 1.5,
    }),
  );
};
