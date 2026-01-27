import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button, Card, useTheme } from "@korsolutions/ui";
import { Empty } from "@korsolutions/ui/components";
import React from "react";
import { View } from "react-native";

export default function EmptyComponentScreen() {
  const theme = useTheme();
  return (
    <ComponentScreenLayout title="Empty">
      <UseCaseSection title="Default">
        <Card.Root>
          <Empty
            media={
              <Avatar.Root>
                <Avatar.Image
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/14353231",
                  }}
                />
                <Avatar.Fallback>IK</Avatar.Fallback>
              </Avatar.Root>
            }
            title="User offline"
            description="This user is currently offline. You can leave a message to notify them or try again later."
          >
            <Button.Root>
              <Button.Label>Send message</Button.Label>
            </Button.Root>
          </Empty>
        </Card.Root>
      </UseCaseSection>
      <UseCaseSection title="Icon">
        <Card.Root>
          <Empty
            media={<MaterialCommunityIcons name="wifi-off" size={24} color={theme.colors.mutedForeground} />}
            title="Network disconnected"
            description="This device is not connected to the internet. Please check your network settings and try again."
          >
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Button.Root>
                <Button.Label>Retry connection</Button.Label>
              </Button.Root>
              <Button.Root variant="secondary">
                <Button.Label>Open settings</Button.Label>
              </Button.Root>
            </View>
          </Empty>
        </Card.Root>
      </UseCaseSection>
      <UseCaseSection title="Without media">
        <Card.Root>
          <Empty title="No notifications" description="You have no new notifications at the moment. Check back later for updates." />
        </Card.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
