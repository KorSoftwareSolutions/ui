import { type EmptyStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useEmptyVariantDefault(): EmptyStyles {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): EmptyStyles => ({
      root: {
        alignItems: "center",
        padding: 32,
        gap: 32,
      },
      media: {
        backgroundColor: colors.muted,
        width: 64,
        height: 64,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: colors.foreground,
        textAlign: "center",
        fontWeight: "600",
      },
      description: {
        fontFamily: fontFamily,
        fontSize: fontSize * 0.875,
        color: colors.mutedForeground,
        textAlign: "center",
      },
    })
  );
}
