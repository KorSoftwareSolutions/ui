import { ScrollBar } from "./components";
import { AsyncAlertDialogManager } from "./components/alert-dialog/async-alert-dialog";
import { PortalHost } from "./components/portal";
import { type PortalHostProps } from "./components/portal/portal.constants";
import { FullScreenSpinnerContainer } from "./components/full-screen-spinner/manager";
import { ToastContainer } from "./components/toast/manager";
import { useInitializeNavigationContainerRef } from "./hooks/use-is-react-navigation-modal";
import { SafeAreaProvider, type SafeAreaInsets } from "./safe-area";
import { ThemeProvider, type ThemeProviderProps } from "./themes/provider";
import type { ComponentsConfig } from "./themes/types";

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
  // Temporary fix to calculate portal content relative position correctly when rendered in a React Navigation modal.
  useInitializeNavigationContainerRef();

  return (
    <SafeAreaProvider insets={safeAreaInsets}>
      <ThemeProvider theme={theme} components={components}>
        <ScrollBar />
        <ToastContainer />
        <FullScreenSpinnerContainer />
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
export { useTheme } from "./themes/provider";
export * from "./themes/types";

export * from "./components";

export * from "./safe-area";
export type { Size } from "./utils/size-scale";
export type { SvgProps } from "./types/props.types";
