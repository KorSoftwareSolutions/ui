import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { DateInputDemo } from "@/components/date-input-demo";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Popover, Typography } from "@korsolutions/ui";
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
        <Popover.Root>
          <Popover.Trigger>
            <Button.Root>
              <Button.Label>Open popover</Button.Label>
            </Button.Root>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <PopoverContentDemo />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </UseCaseSection>

      <UseCaseSection title="Controlled with ref">
        <View style={{ gap: 12 }}>
          <Popover.Root>
            <Popover.Trigger ref={triggerRef}>
              <Button.Root>
                <Button.Label>Open controlled popover</Button.Label>
              </Button.Root>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Overlay />
              <Popover.Content>
                <PopoverContentDemo />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Button.Root onPress={() => triggerRef.current?.open()}>
            <Button.Label>Open via ref</Button.Label>
          </Button.Root>
        </View>
      </UseCaseSection>

      <UseCaseSection title="Without close on overlay press">
        <Popover.Root>
          <Popover.Trigger>
            <Button.Root>
              <Button.Label>Open (No Close on Overlay)</Button.Label>
            </Button.Root>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Overlay closeOnPress={false} />
            <Popover.Content>
              <PopoverContentDemo>
                <Popover.Close>
                  <Button.Root>
                    <Button.Label>Close</Button.Label>
                  </Button.Root>
                </Popover.Close>
              </PopoverContentDemo>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </UseCaseSection>
      <UseCaseSection title="Date input">
        <DateInputDemo />
      </UseCaseSection>
      {!isModalScreen && (
        <UseCaseSection title="In modal screen">
          <Button.Root onPress={() => router.navigate("/components/popover/modal")} variant="secondary">
            <Button.Label>Open Modal Screen</Button.Label>
          </Button.Root>
        </UseCaseSection>
      )}
      <View style={{ flex: 1 }} />
      <UseCaseSection title="Content with actions">
        <Popover.Root>
          <Popover.Trigger>
            <Button.Root>
              <Button.Label>Custom Content</Button.Label>
            </Button.Root>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Overlay />
            <Popover.Content>
              <PopoverContentDemo>
                <Typography>This is custom content with actions.</Typography>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Button.Root onPress={close} variant="secondary">
                    <Button.Label>Cancel</Button.Label>
                  </Button.Root>
                  <Button.Root onPress={close}>
                    <Button.Label>Confirm</Button.Label>
                  </Button.Root>
                </View>
              </PopoverContentDemo>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
