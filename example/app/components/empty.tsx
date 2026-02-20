import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button, Card, Empty, useTheme } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";

export default function EmptyComponentScreen() {
  const theme = useTheme();
  return (
    <ComponentScreenLayout title="Empty">
      <UseCaseSection title="Default">
        <Card.Root>
          <Empty.Root>
            <Empty.Media>
              <Avatar.Root>
                <Avatar.Image
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/14353231",
                  }}
                />
                <Avatar.Fallback>IK</Avatar.Fallback>
              </Avatar.Root>
            </Empty.Media>
            <Empty.Title>User offline</Empty.Title>
            <Empty.Description>This user is currently offline. You can leave a message to notify them or try again later.</Empty.Description>
            <Button>Send message</Button>
          </Empty.Root>
        </Card.Root>
      </UseCaseSection>
      <UseCaseSection title="Icon">
        <Card.Root>
          <Empty.Root>
            <Empty.Media>
              <MaterialCommunityIcons name="wifi-off" size={48} color={theme.colors.mutedForeground} />
            </Empty.Media>
            <Empty.Title>Network disconnected</Empty.Title>
            <Empty.Description>This device is not connected to the internet. Please check your network settings and try again.</Empty.Description>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Button>Retry connection</Button>
              <Button variant="secondary">Open settings</Button>
            </View>
          </Empty.Root>
        </Card.Root>
      </UseCaseSection>
      <UseCaseSection title="Without media">
        <Card.Root>
          <Empty.Root>
            <Empty.Title>No notifications</Empty.Title>
            <Empty.Description>You have no new notifications at the moment. Check back later for updates.</Empty.Description>
          </Empty.Root>
        </Card.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
