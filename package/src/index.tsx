import { AsyncAlertDialogManager } from "./components/alert-dialog/async-alert-dialog";
import { PortalHost } from "./components/portal";
import { type PortalHostProps } from "./components/portal/portal.constants";
import { ToastContainer } from "./components/toast/manager";
import { SafeAreaProvider, type SafeAreaInsets } from "./safe-area";
import {
  ThemeProvider,
  type ComponentsConfig,
  type ThemeProviderProps,
} from "./themes";

export interface ProviderProps {
  children: React.ReactNode;
  portalContainer?: PortalHostProps["container"];
  theme?: ThemeProviderProps["theme"];
  safeAreaInsets?: SafeAreaInsets;
  components?: ComponentsConfig;
}

export const UIProvider = ({
  children,
  portalContainer,
  theme,
  safeAreaInsets,
  components,
}: ProviderProps) => {
  return (
    <SafeAreaProvider insets={safeAreaInsets}>
      <ThemeProvider theme={theme} components={components}>
        <ToastContainer />
        {children}
        <PortalHost container={portalContainer} />
        <AsyncAlertDialogManager />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export * from "./hooks/use-screen-size";

export * from "./themes/adapters";
export * from "./themes/default";
export { useTheme, type ComponentsConfig } from "./themes/provider";
export * from "./themes/types";

export * from "./components";

export * from "./safe-area";
