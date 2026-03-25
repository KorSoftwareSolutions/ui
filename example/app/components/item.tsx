import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Item } from "@korsolutions/ui";
import { BellIcon, FileIcon, MailIcon, StarIcon, UserIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function ItemComponentScreen() {
  return (
    <ComponentScreenLayout title="Item">
      <UseCaseSection title="Default">
        <Item.Root>
          <Item.Media variant="icon">
            <MailIcon size={18} color="hsl(0, 0%, 45%)" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Inbox</Item.Title>
            <Item.Description>You have 3 unread messages</Item.Description>
          </Item.Content>
        </Item.Root>
      </UseCaseSection>

      <UseCaseSection title="With Actions">
        <Item.Root>
          <Item.Media variant="icon">
            <UserIcon size={18} color="hsl(0, 0%, 45%)" />
          </Item.Media>
          <Item.Content>
            <Item.Title>John Doe</Item.Title>
            <Item.Description>Software Engineer</Item.Description>
          </Item.Content>
          <Item.Actions>
            <Button variant="secondary" size="sm" onPress={() => {}}>
              View
            </Button>
          </Item.Actions>
        </Item.Root>
      </UseCaseSection>

      <UseCaseSection title="Outline Variant">
        <View style={{ gap: 8 }}>
          <Item.Root variant="outline">
            <Item.Media variant="icon">
              <FileIcon size={18} color="hsl(0, 0%, 45%)" />
            </Item.Media>
            <Item.Content>
              <Item.Title>project-proposal.pdf</Item.Title>
              <Item.Description>2.4 MB</Item.Description>
            </Item.Content>
          </Item.Root>
          <Item.Root variant="outline">
            <Item.Media variant="icon">
              <FileIcon size={18} color="hsl(0, 0%, 45%)" />
            </Item.Media>
            <Item.Content>
              <Item.Title>meeting-notes.docx</Item.Title>
              <Item.Description>1.1 MB</Item.Description>
            </Item.Content>
          </Item.Root>
        </View>
      </UseCaseSection>

      <UseCaseSection title="Muted Variant">
        <Item.Root variant="muted">
          <Item.Media variant="icon">
            <BellIcon size={18} color="hsl(0, 0%, 45%)" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Notifications enabled</Item.Title>
            <Item.Description>You will receive push notifications</Item.Description>
          </Item.Content>
        </Item.Root>
      </UseCaseSection>

      <UseCaseSection title="Sizes">
        <View style={{ gap: 8 }}>
          <Item.Root size="default" variant="outline">
            <Item.Media variant="icon">
              <StarIcon size={18} color="hsl(0, 0%, 45%)" />
            </Item.Media>
            <Item.Content>
              <Item.Title>Default size</Item.Title>
              <Item.Description>Standard item layout</Item.Description>
            </Item.Content>
          </Item.Root>
          <Item.Root size="sm" variant="outline">
            <Item.Media variant="icon">
              <StarIcon size={16} color="hsl(0, 0%, 45%)" />
            </Item.Media>
            <Item.Content>
              <Item.Title>Small size</Item.Title>
              <Item.Description>Compact item layout</Item.Description>
            </Item.Content>
          </Item.Root>
          <Item.Root size="xs" variant="outline">
            <Item.Media variant="icon">
              <StarIcon size={14} color="hsl(0, 0%, 45%)" />
            </Item.Media>
            <Item.Content>
              <Item.Title>Extra small</Item.Title>
              <Item.Description>Most condensed layout</Item.Description>
            </Item.Content>
          </Item.Root>
        </View>
      </UseCaseSection>

      <UseCaseSection title="Title Only">
        <Item.Root variant="outline">
          <Item.Media variant="icon">
            <UserIcon size={18} color="hsl(0, 0%, 45%)" />
          </Item.Media>
          <Item.Content>
            <Item.Title>Simple item with title only</Item.Title>
          </Item.Content>
        </Item.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
