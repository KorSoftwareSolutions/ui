import { SafeAreaProvider, type SafeAreaInsets } from "@/safe-area";
import { ThemeProvider, type ThemeProviderProps } from "@/themes";
import { AsyncAlertDialogManager } from "./components/alert-dialog/async-alert-dialog";
import { PortalHost } from "./components/portal";
import { type PortalHostProps } from "./components/portal/portal.constants";
import { ToastContainer } from "./components/toast/manager";

export interface ProviderProps {
  children: React.ReactNode;
  portalContainer?: PortalHostProps["container"];
  theme?: ThemeProviderProps["theme"];
  safeAreaInsets?: SafeAreaInsets;
}

export const UIProvider = ({ children, portalContainer, theme, safeAreaInsets }: ProviderProps) => {
  return (
    <SafeAreaProvider insets={safeAreaInsets}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        {children}
        <PortalHost container={portalContainer} />
        <AsyncAlertDialogManager />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export * from "./themes/adapters";
export * from "./themes/default";
export { useTheme } from "./themes/provider";
export * from "./themes/types";

export * from "./components";

export * from "./safe-area";
