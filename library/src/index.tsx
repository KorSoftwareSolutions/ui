import { SafeAreaProvider, type SafeAreaInsets } from "@/safe-area";
import { ThemeProvider, type ThemeProviderProps } from "@/themes";
import { AsyncAlertDialogManager } from "./components/alert-dialog/async-alert-dialog";
import { ToastContainer } from "./components/toast/toast-manager";
import { PortalHost } from "./primitives/portal";
import { type PortalHostProps } from "./primitives/portal/portal.constants";

export interface ProviderProps {
  children: React.ReactNode;
  portalContainer?: PortalHostProps["container"];
  theme?: ThemeProviderProps["theme"];
  safeAreaInsets?: SafeAreaInsets;
}

export const UniversalUIProvider = ({ children, portalContainer, theme, safeAreaInsets }: ProviderProps) => {
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

export * from "./primitives/alert";
export * from "./primitives/avatar";
export * from "./primitives/badge";
export * from "./primitives/button";
export * from "./primitives/card";
export * from "./primitives/empty";
export * from "./primitives/field";
export * from "./primitives/input";
export * from "./primitives/link";
export * from "./primitives/list";
export * from "./primitives/popover";
export * from "./primitives/progress";
export * from "./primitives/select";
export * from "./primitives/tabs";
export * from "./primitives/textarea";
export * from "./primitives/typography";

export * from "./safe-area";
