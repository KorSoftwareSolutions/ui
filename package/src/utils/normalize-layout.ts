import type { HostInstance, LayoutRectangle } from "react-native";
import type { LayoutPosition } from "../hooks";

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

const isValidNumber = (value: unknown): value is number => {
  const isValid = typeof value === "number" && !isNaN(value) && isFinite(value);
  if (!isValid) {
    console.warn(`Expected a valid number but received: ${value}`);
  }
  return isValid;
};

export const measureLayoutPosition = (
  ref: HostInstance | null,
  callback: (layout: LayoutPosition) => void,
) => {
  if (ref && "getBoundingClientRect" in ref) {
    const rect = (ref as unknown as { getBoundingClientRect: () => DOMRect }).getBoundingClientRect();
    callback({
      height: isValidNumber(rect.height) ? rect.height : 0,
      width: isValidNumber(rect.width) ? rect.width : 0,
      pageX: isValidNumber(rect.x) ? rect.x : 0,
      pageY: isValidNumber(rect.y) ? rect.y : 0,
    });
    return;
  }
  ref?.measureInWindow((pageX, pageY, width, height) => {
    callback({
      height: isValidNumber(height) ? height : 0,
      width: isValidNumber(width) ? width : 0,
      pageX: isValidNumber(pageX) ? pageX : 0,
      pageY: isValidNumber(pageY) ? pageY : 0,
    });
  });
};
