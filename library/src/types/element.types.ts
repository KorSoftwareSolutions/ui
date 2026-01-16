import type React from "react";
import type { HostInstance, TextInput } from "react-native";

export type ViewRef = HostInstance;
export type TextInputRef = React.ComponentRef<typeof TextInput>;
