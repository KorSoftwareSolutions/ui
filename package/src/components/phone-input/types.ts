import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export type PhoneInputState = "default" | "focused" | "disabled";

export interface PhoneInputStyles {
  root?: Partial<Record<PhoneInputState, StyleProp<ViewStyle>>>;
  countryButton?: Partial<Record<PhoneInputState, StyleProp<ViewStyle>>>;
  countryButtonText?: Partial<Record<PhoneInputState, StyleProp<TextStyle>>>;
  separator?: Partial<Record<PhoneInputState, StyleProp<ViewStyle>>>;
  input?: Partial<Record<PhoneInputState, StyleProp<TextStyle>>>;
  pickerOverlay?: Partial<Record<PhoneInputState, StyleProp<ViewStyle>>>;
  pickerContent?: Partial<Record<PhoneInputState, StyleProp<ViewStyle>>>;
  pickerOption?: Partial<
    Record<PhoneInputState | "selected", StyleProp<ViewStyle>>
  >;
  pickerOptionText?: Partial<
    Record<PhoneInputState | "selected", StyleProp<TextStyle>>
  >;
  pickerSearch?: Partial<Record<PhoneInputState, StyleProp<TextStyle>>>;
}
