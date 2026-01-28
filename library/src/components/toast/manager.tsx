import { Portal } from "@/components/portal";
import { useSafeAreaInsets } from "@/safe-area";
import React, { useSyncExternalStore } from "react";
import { StyleSheet, View } from "react-native";
import { ToastDescription } from "./components/toast-description";
import { ToastRoot } from "./components/toast-root";
import { ToastTitle } from "./components/toast-title";
import { ToastVariants } from "./variants";

export const TOAST_PORTAL_NAME = "toast-portal";

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
  const insets = useSafeAreaInsets();

  if (!toasts.length) return null;

  return (
    <Portal name={TOAST_PORTAL_NAME}>
      <View style={[s.wrapper, { top: insets.top + 24 }]}>
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} title={toast.title} description={toast.description} variant={toast.variant} />
        ))}
      </View>
    </Portal>
  );
}

interface ToastProps {
  title: string;
  description?: string;

  variant?: keyof typeof ToastVariants;
}

export function ToastComponent(props: ToastProps) {
  return (
    <ToastRoot>
      <ToastTitle>{props.title}</ToastTitle>
      {!!props.description && <ToastDescription>{props.description}</ToastDescription>}
    </ToastRoot>
  );
}

const s = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    gap: 8,
  },
});
