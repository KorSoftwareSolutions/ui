import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button } from "@korsolutions/ui";
import { DropdownMenu } from "@korsolutions/ui/components";
import React from "react";

export default function DropdownMenuComponentScreen() {
  return (
    <ComponentScreenLayout title="Dropdown Menu">
      <UseCaseSection title="Default">
        <DropdownMenu
          trigger={
            <Button.Root>
              <Button.Label>Open menu</Button.Label>
            </Button.Root>
          }
          options={[
            { type: "button", label: "Profile", onPress: () => console.log("Profile clicked") },
            { type: "button", label: "Settings", onPress: () => console.log("Settings clicked") },
            { type: "divider" },
            { type: "button", label: "Logout", onPress: () => console.log("Logout clicked") },
          ]}
        />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
