import React, { useSyncExternalStore } from "react";
import { View, StyleSheet } from "react-native";
import { ToastComponent } from "./toast";
import { ToastVariants } from "./variants";

export interface ToastConfig {
  id: string;
  title: string;
  description?: string;
  variant?: keyof typeof ToastVariants;
  duration?: number;
}

type ToastStore = {
  toasts: ToastConfig[];
  listeners: Set<() => void>;
};

const store: ToastStore = {
  toasts: [],
  listeners: new Set(),
};

function emit() {
  for (const cb of store.listeners) cb();
}

function getSnapshot() {
  return store.toasts;
}

function subscribe(cb: () => void) {
  store.listeners.add(cb);
  return () => {
    store.listeners.delete(cb);
  };
}

function addToast(config: ToastConfig): string {
  // Check if toast with this ID already exists
  const existingToast = store.toasts.find((t) => t.id === config.id);
  if (existingToast) {
    return existingToast.id;
  }

  const toast: ToastConfig = {
    duration: 3000,
    ...config,
  };

  store.toasts = [...store.toasts, toast];
  emit();

  // Auto-dismiss after duration
  if (toast.duration) {
    setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);
  }

  return toast.id;
}

function removeToast(id: string): void {
  store.toasts = store.toasts.filter((t) => t.id !== id);
  emit();
}

export const ToastAPI = {
  show: addToast,
  dismiss: removeToast,
};

export function ToastContainer() {
  const toasts = useSyncExternalStore(subscribe, getSnapshot);

  if (!toasts.length) return null;

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map((toast) => (
        <View key={toast.id} style={styles.toastWrapper}>
          <ToastComponent title={toast.title} description={toast.description} variant={toast.variant} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 12,
    zIndex: 9999,
  },
  toastWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
