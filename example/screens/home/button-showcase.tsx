import { Button, Card, Icon } from "@korsolutions/ui";
import { SearchIcon, SendIcon, SettingsIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { ShowcaseBlock } from "./showcase-block";

export function ButtonShowcase() {
  return (
    <ShowcaseBlock title="Actions">
      <Card.Body>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <Button onPress={() => {}}>
            <Icon render={SendIcon} />
            Submit
          </Button>
          <Button variant="secondary" onPress={() => {}}>
            <Icon render={SettingsIcon} />
            Settings
          </Button>
          <Button variant="ghost" onPress={() => {}}>
            <Icon render={SearchIcon} />
            Search
          </Button>
          <Button isLoading onPress={() => {}}>
            Processing...
          </Button>
        </View>
      </Card.Body>
    </ShowcaseBlock>
  );
}
