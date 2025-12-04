import { ToastStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useToastVariantDanger = (): ToastStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): ToastStyles => ({
      root: {
        backgroundColor: colors.danger,
        borderWidth: 1,
        borderColor: colors.danger,
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
        color: colors.foreground,
        fontSize: fontSize * 0.875,
        fontFamily,
        opacity: 0.9,
      },
    })
  );
};
