import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

function getCurrentKeyboardHeight(): number {
  if (Platform.OS === "web") return 0;
  return Keyboard.metrics()?.height ?? 0;
}

/**
 * Tracks the current software keyboard height on native platforms.
 * Returns 0 when the keyboard is hidden or on web.
 *
 * Initializes with the current keyboard height so it works correctly
 * even when the keyboard is already visible at mount time.
 */
export function useKeyboardHeight(): number {
  const [keyboardHeight, setKeyboardHeight] = useState(getCurrentKeyboardHeight);

  useEffect(() => {
    if (Platform.OS === "web") return;

    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
}
