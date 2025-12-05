import React, { PropsWithChildren, useRef } from "react";
import { Button, Popover, Typography } from "@korsolutions/ui/components";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { View } from "react-native";
import type { PopoverTriggerRef } from "@korsolutions/ui/primitives";

const PopoverContentDemo = (props: PropsWithChildren) => {
  return (
    <View style={{ gap: 12 }}>
      <Typography variant="heading-md">Popover Content</Typography>
      <Typography>This is a popover with some content inside. Click outside or press the close button to dismiss.</Typography>
      {props.children}
    </View>
  );
};

export default function PopoverComponentScreen() {
  const triggerRef = useRef<PopoverTriggerRef>(null);

  return (
    <ComponentScreenLayout title="Popover">
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
              <PopoverContentDemo />
              <Button onPress={close}>Close</Button>
            </>
          )}
        </Popover>
      </UseCaseSection>
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
