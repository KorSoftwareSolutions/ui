import { Alert, Card, Tabs } from "@korsolutions/ui";
import { BellIcon, InfoIcon } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { ShowcaseBlock } from "./showcase-block";

export function NotificationsShowcase() {
  const [tab, setTab] = useState("all");

  return (
    <ShowcaseBlock title="Feedback & Navigation">
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
      </Card.Header>
      <Card.Body>
        <Tabs.Root value={tab} onChange={setTab}>
          <Tabs.Item value="all">All</Tabs.Item>
          <Tabs.Item value="unread">Unread</Tabs.Item>
          <Tabs.Item value="archived">Archived</Tabs.Item>
        </Tabs.Root>
        <View style={{ gap: 12, marginTop: 16 }}>
          <Alert.Root>
            <Alert.Icon render={InfoIcon} />
            <Alert.Body>
              <Alert.Title>New update available</Alert.Title>
              <Alert.Description>
                Version 2.4.0 includes performance improvements.
              </Alert.Description>
            </Alert.Body>
          </Alert.Root>
          <Alert.Root variant="destructive">
            <Alert.Icon render={BellIcon} />
            <Alert.Body>
              <Alert.Title>Payment failed</Alert.Title>
              <Alert.Description>
                Please update your billing information.
              </Alert.Description>
            </Alert.Body>
          </Alert.Root>
        </View>
      </Card.Body>
    </ShowcaseBlock>
  );
}
