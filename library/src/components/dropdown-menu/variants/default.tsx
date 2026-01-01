import { type DropdownMenuStyles } from "@/primitives";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const useDropdownMenuVariantDefault = (): DropdownMenuStyles => {
  return useThemedStyles(
    ({ colors, radius, fontFamily, fontSize }): DropdownMenuStyles => ({
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      content: {
        overflow: "hidden",
        backgroundColor: colors.surface,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      },
      button: {
        default: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          fontFamily: fontFamily,
          fontSize: fontSize,
          color: colors.foreground,
        },
        hovered: {
          backgroundColor: colors.muted,
        },
      },
      divider: {
        height: 1,
        backgroundColor: colors.border,
      },
    })
  );
};
