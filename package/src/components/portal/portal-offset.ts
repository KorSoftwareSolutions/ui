import { createContext, useContext } from "react";

export interface PortalOffset {
  x: number;
  y: number;
}

export type PortalOffsetValue = PortalOffset | null | undefined;

// null means the offset is not measure yet but will be
// undefined means the offset is not available and will never be (e.g. on web or ios when FullWindowOverlay is used)
export const PortalOffsetContext = createContext<PortalOffsetValue>(undefined);

type UsePortalOffsetReturn = {
  value: PortalOffset;
  isLoaded: boolean;
};

export function usePortalOffset(): UsePortalOffsetReturn {
  const value = useContext(PortalOffsetContext);
  if (value === undefined) {
    return { value: { x: 0, y: 0 }, isLoaded: true };
  }
  if (value === null) {
    return { value: { x: 0, y: 0 }, isLoaded: false };
  }
  return { value, isLoaded: true };
}
