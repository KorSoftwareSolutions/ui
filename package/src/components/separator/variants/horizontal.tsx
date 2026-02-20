import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { SeparatorStyles } from "../types";

export const useSeparatorVariantHorizontal = (): SeparatorStyles => {
  return useThemedStyles(
    ({ colors }): SeparatorStyles => ({
      root: {
        height: 1,
        alignSelf: "stretch",
        backgroundColor: colors.border,
      },
    }),
  );
};
