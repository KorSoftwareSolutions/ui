import { ThemeProvider } from "@/themes";
import { PortalHost } from "./primitives/portal";
import { ToastContainer } from "./components/toast/toast-manager";

export const UniversalUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
      <PortalHost />
      <ToastContainer />
    </ThemeProvider>
  );
};

export { useTheme } from "./themes";
