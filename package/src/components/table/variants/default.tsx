import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { TableStyles } from "../types";

export function useTableVariantDefault(): TableStyles {
  return useThemedStyles(
    ({ colors, radius }): TableStyles => ({
      root: {
        default: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius,
          overflow: "hidden",
        },
      },
      header: {
        default: {
          backgroundColor: colors.muted,
        },
      },
      body: {
        default: {},
      },
      row: {
        default: {
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
      },
      head: {
        default: {
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
      },
      cell: {
        default: {
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 12,
        },
      },
    }),
  );
}
