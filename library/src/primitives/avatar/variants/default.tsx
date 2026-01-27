import type { AvatarStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export function useAvatarVariantDefault(): AvatarStyles {
  return useThemedStyles(
    ({ colors, fontFamily, fontSize }): AvatarStyles => ({
      root: {
        backgroundColor: colors.surface,
        borderRadius: "50%",
        overflow: "hidden",
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
      },
      image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
      },
      fallback: {
        fontFamily,
        fontSize,
        color: colors.foreground,
        textAlign: "center",
        verticalAlign: "middle",
      },
    })
  );
}
