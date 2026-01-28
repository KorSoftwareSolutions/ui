import { useThemedStyles } from "@/utils/use-themed-styles";
import { type ToastStyles } from "../types";

export const useToastVariantDefault = (): ToastStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): ToastStyles => ({
      root: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius,
        padding: 16,
        gap: 4,
        minWidth: 300,
        maxWidth: 400,
      },
      title: {
        color: colors.foreground,
        fontSize: fontSize,
        fontWeight: "600",
        fontFamily,
      },
      description: {
        color: colors.mutedForeground,
        fontSize: fontSize * 0.875,
        fontFamily,
      },
    }),
  );
};
