import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Icon, Menu } from "@korsolutions/ui";
import {
  BookmarkIcon,
  Copy,
  Download,
  LinkIcon,
  LogOut,
  Pencil,
  Settings,
  Trash2,
  User,
} from "lucide-react-native";
import React, { useState } from "react";

export default function MenuComponentScreen() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [person, setPerson] = useState("pedro");

  return (
    <ComponentScreenLayout title="Dropdown Menu">
      <UseCaseSection title="Default">
        <Menu.Root>
          <Menu.Trigger>
            <Button>Open menu</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Item onPress={() => alert("Open clicked")}>Open</Menu.Item>
              <Menu.Item onPress={() => alert("Rename clicked")}>
                <Icon render={Pencil} />
                Rename
              </Menu.Item>
              <Menu.Item onPress={() => alert("Duplicate clicked")}>
                <Icon render={Copy} />
                Duplicate
              </Menu.Item>
              <Menu.Item onPress={() => alert("Download clicked")}>
                <Icon render={Download} />
                Download
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item onPress={() => alert("Delete clicked")}>
                <Icon render={Trash2} />
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </UseCaseSection>

      <UseCaseSection title="With Groups, Labels & Separators">
        <Menu.Root>
          <Menu.Trigger>
            <Button>My Account</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Label>My Account</Menu.Label>
              <Menu.Separator />
              <Menu.Group>
                <Menu.Item onPress={() => {}}>
                  <Icon render={User} />
                  Profile
                </Menu.Item>
                <Menu.Item onPress={() => {}}>
                  <Icon render={Settings} />
                  Settings
                </Menu.Item>
              </Menu.Group>
              <Menu.Separator />
              <Menu.Group>
                <Menu.Item onPress={() => {}}>
                  <Icon render={LogOut} />
                  Log out
                </Menu.Item>
              </Menu.Group>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </UseCaseSection>

      <UseCaseSection title="Checkbox Items">
        <Menu.Root>
          <Menu.Trigger>
            <Button>View Options</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Label>Appearance</Menu.Label>
              <Menu.Separator />
              <Menu.CheckboxItem
                checked={showBookmarks}
                onCheckedChange={setShowBookmarks}
              >
                <Icon render={BookmarkIcon} />
                Show Bookmarks
              </Menu.CheckboxItem>
              <Menu.CheckboxItem
                checked={showFullUrls}
                onCheckedChange={setShowFullUrls}
              >
                <Icon render={LinkIcon} />
                Show Full URLs
              </Menu.CheckboxItem>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </UseCaseSection>

      <UseCaseSection title="Radio Items">
        <Menu.Root>
          <Menu.Trigger>
            <Button>Select Person</Button>
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Overlay />
            <Menu.Content>
              <Menu.Label>People</Menu.Label>
              <Menu.Separator />
              <Menu.RadioGroup value={person} onValueChange={setPerson}>
                <Menu.RadioItem value="pedro">Pedro</Menu.RadioItem>
                <Menu.RadioItem value="colm">Colm</Menu.RadioItem>
                <Menu.RadioItem value="pedro-pascal">
                  Pedro Pascal
                </Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Content>
          </Menu.Portal>
        </Menu.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
