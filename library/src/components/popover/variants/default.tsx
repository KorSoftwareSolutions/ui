import { type PopoverStyles } from "@/components/popover/types";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const usePopoverVariantDefault = (): PopoverStyles => {
  return useThemedStyles(
    ({ colors, radius }): PopoverStyles => ({
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      },
      content: {
        backgroundColor: colors.surface,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 1000,
      },
    }),
  );
};
