export const DEFAULT_PORTAL_HOST = "__KOR_PORTAL_HOST__";

export interface PortalHostProps {
  name?: string;
  container?: {
    ios?: React.ComponentType<React.PropsWithChildren>;
    android?: React.ComponentType<React.PropsWithChildren>;
  };
}

export interface PortalProps {
  name: string;
  hostName?: string;
  children: React.ReactNode;
}
