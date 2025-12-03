import React from "react";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { Empty, Avatar, Button, Card } from "@korsolutions/ui/components";
import { UseCaseSection } from "@/components/use-case-section";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";
import { View } from "react-native";

export default function EmptyComponentScreen() {
  const theme = useTheme();
  return (
    <ComponentScreenLayout title="Empty">
      <UseCaseSection title="Default">
        <Card>
          <Empty
            media={
              <Avatar
                source={{
                  uri: "https://avatars.githubusercontent.com/u/14353231",
                }}
                fallback="IK"
              />
            }
            title="User offline"
            description="This user is currently offline. You can leave a message to notify them or try again later."
          >
            <Button>Send message</Button>
          </Empty>
        </Card>
      </UseCaseSection>
      <UseCaseSection title="Icon">
        <Card>
          <Empty
            media={<MaterialCommunityIcons name="wifi-off" size={24} color={theme.colors.mutedForeground} />}
            title="Network disconnected"
            description="This device is not connected to the internet. Please check your network settings and try again."
          >
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Button>Retry connection</Button>
              <Button variant="secondary">Open settings</Button>
            </View>
          </Empty>
        </Card>
      </UseCaseSection>
      <UseCaseSection title="Without media">
        <Card>
          <Empty title="No notifications" description="You have no new notifications at the moment. Check back later for updates." />
        </Card>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
