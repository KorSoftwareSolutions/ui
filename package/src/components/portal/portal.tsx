import { useEffect, useSyncExternalStore } from "react";
import { Platform, View } from "react-native";
import {
  DEFAULT_PORTAL_HOST,
  type PortalHostProps,
  type PortalProps,
} from "./portal.constants";

type PortalMap = Map<string, React.ReactNode>;
type PortalHostMap = Map<string, PortalMap>;

type PortalStore = {
  map: PortalHostMap;
  listeners: Set<() => void>;
};

const store: PortalStore = {
  map: new Map<string, PortalMap>().set(
    DEFAULT_PORTAL_HOST,
    new Map<string, React.ReactNode>(),
  ),
  listeners: new Set(),
};

function emit() {
  for (const cb of store.listeners) cb();
}

function getSnapshot() {
  return store.map;
}

function subscribe(cb: () => void) {
  store.listeners.add(cb);
  return () => {
    store.listeners.delete(cb);
  };
}

function updatePortal(
  hostName: string,
  name: string,
  children: React.ReactNode,
) {
  const next = new Map(store.map);
  const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
  portal.set(name, children);
  next.set(hostName, portal);
  store.map = next;
  emit();
}

function removePortal(hostName: string, name: string) {
  const next = new Map(store.map);
  const portal = next.get(hostName) ?? new Map<string, React.ReactNode>();
  portal.delete(name);
  next.set(hostName, portal);
  store.map = next;
  emit();
}

export function PortalHost({
  name = DEFAULT_PORTAL_HOST,
  container,
}: PortalHostProps) {
  const map = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const portalMap = map.get(name) ?? new Map<string, React.ReactNode>();
  if (portalMap.size === 0) return null;

  const Container = Platform.select({
    default: (props: React.PropsWithChildren) => (
      <View
        {...props}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 999,
          zIndex: 999,
          pointerEvents: "box-none",
        }}
      />
    ),
    ...container,
  });

  return <Container>{Array.from(portalMap.values())}</Container>;
}

export function Portal({
  name,
  hostName = DEFAULT_PORTAL_HOST,
  children,
}: PortalProps) {
  useEffect(() => {
    updatePortal(hostName, name, children);
  }, [hostName, name, children]);

  useEffect(() => {
    return () => {
      removePortal(hostName, name);
    };
  }, [hostName, name]);

  return <></>;
}
