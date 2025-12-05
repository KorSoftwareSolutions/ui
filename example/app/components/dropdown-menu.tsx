import React from "react";
import { Button, DropdownMenu } from "@korsolutions/ui/components";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";

export default function DropdownMenuComponentScreen() {
  return (
    <ComponentScreenLayout title="Dropdown Menu">
      <UseCaseSection title="Default">
        <DropdownMenu
          trigger={<Button>Open menu</Button>}
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
