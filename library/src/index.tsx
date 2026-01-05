import { ThemeProvider } from "@/themes";
import { AsyncAlertDialogManager } from "./components/alert-dialog/async-alert-dialog";
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
      <AsyncAlertDialogManager />
    </ThemeProvider>
  );
};

export * from "./themes/adapters";
export { useTheme } from "./themes/provider";
export * from "./themes/types";
