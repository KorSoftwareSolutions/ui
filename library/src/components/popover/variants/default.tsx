import { PopoverStyles } from "@/primitives/popover/types";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const usePopoverVariantDefault = (): PopoverStyles => {
  return useThemedStyles(
    ({ colors, radius }): PopoverStyles => ({
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      content: {
        backgroundColor: colors.surface,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        minWidth: 280,
        maxWidth: 320,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      },
    })
  );
};
