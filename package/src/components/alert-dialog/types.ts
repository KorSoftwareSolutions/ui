import type { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface AlertDialogStyles {
  overlay?: StyleProp<ViewStyle>;
  content?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  description?: StyleProp<TextStyle>;
  footer?: StyleProp<ViewStyle>;
  action?: StyleProp<ViewStyle>;
  actionText?: StyleProp<TextStyle>;
  cancel?: StyleProp<ViewStyle>;
  cancelText?: StyleProp<TextStyle>;
}
