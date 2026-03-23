import React, { useSyncExternalStore } from "react";
import { StyleSheet, Text, View } from "react-native";
import { setHSLAOpacity } from "../../utils/hsla-utils";
import { useThemedStyles } from "../../utils/use-themed-styles";
import { Portal } from "../portal";
import { Spinner } from "../spinner";

export interface FullScreenSpinnerConfig {
  description?: string;
}

type FullScreenSpinnerStore = {
  state: FullScreenSpinnerConfig | null;
  listeners: Set<() => void>;
};

const store: FullScreenSpinnerStore = {
  state: null,
  listeners: new Set(),
};

function emit() {
  for (const cb of store.listeners) cb();
}

function getSnapshot() {
  return store.state;
}

function subscribe(cb: () => void) {
  store.listeners.add(cb);
  return () => {
    store.listeners.delete(cb);
  };
}

function show(config: FullScreenSpinnerConfig = {}): void {
  store.state = config;
  emit();
}

function hide(): void {
  store.state = null;
  emit();
}

export const FullScreenSpinnerAPI = {
  show,
  hide,
};

export const FULL_SCREEN_SPINNER_PORTAL_NAME = "full-screen-spinner-portal";

export function FullScreenSpinnerContainer() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  const styles = useFullScreenSpinnerStyles();

  if (!state) return null;

  return (
    <Portal name={FULL_SCREEN_SPINNER_PORTAL_NAME}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Spinner />
          {!!state.description && <Text style={styles.description}>{state.description}</Text>}
        </View>
      </View>
    </Portal>
  );
}

const useFullScreenSpinnerStyles = () => {
  return useThemedStyles(({ colors, fontSize, fontFamily, spacing, letterSpacing, radius }) => ({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center" as const,
      alignItems: "center" as const,
      zIndex: 9999,
    },
    content: {
      alignItems: "center" as const,
      gap: spacing * 2,
      padding: spacing * 4,
      backgroundColor: setHSLAOpacity(colors.surface, 0.75),
      borderRadius: radius,
    },
    spinner: {
      color: colors.primary,
    },
    description: {
      color: colors.primary,
      fontSize: fontSize,
      fontFamily: fontFamily,
      letterSpacing: letterSpacing,
    },
  }));
};
