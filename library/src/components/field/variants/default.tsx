import { type FieldStyles } from "@/components";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useFieldVariantDefault = (): FieldStyles => {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): FieldStyles => ({
      root: {
        flexDirection: "column",
        gap: 8,
      },
      label: {
        fontFamily,
        fontSize: fontSize * 0.875,
        fontWeight: "600",
        color: colors.foreground,
      },
      description: {
        fontFamily,
        fontSize: fontSize * 0.875,
        color: colors.mutedForeground,
      },
      error: {
        fontFamily,
        fontSize: fontSize * 0.875,
        color: colors.danger,
      },
    }),
  );
};
