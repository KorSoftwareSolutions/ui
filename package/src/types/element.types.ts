import type { TextInput, View } from "react-native";
import type { SvgProps } from "./props.types";

export type ViewRef = React.ComponentRef<typeof View>;
export type TextInputRef = React.ComponentRef<typeof TextInput>;

export type TextChild = string | number | bigint | boolean | null | undefined;
export type TextChildren = TextChild | TextChild[];
export type ElementChildren = React.ReactElement | React.ReactElement[];

export type IconComponent = (props: SvgProps) => React.ReactElement;
