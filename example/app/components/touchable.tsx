import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Card, Input, Touchable, Typography } from "@korsolutions/ui";
import React from "react";

export default function TouchableComponentScreen() {
  return (
    <ComponentScreenLayout title="Touchable">
      <UseCaseSection title="Card">
        <Touchable onPress={() => console.log("Pressed")}>
          <Card.Root>
            <Card.Body>
              <Typography>Press me</Typography>
            </Card.Body>
          </Card.Root>
        </Touchable>
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Touchable isDisabled onPress={() => console.log("Pressed")}>
          <Card.Root>
            <Card.Body>
              <Typography>Disabled</Typography>
            </Card.Body>
          </Card.Root>
        </Touchable>
      </UseCaseSection>
      <UseCaseSection title="Input">
        <Touchable onPress={() => console.log("Styled press")}>
          <Input value="Some input value" placeholder="Press me" readOnly />
        </Touchable>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
