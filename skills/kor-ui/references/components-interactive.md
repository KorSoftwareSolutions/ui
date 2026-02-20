# Interactive Components Reference

Comprehensive guide to interactive components in Universal UI library. These components provide user interaction patterns like buttons, tabs, menus, popovers, and date selection.

## Table of Contents

- [Button](#button)
- [IconButton](#iconbutton)
- [Tabs](#tabs)
- [Menu](#menu)
- [Popover](#popover)
- [Calendar](#calendar)

---

## Button

A pressable button component with loading and disabled states, supporting multiple variants.

### Overview

The Button component provides a complete interactive button implementation with built-in state management for loading, disabled, and hover states. It follows the compound component pattern with separate Root, Label, and Spinner sub-components.

**When to use:**
- Primary and secondary actions in forms
- Triggering navigation or operations
- Submit buttons with loading indicators
- Any interactive clickable element requiring visual feedback

### Architecture

```typescript
Button.Root      // Container with state management
  ├─ Button.Label    // Text content
  └─ Button.Spinner  // Loading indicator
```

### Complete API

#### Button.Root

The root container managing button state and interactions.

```typescript
interface ButtonRootProps extends PressableProps {
  variant?: "default" | "secondary" | "ghost";
  children?: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `variant` - Visual style variant (default: "default")
- `isDisabled` - Disables interaction and shows disabled state
- `isLoading` - Shows loading state and prevents interaction
- `onPress` - Callback fired on button press (inherited from PressableProps)
- `style` - Additional styles to apply

**Behavior:**
- Prevents `onPress` when `isDisabled` or `isLoading`
- Automatically sets cursor based on state
- Tracks hover state for styling
- Provides context to child components

#### Button.Label

Text content for the button.

```typescript
interface ButtonLabelProps {
  children?: string;
  style?: StyleProp<TextStyle>;
}
```

**Props:**
- `children` - Button text
- `style` - Additional text styles

**Behavior:**
- Non-selectable when disabled or loading
- Automatically inherits button state for styling

#### Button.Spinner

Loading indicator displayed during async operations.

```typescript
interface ButtonSpinnerProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
}
```

**Props:**
- `color` - Spinner color (defaults to variant color)
- `style` - Additional container styles

**Behavior:**
- Uses React Native's ActivityIndicator
- Automatically inherits button state for styling

### State Management

The Button component manages four states internally:

```typescript
type ButtonState = "default" | "disabled" | "loading" | "hovered";
```

**State Transitions:**
- `isDisabled={true}` → "disabled" state
- `isLoading={true}` → "loading" state
- Mouse hover (web) → "hovered" state
- Otherwise → "default" state

**State Priority:**
1. Disabled (highest)
2. Loading
3. Hovered
4. Default (lowest)

### Variants

#### Default Variant

Primary action button with solid background.

**Visual Style:**
- Background: `colors.primary`
- Text: `colors.primaryForeground`
- Border: `colors.border`
- Hover: Darker primary color (-10% lightness)
- Disabled/Loading: 50% opacity

**Use cases:**
- Primary form actions (Submit, Save, Continue)
- Main call-to-action buttons
- Confirm actions

#### Secondary Variant

Subtle action button with muted background.

**Visual Style:**
- Background: `colors.secondary`
- Text: `colors.secondaryForeground`
- Border: `colors.border`
- Hover: Slightly darker secondary (-1% lightness)
- Disabled/Loading: 50% opacity, muted text color

**Use cases:**
- Secondary actions (Cancel, Back)
- Alternative options
- Less prominent actions

#### Ghost Variant

Transparent button with no background or border.

**Visual Style:**
- Background: transparent
- Text: `colors.foreground`
- No border
- Hover: Subtle secondary background (-1% lightness)
- Disabled/Loading: 50% opacity, muted text color

**Use cases:**
- Toolbar actions
- Inline actions that blend with content
- Icon + text buttons in navigation
- Actions that should not draw attention

### Basic Examples

#### Simple Button

```typescript
import { Button } from "@korsolutions/ui";

function Example() {
  return (
    <Button.Root onPress={() => console.log("Pressed")}>
      <Button.Label>Submit</Button.Label>
    </Button.Root>
  );
}
```

#### Disabled State

```typescript
function DisabledExample() {
  return (
    <Button.Root isDisabled onPress={() => console.log("Won't fire")}>
      <Button.Label>Disabled</Button.Label>
    </Button.Root>
  );
}
```

#### Loading State

```typescript
function LoadingExample() {
  return (
    <Button.Root isLoading onPress={() => console.log("Won't fire")}>
      <Button.Spinner />
      <Button.Label>Loading...</Button.Label>
    </Button.Root>
  );
}
```

#### Secondary Variant

```typescript
function SecondaryExample() {
  return (
    <Button.Root variant="secondary" onPress={() => console.log("Secondary")}>
      <Button.Label>Cancel</Button.Label>
    </Button.Root>
  );
}
```

#### Ghost Variant

```typescript
function GhostExample() {
  return (
    <Button.Root variant="ghost" onPress={() => console.log("Ghost")}>
      <Button.Label>Settings</Button.Label>
    </Button.Root>
  );
}
```

### Advanced Examples

#### Async Operation with Loading State

```typescript
import { Button } from "@korsolutions/ui";
import { useState } from "react";

function AsyncExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/submit", { method: "POST" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button.Root isLoading={isLoading} onPress={handleSubmit}>
      {isLoading && <Button.Spinner />}
      <Button.Label>{isLoading ? "Submitting..." : "Submit"}</Button.Label>
    </Button.Root>
  );
}
```

#### Form with Primary and Secondary Actions

```typescript
function FormActions({ onSubmit, onCancel }) {
  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      <Button.Root variant="secondary" onPress={onCancel}>
        <Button.Label>Cancel</Button.Label>
      </Button.Root>
      <Button.Root onPress={onSubmit}>
        <Button.Label>Save Changes</Button.Label>
      </Button.Root>
    </View>
  );
}
```

### Common Patterns

#### Button with Icon

```typescript
import { Icon } from "@korsolutions/ui";
import { SaveIcon } from "lucide-react-native";

function IconButton() {
  return (
    <Button.Root onPress={() => console.log("Save")}>
      <Icon render={SaveIcon} size={20} />
      <Button.Label>Save</Button.Label>
    </Button.Root>
  );
}
```

#### Conditional Rendering Based on State

```typescript
function ConditionalButton({ hasChanges }) {
  return (
    <Button.Root isDisabled={!hasChanges} onPress={() => console.log("Save")}>
      <Button.Label>Save Changes</Button.Label>
    </Button.Root>
  );
}
```

---

## IconButton

An icon-only pressable button component. Uses the same render prop pattern as Icon.

### Overview

IconButton is a simple (non-compound) component that wraps a single icon in a pressable container. It shares the same variant system as Button (default, secondary, ghost).

**When to use:**
- Toolbar actions (settings, close, delete)
- Icon-only actions where a label is unnecessary
- Navigation icons
- Compact action buttons

### Complete API

```typescript
interface IconButtonProps extends Omit<PressableProps, "disabled" | "children"> {
  render: (props: SvgProps) => React.ReactNode;
  variant?: "default" | "secondary" | "ghost";
  isDisabled?: boolean;
  size?: number;
  color?: ColorValue;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `render` - Icon component (e.g., from lucide-react-native)
- `variant` - Visual style variant (default: "default")
- `isDisabled` - Disables interaction
- `size` - Icon size in pixels
- `color` - Icon color (overrides variant color)
- `strokeWidth` - Icon stroke width
- `onPress` - Callback fired on press (inherited from PressableProps)
- `style` - Additional container styles

### Variants

| Variant | Background | Icon Color | Use Case |
|---------|-----------|------------|----------|
| default | `colors.primary` | `colors.primaryForeground` | Primary actions |
| secondary | `colors.secondary` | `colors.secondaryForeground` | Secondary actions |
| ghost | transparent | `colors.foreground` | Subtle/toolbar actions |

### Examples

#### Basic Usage

```typescript
import { IconButton } from "@korsolutions/ui";
import { Heart, Settings, Trash } from "lucide-react-native";

// Default variant
<IconButton render={Heart} onPress={() => console.log("Liked")} />

// Secondary
<IconButton render={Settings} variant="secondary" onPress={openSettings} />

// Ghost (common for toolbars)
<IconButton render={Settings} variant="ghost" onPress={openSettings} />
```

#### Custom Size and Color

```typescript
<IconButton render={Heart} size={32} />
<IconButton render={Trash} variant="ghost" color="red" />
```

#### Disabled

```typescript
<IconButton render={Heart} isDisabled />
```

#### Toolbar Pattern

```typescript
function Toolbar() {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      <IconButton render={Bold} variant="ghost" onPress={toggleBold} />
      <IconButton render={Italic} variant="ghost" onPress={toggleItalic} />
      <IconButton render={Underline} variant="ghost" onPress={toggleUnderline} />
    </View>
  );
}
```

---

## Tabs

A tab navigation component for switching between different content views.

### Overview

The Tabs component provides a controlled tab navigation system with support for multiple variants and disabled states. It uses a value/onChange pattern for state management.

**When to use:**
- Switching between related content sections
- Navigation within a single page
- Organizing content into categories
- Filter or view mode selection

### Architecture

```typescript
Tabs.Root              // State container
  └─ Tabs.List         // Container for triggers
       └─ Tabs.Trigger // Individual tab button
            └─ Tabs.TriggerText  // Tab label
```

### Complete API

#### Tabs.Root

Root container managing active tab state.

```typescript
interface TabsRootProps extends Omit<ViewProps, "children"> {
  variant?: "default" | "line";
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `variant` - Visual style variant (default: "default")
- `value` - Currently active tab value (controlled)
- `onChange` - Callback when tab changes
- `children` - Tabs.List and content components
- `style` - Additional container styles

#### Tabs.List

Container for tab triggers.

```typescript
interface TabsListProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `children` - Tabs.Trigger components
- `style` - Additional list styles

#### Tabs.Trigger

Individual tab button.

```typescript
interface TabsTriggerProps extends PressableProps {
  children: React.ReactNode;
  value: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `value` - Unique identifier for this tab
- `isDisabled` - Prevents tab selection
- `children` - Typically Tabs.TriggerText
- `style` - Additional trigger styles

**Behavior:**
- Compares `value` with parent `value` to determine active state
- Calls `onChange` with tab value on press
- Prevents interaction when disabled

#### Tabs.TriggerText

Text label for tab trigger.

```typescript
interface TabsTriggerTextProps {
  children: string;
  value: string;
  style?: StyleProp<TextStyle>;
}
```

**Props:**
- `children` - Tab label text
- `value` - Must match parent Trigger value
- `style` - Additional text styles

### State Management

Tabs use controlled state with three internal states:

```typescript
type TabsState = "default" | "active" | "disabled";
```

**State Determination:**
- `value === triggerValue` → "active"
- `isDisabled={true}` → "disabled"
- Otherwise → "default"

### Variants

#### Default Variant

Pill-style tabs with background highlighting.

**Visual Style:**
- List: Muted background with padding and gap
- Inactive: Transparent background
- Active: Background color with shadow
- Border radius: Theme radius

**Use cases:**
- Settings panels
- Compact navigation
- Modal tab sections

#### Line Variant

Underline-style tabs.

**Visual Style:**
- List: Bottom border
- Inactive: Transparent underline
- Active: Primary color underline
- No background change

**Use cases:**
- Page-level navigation
- Content sections
- More traditional tab appearance

### Basic Examples

#### Simple Tabs

```typescript
import { Tabs } from "@korsolutions/ui";
import { useState } from "react";

function SimpleTabs() {
  const [value, setValue] = useState("tab1");

  return (
    <Tabs.Root value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="tab1">
          <Tabs.TriggerText value="tab1">First Tab</Tabs.TriggerText>
        </Tabs.Trigger>
        <Tabs.Trigger value="tab2">
          <Tabs.TriggerText value="tab2">Second Tab</Tabs.TriggerText>
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">
          <Tabs.TriggerText value="tab3">Third Tab</Tabs.TriggerText>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
```

#### Line Variant

```typescript
function LineTabs() {
  const [value, setValue] = useState("overview");

  return (
    <Tabs.Root variant="line" value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="overview">
          <Tabs.TriggerText value="overview">Overview</Tabs.TriggerText>
        </Tabs.Trigger>
        <Tabs.Trigger value="details">
          <Tabs.TriggerText value="details">Details</Tabs.TriggerText>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
```

#### With Disabled Tab

```typescript
function DisabledTabs() {
  const [value, setValue] = useState("enabled");

  return (
    <Tabs.Root value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="enabled">
          <Tabs.TriggerText value="enabled">Enabled</Tabs.TriggerText>
        </Tabs.Trigger>
        <Tabs.Trigger value="disabled" isDisabled>
          <Tabs.TriggerText value="disabled">Disabled</Tabs.TriggerText>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
```

### Advanced Examples

#### Tabs with Content Panels

```typescript
function ContentTabs() {
  const [value, setValue] = useState("profile");

  return (
    <View>
      <Tabs.Root value={value} onChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="profile">
            <Tabs.TriggerText value="profile">Profile</Tabs.TriggerText>
          </Tabs.Trigger>
          <Tabs.Trigger value="settings">
            <Tabs.TriggerText value="settings">Settings</Tabs.TriggerText>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {value === "profile" && <ProfilePanel />}
      {value === "settings" && <SettingsPanel />}
    </View>
  );
}
```

#### Dynamic Tabs from Data

```typescript
function DynamicTabs() {
  const tabs = [
    { value: "all", label: "All Items", disabled: false },
    { value: "active", label: "Active", disabled: false },
    { value: "archived", label: "Archived", disabled: true },
  ];

  const [value, setValue] = useState(tabs[0].value);

  return (
    <Tabs.Root value={value} onChange={setValue}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value} isDisabled={tab.disabled}>
            <Tabs.TriggerText value={tab.value}>{tab.label}</Tabs.TriggerText>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
```

### Common Patterns

#### Tabs with Badge Counts

```typescript
function TabsWithCounts() {
  const [value, setValue] = useState("inbox");

  return (
    <Tabs.Root value={value} onChange={setValue}>
      <Tabs.List>
        <Tabs.Trigger value="inbox">
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Tabs.TriggerText value="inbox">Inbox</Tabs.TriggerText>
            <Badge count={12} />
          </View>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
```

---

## Menu

A dropdown menu component with trigger, overlay, and menu items.

### Overview

The Menu component (also called Dropdown Menu) provides a floating menu that appears relative to a trigger element. It uses portal rendering for proper layering and includes automatic positioning.

**When to use:**
- Context menus
- Action dropdowns
- Option selectors
- More actions buttons

### Architecture

```typescript
Menu.Root              // State container
  ├─ Menu.Trigger      // Button that opens menu
  └─ Menu.Portal       // Portal for overlay layer
       ├─ Menu.Overlay     // Backdrop (closes on click)
       └─ Menu.Content     // Menu container
            └─ Menu.Item   // Individual menu option
```

### Complete API

#### Menu.Root

Root container managing menu open/closed state and positioning.

```typescript
interface MenuRootProps {
  variant?: "default";
  children?: React.ReactNode;
}
```

**Props:**
- `variant` - Visual style variant (currently only "default")
- `children` - Menu.Trigger and Menu.Portal

**Internal State:**
- `isOpen` - Whether menu is visible
- `triggerPosition` - Screen position of trigger element
- `contentLayout` - Dimensions of menu content

#### Menu.Trigger

Wrapper for the trigger element (typically a button).

```typescript
interface MenuTriggerProps extends PressableProps {
  children: React.ReactElement<PressableProps>;
}

interface MenuTriggerRef {
  open: () => void;
  close: () => void;
}
```

**Props:**
- `children` - Single pressable element (e.g., Button.Root)

**Behavior:**
- Clones child element and adds menu toggle functionality
- Measures trigger position for menu placement
- Sets accessibility attributes (role, expanded state)

**Ref Methods:**
- `open()` - Programmatically open menu
- `close()` - Programmatically close menu

#### Menu.Portal

Portal container for rendering overlay and content.

```typescript
interface MenuPortalProps {
  children?: React.ReactNode;
}
```

**Props:**
- `children` - Menu.Overlay and Menu.Content

**Behavior:**
- Only renders children when `isOpen` is true
- Renders into portal layer above normal content

#### Menu.Overlay

Full-screen backdrop that closes menu on click.

```typescript
interface MenuOverlayProps {
  children?: React.ReactNode;
  render?: (props: MenuOverlayProps) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `render` - Custom component (default: Pressable)
- `style` - Additional overlay styles

**Behavior:**
- Fills entire screen (absolute positioning)
- Closes menu when pressed
- Semi-transparent background

#### Menu.Content

Container for menu items with automatic positioning.

```typescript
interface MenuContentProps {
  children?: React.ReactNode;
  render?: (props: MenuContentProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `children` - Menu.Item components
- `render` - Custom container component
- `style` - Additional content styles

**Behavior:**
- Positioned relative to trigger using `useRelativePosition`
- Measures own layout for positioning calculations
- Default position: below trigger, aligned to start

#### Menu.Item

Individual menu option.

```typescript
interface MenuItemProps {
  children: string;
  onPress?: () => void;
  render?: (props: MenuItemProps) => React.ReactNode;
  style?: StyleProp<TextStyle>;
}
```

**Props:**
- `children` - Menu item label
- `onPress` - Callback when item is selected
- `render` - Custom component (default: Text)
- `style` - Additional item styles

**Behavior:**
- Closes menu automatically after press
- Tracks hover state for visual feedback
- Uses text component by default

### State Management

```typescript
type MenuButtonState = "default" | "hovered";
```

**Menu States:**
- `isOpen` - Boolean controlling visibility
- Item states: "default" or "hovered" (on web)

### Positioning with useRelativePosition

The Menu.Content uses the `useRelativePosition` hook for smart positioning:

```typescript
useRelativePosition({
  align: "start",              // Horizontal alignment
  triggerPosition,             // Trigger element position
  contentLayout,               // Menu content dimensions
  alignOffset: 0,              // Horizontal offset
  preferredSide: "bottom",     // Preferred vertical side
  sideOffset: 0,              // Vertical offset
});
```

**Positioning Logic:**
1. Measures trigger element position
2. Calculates available space in all directions
3. Positions menu on preferred side if space available
4. Falls back to opposite side if needed
5. Adjusts horizontal position to stay within viewport

### Basic Examples

#### Simple Menu

```typescript
import { Button, Menu } from "@korsolutions/ui";

function SimpleMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button.Root>
          <Button.Label>Options</Button.Label>
        </Button.Root>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Overlay />
        <Menu.Content>
          <Menu.Item onPress={() => console.log("Edit")}>Edit</Menu.Item>
          <Menu.Item onPress={() => console.log("Duplicate")}>Duplicate</Menu.Item>
          <Menu.Item onPress={() => console.log("Delete")}>Delete</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

#### With Custom Trigger

```typescript
function CustomTriggerMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Pressable style={customButtonStyle}>
          <Text>⋮</Text>
        </Pressable>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Overlay />
        <Menu.Content>
          <Menu.Item onPress={() => {}}>Action 1</Menu.Item>
          <Menu.Item onPress={() => {}}>Action 2</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

### Advanced Examples

#### Menu with Actions

```typescript
function ActionsMenu({ itemId, onEdit, onDelete }) {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button.Root variant="secondary">
          <Button.Label>Actions</Button.Label>
        </Button.Root>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Overlay />
        <Menu.Content>
          <Menu.Item onPress={() => onEdit(itemId)}>Edit</Menu.Item>
          <Menu.Item onPress={() => navigator.share({ url: `/item/${itemId}` })}>
            Share
          </Menu.Item>
          <Menu.Item onPress={() => onDelete(itemId)}>Delete</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

#### Programmatic Control with Ref

```typescript
import { useRef } from "react";

function RefControlledMenu() {
  const menuRef = useRef<MenuTriggerRef>(null);

  const openMenu = () => {
    menuRef.current?.open();
  };

  return (
    <>
      <Button.Root onPress={openMenu}>
        <Button.Label>Open Menu</Button.Label>
      </Button.Root>

      <Menu.Root>
        <Menu.Trigger ref={menuRef}>
          <View /> {/* Hidden trigger */}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Overlay />
          <Menu.Content>
            <Menu.Item onPress={() => {}}>Item</Menu.Item>
          </Menu.Content>
        </Menu.Portal>
      </Menu.Root>
    </>
  );
}
```

### Common Patterns

#### Context Menu for List Items

```typescript
function ListItemWithMenu({ item }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={{ flex: 1 }}>{item.name}</Text>
      <Menu.Root>
        <Menu.Trigger>
          <Button.Root variant="secondary">
            <Button.Label>⋮</Button.Label>
          </Button.Root>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Overlay />
          <Menu.Content>
            <Menu.Item onPress={() => {}}>View</Menu.Item>
            <Menu.Item onPress={() => {}}>Edit</Menu.Item>
            <Menu.Item onPress={() => {}}>Delete</Menu.Item>
          </Menu.Content>
        </Menu.Portal>
      </Menu.Root>
    </View>
  );
}
```

---

## Popover

A floating content container positioned relative to a trigger element.

### Overview

The Popover component is similar to Menu but designed for richer content like forms, descriptions, or complex UI elements. It uses the same positioning system as Menu.

**When to use:**
- Additional information or help text
- Quick forms or inputs
- Detailed descriptions
- Custom content in a floating panel

### Architecture

```typescript
Popover.Root              // State container
  ├─ Popover.Trigger      // Element that opens popover
  └─ Popover.Portal       // Portal for overlay layer
       ├─ Popover.Overlay     // Optional backdrop
       ├─ Popover.Content     // Main content container
       └─ Popover.Close       // Close button
```

### Complete API

#### Popover.Root

Root container managing popover state.

```typescript
interface PopoverRootProps {
  variant?: "default";
  children?: React.ReactNode;
}
```

**Props:**
- `variant` - Visual style variant
- `children` - Popover.Trigger and Popover.Portal

#### Popover.Trigger

Wrapper for trigger element.

```typescript
interface PopoverTriggerProps extends PressableProps {
  children: React.ReactElement<PressableProps>;
}

interface PopoverTriggerRef {
  open: () => void;
  close: () => void;
}
```

**Props & Behavior:**
- Same as Menu.Trigger
- Measures position and toggles popover

#### Popover.Portal

Portal container for overlay and content.

```typescript
interface PopoverPortalProps {
  children?: React.ReactNode;
}
```

#### Popover.Overlay

Optional backdrop (can be omitted for no backdrop).

```typescript
interface PopoverOverlayProps {
  children?: React.ReactNode;
  render?: (props: PopoverOverlayProps) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
}
```

#### Popover.Content

Content container with automatic positioning.

```typescript
interface PopoverContentProps {
  children?: React.ReactNode;
  render?: (props: PopoverContentProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Behavior:**
- Uses `useRelativePosition` hook
- Respects safe area insets
- Default position: below trigger, aligned to start

#### Popover.Close

Close button component.

```typescript
interface PopoverCloseProps {
  children: React.ReactElement<PressableProps>;
}
```

**Props:**
- `children` - Pressable element to act as close button

**Behavior:**
- Clones child and adds close functionality

### Positioning with useRelativePosition

Same as Menu, the Popover.Content uses `useRelativePosition`:

```typescript
useRelativePosition({
  align: "start",
  triggerPosition: popover.triggerPosition,
  contentLayout: popover.contentLayout,
  alignOffset: 0,
  preferredSide: "bottom",
  sideOffset: 0,
  insets, // Safe area insets
});
```

**Configuration Options:**
- `align`: "start" | "center" | "end" - Horizontal alignment
- `preferredSide`: "top" | "bottom" - Vertical placement preference
- `alignOffset`: Horizontal offset in pixels
- `sideOffset`: Vertical offset in pixels
- `insets`: SafeAreaInsets for mobile positioning

### Basic Examples

#### Simple Popover

```typescript
import { Button, Popover } from "@korsolutions/ui";

function SimplePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button.Root>
          <Button.Label>Show Info</Button.Label>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <View style={{ padding: 16 }}>
            <Text>This is additional information</Text>
            <Popover.Close>
              <Button.Root variant="secondary">
                <Button.Label>Close</Button.Label>
              </Button.Root>
            </Popover.Close>
          </View>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

#### Without Overlay

```typescript
function TooltipStylePopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button.Root>
          <Button.Label>Hover me</Button.Label>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        {/* No Overlay - clicking outside still closes */}
        <Popover.Content>
          <View style={{ padding: 12 }}>
            <Text>Quick tip or info</Text>
          </View>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

### Advanced Examples

#### Popover with Form

```typescript
function FormPopover() {
  const [name, setName] = useState("");

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button.Root>
          <Button.Label>Add Item</Button.Label>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <View style={{ padding: 16, gap: 12, minWidth: 280 }}>
            <Typography variant="h3">Add New Item</Typography>
            <Input.Root value={name} onChangeText={setName} placeholder="Item name" />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Popover.Close>
                <Button.Root variant="secondary" style={{ flex: 1 }}>
                  <Button.Label>Cancel</Button.Label>
                </Button.Root>
              </Popover.Close>
              <Button.Root style={{ flex: 1 }} onPress={() => console.log(name)}>
                <Button.Label>Add</Button.Label>
              </Button.Root>
            </View>
          </View>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

### Common Patterns

#### Help Tooltip

```typescript
function HelpTooltip({ title, description }) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Pressable>
          <Icon render={HelpCircleIcon} size={16} />
        </Pressable>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <View style={{ padding: 12, maxWidth: 240 }}>
            <Typography variant="body-sm-bold">{title}</Typography>
            <Typography variant="body-sm">{description}</Typography>
          </View>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

---

## Calendar

A date picker component with month navigation and date selection.

### Overview

The Calendar component provides a full-featured date picker with month/year navigation, date range constraints, and visual states for selected, today, and disabled dates.

**When to use:**
- Date input fields
- Date range pickers
- Scheduling interfaces
- Filtering by date

### Architecture

```typescript
Calendar.Root              // State container
  ├─ Calendar.Header       // Month/year navigation
  │    ├─ Calendar.NavButton   // Previous/next month
  │    └─ Calendar.Title       // Current month/year
  ├─ Calendar.WeekLabels   // Day name headers (S M T W T F S)
  └─ Calendar.Weeks        // Grid of dates
       └─ Calendar.Day     // Individual date button
```

### Complete API

#### Calendar.Root

Root container managing selected date and current month.

```typescript
interface CalendarRootProps {
  variant?: "default";
  children?: React.ReactNode;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `variant` - Visual style variant
- `value` - Currently selected date (controlled)
- `onChange` - Callback when date is selected
- `defaultMonth` - Initial month to display (default: current month)
- `minDate` - Earliest selectable date
- `maxDate` - Latest selectable date
- `style` - Additional container styles

#### Calendar.Header

Container for navigation and title.

```typescript
interface CalendarHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

#### Calendar.Title

Displays current month and year.

```typescript
interface CalendarTitleProps {
  style?: StyleProp<TextStyle>;
}
```

**Behavior:**
- Automatically displays current month from context
- Format: "January 2026"

#### Calendar.NavButton

Previous/next month navigation button.

```typescript
interface CalendarNavButtonProps {
  direction: "prev" | "next";
  render: (props: SvgProps) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `direction` - "prev" for previous month, "next" for next month
- `render` - Icon component (e.g., ChevronLeftIcon)
- `style` - Additional button styles

**Behavior:**
- Navigates to previous/next month
- Automatically disabled if minDate/maxDate would be exceeded

#### Calendar.WeekLabels

Day name headers (Sun, Mon, Tue, etc.).

```typescript
interface CalendarWeekLabelsProps {
  weekDays?: string[];
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `weekDays` - Custom day labels (default: ["S", "M", "T", "W", "T", "F", "S"])
- `style` - Container styles

#### Calendar.Weeks

Grid container for all dates in the month.

```typescript
interface CalendarWeeksProps {
  style?: StyleProp<ViewStyle>;
}
```

**Behavior:**
- Automatically renders all weeks for current month
- Includes dates from previous/next month to fill grid

#### Calendar.Day

Individual date button.

```typescript
interface CalendarDayProps {
  date: Date;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
```

**Props:**
- `date` - Date this button represents
- `onPress` - Override default selection behavior
- `style` - Additional button styles
- `textStyle` - Additional text styles

**Behavior:**
- Calls `onChange` with date when pressed
- Automatically disabled if outside minDate/maxDate range
- Visual states: default, selected, today, disabled, deprioritized, hovered

### State Management

```typescript
type CalendarDayState =
  | "default"
  | "selected"
  | "today"
  | "disabled"
  | "deprioritized"
  | "hovered";
```

**State Priority:**
1. Disabled (outside date range)
2. Selected (matches value)
3. Today (current date)
4. Hovered (mouse over on web)
5. Deprioritized (dates outside current month)
6. Default

**Date States:**
- `selected` - Matches current value
- `today` - Is today's date
- `disabled` - Outside min/max range or disabled
- `deprioritized` - From previous/next month (faded)
- `hovered` - Mouse hover on web

### Basic Examples

#### Simple Date Picker

```typescript
import { Calendar } from "@korsolutions/ui";
import { useState } from "react";

function SimpleDatePicker() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Calendar.Root value={date} onChange={setDate}>
      <Calendar.Header>
        <Calendar.Title />
      </Calendar.Header>
      <Calendar.WeekLabels />
      <Calendar.Weeks />
    </Calendar.Root>
  );
}
```

#### With Navigation Buttons

```typescript
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";

function NavigableCalendar() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <Calendar.Root value={date} onChange={setDate}>
      <Calendar.Header>
        <Calendar.NavButton direction="prev" render={ChevronLeftIcon} />
        <Calendar.Title />
        <Calendar.NavButton direction="next" render={ChevronRightIcon} />
      </Calendar.Header>
      <Calendar.WeekLabels />
      <Calendar.Weeks />
    </Calendar.Root>
  );
}
```

#### With Date Range Constraints

```typescript
function ConstrainedCalendar() {
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return (
    <Calendar.Root
      value={date}
      onChange={setDate}
      minDate={today}
      maxDate={nextMonth}
    >
      <Calendar.Header>
        <Calendar.Title />
      </Calendar.Header>
      <Calendar.WeekLabels />
      <Calendar.Weeks />
    </Calendar.Root>
  );
}
```

### Advanced Examples

#### Date Picker in Popover

```typescript
function DatePickerPopover() {
  const [date, setDate] = useState<Date | null>(null);

  const handleDateSelect = (newDate: Date | null) => {
    setDate(newDate);
    // Popover.Close would be used here
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button.Root>
          <Button.Label>
            {date ? date.toLocaleDateString() : "Select date"}
          </Button.Label>
        </Button.Root>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content>
          <Calendar.Root value={date} onChange={handleDateSelect}>
            <Calendar.Header>
              <Calendar.NavButton direction="prev" render={ChevronLeftIcon} />
              <Calendar.Title />
              <Calendar.NavButton direction="next" render={ChevronRightIcon} />
            </Calendar.Header>
            <Calendar.WeekLabels />
            <Calendar.Weeks />
          </Calendar.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

#### Future Dates Only

```typescript
function FutureDatePicker() {
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  return (
    <Calendar.Root value={date} onChange={setDate} minDate={today}>
      <Calendar.Header>
        <Calendar.Title />
      </Calendar.Header>
      <Calendar.WeekLabels />
      <Calendar.Weeks />
    </Calendar.Root>
  );
}
```

#### Custom Week Day Labels

```typescript
function CustomLabelsCalendar() {
  const [date, setDate] = useState<Date | null>(null);
  const customDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <Calendar.Root value={date} onChange={setDate}>
      <Calendar.Header>
        <Calendar.Title />
      </Calendar.Header>
      <Calendar.WeekLabels weekDays={customDays} />
      <Calendar.Weeks />
    </Calendar.Root>
  );
}
```

### Common Patterns

#### Form Field with Date Picker

```typescript
function DateField({ label, value, onChange }) {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      <Popover.Root>
        <Popover.Trigger>
          <Input.Root
            value={value?.toLocaleDateString() || ""}
            placeholder="Select date"
            editable={false}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content>
            <Calendar.Root value={value} onChange={onChange}>
              <Calendar.Header>
                <Calendar.Title />
              </Calendar.Header>
              <Calendar.WeekLabels />
              <Calendar.Weeks />
            </Calendar.Root>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </Field.Root>
  );
}
```

#### Clear Button

```typescript
function ClearableDatePicker() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <View>
      <Calendar.Root value={date} onChange={setDate}>
        <Calendar.Header>
          <Calendar.Title />
        </Calendar.Header>
        <Calendar.WeekLabels />
        <Calendar.Weeks />
      </Calendar.Root>
      {date && (
        <Button.Root
          variant="secondary"
          onPress={() => setDate(null)}
          style={{ marginTop: 12 }}
        >
          <Button.Label>Clear Selection</Button.Label>
        </Button.Root>
      )}
    </View>
  );
}
```

---

## Related Documentation

- [Component Development Guide](../../library/CLAUDE.md) - How components are built
- [Theme System](./theme-system.md) - Theming and styling
- [Hooks Reference](./hooks.md) - useRelativePosition and other hooks
- [Form Components](./components-forms.md) - Input, Field, Select, etc.

## Notes

**Import Patterns:**

```typescript
// Named imports
import { Button, IconButton, Tabs, Menu, Popover, Calendar } from "@korsolutions/ui";

// Individual imports
import { Button } from "@korsolutions/ui/components";
```

**Platform Considerations:**
- Hover states only work on web
- Touch interactions optimized for mobile
- Keyboard navigation (future enhancement)
- Safe area insets respected on mobile

**Accessibility:**
- All interactive components support accessibility props
- Proper roles and states set automatically
- Label associations maintained
- Focus management for keyboard navigation
