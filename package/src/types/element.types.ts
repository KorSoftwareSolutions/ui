import type { HostInstance } from "react-native";

export type ViewRef = HostInstance;
export type TextInputRef = HostInstance & {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
  getNativeRef: () => HostInstance;
  setSelection: (start: number, end?: number) => void;
};

export type TextChildren = string | number | boolean | null | undefined | string[];
export type ElementChildren = React.ReactElement | React.ReactElement[];
