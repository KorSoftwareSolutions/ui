import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Menu } from "@korsolutions/ui";
import React from "react";

export default function MenuComponentScreen() {
  return (
    <ComponentScreenLayout title="Dropdown Menu">
      <UseCaseSection title="Default">
        <Menu.Root>
          <Menu.Trigger>
            <Button.Root>
              <Button.Label>Open menu</Button.Label>
            </Button.Root>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Item onPress={() => alert("Open clicked")}>Open</Menu.Item>
              <Menu.Item onPress={() => alert("Rename clicked")}>Rename</Menu.Item>
              <Menu.Item onPress={() => alert("Duplicate clicked")}>Duplicate</Menu.Item>
              <Menu.Item onPress={() => alert("Download clicked")}>Download</Menu.Item>
              <Menu.Item onPress={() => alert("Delete clicked")}>Delete</Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
