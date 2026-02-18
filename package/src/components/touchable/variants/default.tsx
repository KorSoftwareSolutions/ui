import type { PressableStyles } from "../types";

export const usePressableVariantDefault = (): PressableStyles => {
  return {
    default: {
      cursor: "pointer",
      pointerEvents: "box-only",
    },
    pressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },
    hovered: {
      opacity: 0.9,
    },
    disabled: {
      cursor: "not-allowed" as any,
      pointerEvents: "none",
    },
  };
};
