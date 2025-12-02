import { ThemeProvider } from "@/themes";
import { PortalHost } from "./primitives/portal";

export const UniversalUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      {children}
      <PortalHost />
    </ThemeProvider>
  );
};

export { useTheme } from "./themes";
