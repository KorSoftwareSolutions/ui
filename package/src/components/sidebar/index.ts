import { SidebarContent } from "./components/sidebar-content";
import { SidebarFooter } from "./components/sidebar-footer";
import { SidebarGroup } from "./components/sidebar-group";
import { SidebarGroupLabel } from "./components/sidebar-group-label";
import { SidebarHeader } from "./components/sidebar-header";
import { SidebarMenuItem } from "./components/sidebar-menu-item";
import { SidebarMenuSub } from "./components/sidebar-menu-sub";
import { SidebarMenu } from "./components/sidebar-menu";
import { SidebarProvider } from "./components/sidebar-provider";
import { SidebarRoot } from "./components/sidebar-root";

export const Sidebar = {
  Provider: SidebarProvider,
  Root: SidebarRoot,
  Header: SidebarHeader,
  Footer: SidebarFooter,
  Content: SidebarContent,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuSub: SidebarMenuSub,
};

export { useSidebar } from "./context";

export type { SidebarProviderProps } from "./components/sidebar-provider";
export type { SidebarRootProps } from "./components/sidebar-root";
export type { SidebarHeaderProps } from "./components/sidebar-header";
export type { SidebarFooterProps } from "./components/sidebar-footer";
export type { SidebarContentProps } from "./components/sidebar-content";
export type { SidebarGroupProps } from "./components/sidebar-group";
export type { SidebarGroupLabelProps } from "./components/sidebar-group-label";
export type { SidebarMenuProps } from "./components/sidebar-menu";
export type { SidebarMenuItemProps } from "./components/sidebar-menu-item";
export type { SidebarMenuSubProps } from "./components/sidebar-menu-sub";
export type { SidebarStyles, SidebarState } from "./types";
