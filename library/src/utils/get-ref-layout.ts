import { LayoutRectangle, View } from "react-native";

const DEFAULT_LAYOUT: LayoutRectangle = { x: 0, y: 0, width: 0, height: 0 };

export const getRefLayout = async (ref: React.RefObject<View | null>) => {
  return new Promise<LayoutRectangle>((resolve) => {
    if (!ref?.current?.["measureInWindow"]) {
      console.warn("getRefLayout.NoRef");
      resolve(DEFAULT_LAYOUT);
      return;
    }
    ref.current.measureInWindow((x, y, width, height) => {
      resolve({ x, y, width, height });
    });
  });
};
