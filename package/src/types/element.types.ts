import type { HostInstance } from "react-native";
import type { SvgProps } from "./props.types";

export type ViewRef = HostInstance;
export type TextInputRef = HostInstance & {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
  getNativeRef: () => HostInstance;
  setSelection: (start: number, end?: number) => void;
};

export type TextChild = string | number | bigint | boolean | null | undefined;
export type TextChildren = TextChild | TextChild[];
export type ElementChildren = React.ReactElement | React.ReactElement[];

export type IconComponent = (props: SvgProps) => React.ReactElement;
