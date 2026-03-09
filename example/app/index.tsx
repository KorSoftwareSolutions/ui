import { MainScreenLayout } from "@/components/main-screen-layout";
import { ButtonShowcase } from "@/screens/home/button-showcase";
import { CheckboxShowcase } from "@/screens/home/checkbox-showcase";
import { NotificationsShowcase } from "@/screens/home/notifications-showcase";
import { OrdersTableShowcase } from "@/screens/home/orders-table-showcase";
import { SignInShowcase } from "@/screens/home/sign-in-showcase";
import { StatsShowcase } from "@/screens/home/stats-showcase";
import { TeamMembersShowcase } from "@/screens/home/team-members-showcase";
import { Button, Icon, Separator, Typography, useTheme } from "@korsolutions/ui";
import { Link } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  const theme = useTheme();

  return (
    <MainScreenLayout title="@korsolutions/ui">
      <ScrollView contentContainerStyle={s.content} style={s.container}>
        {/* Hero Section */}
        <View style={s.hero}>
          <Typography variant="heading-lg" style={s.heroTitle}>
            Beautiful UI primitives for React Native
          </Typography>
          <Typography
            variant="body-lg"
            style={[s.heroDescription, { color: theme.colors.mutedForeground }]}
          >
            Unstyled, accessible components that you can customize to match your
            brand. Built for Expo and React Native.
          </Typography>
          <View style={s.heroCta}>
            <Link href="/components/button" asChild>
              <Button onPress={() => {}}>
                Browse Components
                <Icon render={ArrowRightIcon} />
              </Button>
            </Link>
          </View>
        </View>

        <Separator />

        {/* Showcase Blocks */}
        <View style={s.showcaseGrid}>
          <SignInShowcase />
          <OrdersTableShowcase />
          <TeamMembersShowcase />
          <NotificationsShowcase />
          <StatsShowcase />
          <ButtonShowcase />
          <CheckboxShowcase />
        </View>
      </ScrollView>
    </MainScreenLayout>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
    gap: 32,
    padding: 24,
  },
  hero: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 16,
  },
  heroTitle: {
    textAlign: "center",
  },
  heroDescription: {
    textAlign: "center",
    maxWidth: 500,
  },
  heroCta: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  showcaseGrid: {
    gap: 24,
  },
});
