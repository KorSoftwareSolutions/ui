import { FieldStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useFieldVariantDefault = (): FieldStyles => {
  return useThemedStyles(
    ({ colors, fontFamily }): FieldStyles => ({
      root: {
        flexDirection: "column",
        gap: 8,
      },
      label: {
        fontFamily,
        fontSize: 14,
        fontWeight: "600",
        color: colors.foreground,
      },
      description: {
        fontFamily,
        fontSize: 14,
        color: colors.mutedForeground,
      },
      error: {
        fontFamily,
        fontSize: 14,
        color: colors.danger,
      },
    })
  );
};
