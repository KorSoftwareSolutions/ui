import { Platform } from "react-native";
import type { TextInputRef } from "../types/element.types";

export function setInnerInputValue(
  element: HTMLInputElement | TextInputRef,
  value: string,
) {
  if (Platform.OS === "web") {
    (element as HTMLInputElement).value = value;
  } else {
    (element as TextInputRef)?.setNativeProps?.({ text: value });
  }
}
