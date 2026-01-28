import { type PopoverStyles } from "@/components/popover/types";
import { useThemedStyles } from "@/utils/use-themed-styles";

export const usePopoverVariantUnstyled = (): PopoverStyles => {
  return useThemedStyles(
    (): PopoverStyles => ({
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      content: {},
    }),
  );
};
