import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import {
  Badge,
  Button,
  Icon,
  Separator,
  Sidebar,
  Typography,
  useSidebar,
  useTheme,
} from "@korsolutions/ui";
import {
  BookOpen,
  ChevronRight,
  Home,
  Inbox,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

function ToggleButton() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button variant="ghost" size="sm" onPress={toggleSidebar}>
      <Icon render={PanelLeft} />
      {open ? "Close" : "Open"} Sidebar
    </Button>
  );
}

function DemoSidebar() {
  const { colors } = useTheme();
  const [activeItem, setActiveItem] = useState("dashboard");
  const [docsOpen, setDocsOpen] = useState(true);

  return (
    <View
      style={{
        height: 500,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Sidebar.Provider>
        <Sidebar.Root>
          <Sidebar.Header>
            <Sidebar.MenuItem size="lg">
              <Icon render={LayoutDashboard} />
              <Typography style={{ fontWeight: "600" }}>Acme Inc</Typography>
            </Sidebar.MenuItem>
          </Sidebar.Header>

          <Sidebar.Content>
            <Sidebar.Group>
              <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
              <Sidebar.Menu>
                <Sidebar.MenuItem
                  isActive={activeItem === "dashboard"}
                  onPress={() => setActiveItem("dashboard")}
                >
                  <Icon render={Home} />
                  Dashboard
                </Sidebar.MenuItem>

                <Sidebar.MenuItem
                  isActive={activeItem === "inbox"}
                  onPress={() => setActiveItem("inbox")}
                >
                  <Icon render={Inbox} />
                  Inbox
                  <Badge variant="secondary" style={{ marginLeft: "auto" }}>
                    24
                  </Badge>
                </Sidebar.MenuItem>

                <Sidebar.MenuItem
                  isActive={activeItem === "team"}
                  onPress={() => setActiveItem("team")}
                >
                  <Icon render={Users} />
                  Team
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.Group>

            <Separator />

            <Sidebar.Group>
              <Sidebar.GroupLabel>Resources</Sidebar.GroupLabel>
              <Sidebar.Menu>
                <Sidebar.MenuItem
                  isActive={activeItem === "docs"}
                  onPress={() => setDocsOpen((prev) => !prev)}
                >
                  <Icon render={BookOpen} />
                  Documentation
                  <Icon
                    render={ChevronRight}
                    size={16}
                    color="#9ca3af"
                    style={{
                      transform: [{ rotate: docsOpen ? "90deg" : "0deg" }],
                    }}
                  />
                </Sidebar.MenuItem>
                <Sidebar.MenuSub open={docsOpen}>
                  <Sidebar.MenuItem
                    isActive={activeItem === "getting-started"}
                    onPress={() => setActiveItem("getting-started")}
                  >
                    Getting Started
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem
                    isActive={activeItem === "api-ref"}
                    onPress={() => setActiveItem("api-ref")}
                  >
                    API Reference
                  </Sidebar.MenuItem>
                </Sidebar.MenuSub>
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Content>

          <Sidebar.Footer>
            <Sidebar.Menu>
              <Sidebar.MenuItem
                isActive={activeItem === "settings"}
                onPress={() => setActiveItem("settings")}
              >
                <Icon render={Settings} />
                Settings
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Footer>
        </Sidebar.Root>

        <View style={{ padding: 16, flex: 1 }}>
          <ToggleButton />
          <Typography>
            Use the useSidebar() hook to toggle the sidebar from anywhere inside the Provider.
          </Typography>
        </View>
      </Sidebar.Provider>
    </View>
  );
}

export default function SidebarScreen() {
  return (
    <ComponentScreenLayout title="Sidebar">
      <UseCaseSection title="Default Sidebar">
        <DemoSidebar />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
