import { LayoutRectangle } from "react-native";
export const normalizeLayout = (layout: LayoutRectangle) => {
  // Web layout doesn't provide x/y, but left/top
  if (!layout.y && "top" in layout && typeof layout.top === "number") {
    layout.y = layout.top;
  }
  if (!layout.x && "left" in layout && typeof layout.left === "number") {
    layout.x = layout.left;
  }
  return layout;
};
