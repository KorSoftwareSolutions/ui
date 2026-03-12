import { MainSidebar } from "@/components/main-sidebar";
import { ScreenHeader } from "@/components/screen-header";
import { componentsConfig } from "@/utils/theme-components-config";
import {
  Sidebar,
  UIProvider,
  useReactNavigationTheme,
  useScreenSize,
  useTheme,
} from "@korsolutions/ui";
import { ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import React from "react";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";
import { ThemeSelectionProvider, useThemeSelection } from "../contexts/theme-context";

const DRAWER_WIDTH = 260;

function RootRouter() {
  const theme = useTheme();
  const screenSize = useScreenSize();
  const reactNavigationTheme = useReactNavigationTheme();

  return (
    <ThemeProvider value={reactNavigationTheme}>
      <Drawer
        screenOptions={{
          drawerContentStyle: { backgroundColor: theme.colors.background },
          drawerType: screenSize.select({
            default: "front",
            desktop: "permanent",
          }),
          drawerStyle: {
            width: DRAWER_WIDTH,
          },
          header: (props) => <ScreenHeader {...props} />,
        }}
        drawerContent={() => <MainSidebar />}
      />
    </ThemeProvider>
  );
}

function ThemedApp() {
  const { currentTheme } = useThemeSelection();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <UIProvider
      portalContainer={{
        ios: FullWindowOverlay,
      }}
      theme={currentTheme}
      safeAreaInsets={safeAreaInsets}
      components={componentsConfig}
    >
      <Sidebar.Provider width={DRAWER_WIDTH}>
        <RootRouter />
      </Sidebar.Provider>
    </UIProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeSelectionProvider>
      <ThemedApp />
    </ThemeSelectionProvider>
  );
}
