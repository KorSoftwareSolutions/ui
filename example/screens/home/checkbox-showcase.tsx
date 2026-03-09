import { Card, Checkbox } from "@korsolutions/ui";
import React, { useState } from "react";
import { View } from "react-native";
import { ShowcaseBlock } from "./showcase-block";

export function CheckboxShowcase() {
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [updates, setUpdates] = useState(true);

  return (
    <ShowcaseBlock title="Selection">
      <Card.Header>
        <Card.Title>Email Preferences</Card.Title>
      </Card.Header>
      <Card.Body>
        <View style={{ gap: 4 }}>
          <Checkbox.Root value={notifications} onChange={setNotifications} variant="outlined">
            <Checkbox.Indicator />
            <Checkbox.Content>
              <Checkbox.Title>Activity notifications</Checkbox.Title>
              <Checkbox.Description>
                Get notified when someone mentions you
              </Checkbox.Description>
            </Checkbox.Content>
          </Checkbox.Root>
          <Checkbox.Root value={marketing} onChange={setMarketing} variant="outlined">
            <Checkbox.Indicator />
            <Checkbox.Content>
              <Checkbox.Title>Marketing emails</Checkbox.Title>
              <Checkbox.Description>
                Receive product updates and promotions
              </Checkbox.Description>
            </Checkbox.Content>
          </Checkbox.Root>
          <Checkbox.Root value={updates} onChange={setUpdates} variant="outlined">
            <Checkbox.Indicator />
            <Checkbox.Content>
              <Checkbox.Title>Security updates</Checkbox.Title>
              <Checkbox.Description>
                Important security patches and alerts
              </Checkbox.Description>
            </Checkbox.Content>
          </Checkbox.Root>
        </View>
      </Card.Body>
    </ShowcaseBlock>
  );
}
