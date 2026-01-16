export const DEFAULT_PORTAL_HOST = "__KOR_PORTAL_HOST__";

export interface PortalHostProps {
  name?: string;
  container?: {
    ios?: React.ComponentType<{ children: React.ReactNode }>;
    android?: React.ComponentType<{ children: React.ReactNode }>;
  };
}

export interface PortalProps {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}
