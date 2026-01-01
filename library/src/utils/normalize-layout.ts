import type { LayoutRectangle } from "react-native";
export const normalizeLayout = (layout: LayoutRectangle) => {
  const _layout = { ...layout };
  // Web layout doesn't provide x/y, but left/top
  if (!layout.y && "top" in layout && typeof layout.top === "number") {
    _layout.y = layout.top;
  }
  if (!layout.x && "left" in layout && typeof layout.left === "number") {
    _layout.x = layout.left;
  }
  return _layout;
};
