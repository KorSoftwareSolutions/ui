import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { DateInputDemo } from "@/components/date-input-demo";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Popover, PopoverTriggerRef, Typography } from "@korsolutions/ui";
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
  const pathname = usePathname();
  const isModalScreen = pathname?.endsWith("/modal");

  return (
    <ComponentScreenLayout title={isModalScreen ? "Popover modal" : "Popover"} backHref={isModalScreen ? "/components/popover" : undefined}>
      <UseCaseSection title="Default">
        <DefaultExample />
      </UseCaseSection>

      <UseCaseSection title="Without close on overlay press">
        <WithoutCloseOnOverlayExample />
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
        <ContentWithActionsExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  const triggerRef = useRef<PopoverTriggerRef>(null);
  return (
    <Popover.Root>
      <Popover.Trigger ref={triggerRef}>
        <Button>Open popover</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <PopoverContentDemo>
            <Button onPress={() => triggerRef.current?.close()}>Close</Button>
          </PopoverContentDemo>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function WithoutCloseOnOverlayExample() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Open (No Close on Overlay)</Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay closeOnPress={false} />
        <Popover.Content>
          <PopoverContentDemo>
            <Popover.Close>
              <Button>Close</Button>
            </Popover.Close>
          </PopoverContentDemo>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ContentWithActionsExample() {
  const triggerRef = useRef<PopoverTriggerRef>(null);
  return (
    <Popover.Root>
      <Popover.Trigger ref={triggerRef}>
        <Button>Custom Content</Button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <PopoverContentDemo>
            <Typography>This is custom content with actions.</Typography>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Button onPress={() => triggerRef.current?.close()} variant="secondary">
                Cancel
              </Button>
              <Button onPress={() => triggerRef.current?.close()}>
                Confirm
              </Button>
            </View>
          </PopoverContentDemo>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
