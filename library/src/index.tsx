import { ThemeProvider } from "@/themes";
import { ToastContainer } from "./components/toast/toast-manager";
import { PortalHost } from "./primitives/portal";
import { type PortalHostProps } from "./primitives/portal/portal.constants";

export interface ProviderProps {
  children: React.ReactNode;

  portalContainer?: PortalHostProps["container"];
}

export const UniversalUIProvider = ({ children, portalContainer }: ProviderProps) => {
  return (
    <ThemeProvider>
      <ToastContainer />
      {children}
      <PortalHost container={portalContainer} />
    </ThemeProvider>
  );
};

export * from "./themes/adapters";
export { useTheme } from "./themes/provider";
export * from "./themes/types";
