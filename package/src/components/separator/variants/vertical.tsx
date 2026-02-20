import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { SeparatorStyles } from "../types";

export const useSeparatorVariantVertical = (): SeparatorStyles => {
  return useThemedStyles(
    ({ colors }): SeparatorStyles => ({
      root: {
        width: 1,
        alignSelf: "stretch",
        backgroundColor: colors.border,
      },
    }),
  );
};
