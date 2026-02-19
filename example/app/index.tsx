import { ComponentListItem } from "@/components/component-list-item";
import { MainScreenLayout } from "@/components/main-screen-layout";
import { COMPONENTS } from "@/constants/components";
import { Card, List, useTheme } from "@korsolutions/ui";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Home() {
  const theme = useTheme();

  const sortedComponents = [...COMPONENTS].sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  return (
    <MainScreenLayout title="@korsolutions/ui">
      <ScrollView contentContainerStyle={s.content} style={s.container}>
        <Card.Root>
          <List
            data={sortedComponents}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <ComponentListItem {...item} />}
            renderSeparator={() => (
              <View
                style={{ backgroundColor: theme.colors.border, height: 1 }}
              />
            )}
          />
        </Card.Root>
        <Card.Root>
          <ComponentListItem title="Theme" href="/theme" />
        </Card.Root>
      </ScrollView>
    </MainScreenLayout>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  content: {
    flexGrow: 1,
    overflow: "hidden",
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
    gap: 24,
  },
});
