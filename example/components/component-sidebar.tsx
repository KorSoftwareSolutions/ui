import { GithubIcon } from "@/assets/icons/GithubIcon";
import { COMPONENTS } from "@/constants/components";
import {
  Icon,
  IconButton,
  Separator,
  Sidebar,
  Typography,
  useScreenSize,
  useSidebar,
  useTheme,
} from "@korsolutions/ui";
import { Href, Link, usePathname } from "expo-router";
import { MoonIcon, PencilRulerIcon, SunIcon } from "lucide-react-native";
import React from "react";
import { Linking, Platform, View } from "react-native";
import { GITHUB_URL } from "./screen-header";

export function ComponentSidebar() {
  const theme = useTheme();
  const screenSize = useScreenSize();
  const { toggleSidebar } = useSidebar();
  const currentPath = usePathname();
  const sortedComponents = [...COMPONENTS].sort((a, b) => a.title.localeCompare(b.title));

  const isMobile = !screenSize.isDesktop;

  const isActive = (href: Href) => {
    const matchingComponents = sortedComponents.filter((component) =>
      String(component.href).startsWith(String(href)),
    );
    if (matchingComponents.length > 1) {
      return currentPath === String(href);
    }
    return currentPath.startsWith(String(href));
  };

  const openGithub = () => {
    if (Platform.OS === "web") {
      window.open(GITHUB_URL, "_blank");
    } else {
      Linking.openURL(GITHUB_URL);
    }
  };

  const ColorSchemeIcon = theme.colorScheme === "light" ? SunIcon : MoonIcon;

  return (
    <Sidebar.Root style={{ borderRightWidth: 1, borderRightColor: theme.colors.border }}>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Components</Sidebar.GroupLabel>
          <Sidebar.Menu>
            {sortedComponents.map((component) => (
              <Link key={String(component.href)} href={component.href} asChild>
                <Sidebar.MenuItem
                  isActive={isActive(component.href)}
                  onPress={isMobile ? toggleSidebar : undefined}
                >
                  <Typography>{component.title}</Typography>
                </Sidebar.MenuItem>
              </Link>
            ))}
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>

      {isMobile && (
        <Sidebar.Footer>
          <Separator />
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, paddingTop: 8 }}>
            <IconButton render={GithubIcon} variant="ghost" onPress={openGithub} />
            <Link href="/theme-selector" asChild>
              <IconButton render={PencilRulerIcon} variant="ghost" />
            </Link>
            <IconButton
              render={ColorSchemeIcon}
              variant="ghost"
              onPress={() =>
                theme.setColorScheme(theme.colorScheme === "light" ? "dark" : "light")
              }
            />
          </View>
        </Sidebar.Footer>
      )}
    </Sidebar.Root>
  );
}
