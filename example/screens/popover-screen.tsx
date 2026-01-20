import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { DateInputDemo } from "@/components/date-input-demo";
import { UseCaseSection } from "@/components/use-case-section";
import { Typography } from "@korsolutions/ui";
import { Button, Popover } from "@korsolutions/ui/components";
import { PopoverTriggerRef } from "@korsolutions/ui/primitives";
import { router, usePathname } from "expo-router";
import React, { PropsWithChildren, useRef } from "react";
import { View } from "react-native";

const PopoverContentDemo = (props: PropsWithChildren) => {
  return (
    <View style={{ gap: 12, padding: 16, maxWidth: 300 }}>
      <Typography variant="heading-md">Popover Content</Typography>
      <Typography>This is a popover with some content inside. Click outside or press the close button to dismiss.</Typography>
      {props.children}
    </View>
  );
};

export function PopoverComponentScreen() {
  const triggerRef = useRef<PopoverTriggerRef>(null);
  const pathname = usePathname();
  const isModalScreen = pathname?.endsWith("/modal");

  return (
    <ComponentScreenLayout title={isModalScreen ? "Popover modal" : "Popover"} backHref={isModalScreen ? "/components/popover" : undefined}>
      <UseCaseSection title="Default">
        <Popover trigger={<Button>Open popover</Button>}>
          <PopoverContentDemo />
        </Popover>
      </UseCaseSection>

      <UseCaseSection title="Controlled with ref">
        <View style={{ gap: 12 }}>
          <Popover ref={triggerRef} trigger={<Button>Open controlled popover</Button>}>
            <PopoverContentDemo />
          </Popover>

          <Button onPress={() => triggerRef.current?.open()}>Open via ref</Button>
        </View>
      </UseCaseSection>

      <UseCaseSection title="Without close on overlay press">
        <Popover trigger={<Button>Open (No Close on Overlay)</Button>} closeOnOverlayPress={false}>
          {({ close }) => (
            <>
              <PopoverContentDemo>
                <Button onPress={close}>Close</Button>
              </PopoverContentDemo>
            </>
          )}
        </Popover>
      </UseCaseSection>
      <UseCaseSection title="Date input">
        <DateInputDemo />
      </UseCaseSection>
      {!isModalScreen && (
        <UseCaseSection title="In modal screen">
          <Button onPress={() => router.navigate("/components/popover/modal")} variant="secondary">
            Open Modal Screen
          </Button>
        </UseCaseSection>
      )}
      <View style={{ flex: 1 }} />
      <UseCaseSection title="Content with actions">
        <Popover trigger={<Button>Custom Content</Button>}>
          {({ close }) => (
            <PopoverContentDemo>
              <Typography>This is custom content with actions.</Typography>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <Button onPress={close} variant="secondary">
                  Cancel
                </Button>
                <Button onPress={close}>Confirm</Button>
              </View>
            </PopoverContentDemo>
          )}
        </Popover>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
