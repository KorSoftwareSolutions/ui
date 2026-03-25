# Layout Components Reference

Complete reference for layout and structural components in Universal UI. These components handle content organization, rendering, and portal management.

## Table of Contents

1. [Card](#card)
2. [DescriptionList](#descriptionlist)
3. [Item](#item)
4. [Separator](#separator)
5. [Portal](#portal)
6. [List](#list)
7. [Table](#table)
8. [Sidebar](#sidebar)

---

## Card

Flexible container component for grouping related content with consistent styling. Uses a compound component pattern with Root, Header, Title, Body, and Footer sub-components.

### When to Use

- Grouping related content (forms, user profiles, product cards)
- Creating bordered sections with padding
- Building dashboard layouts
- Displaying structured information with headers and actions

### Component Structure

```typescript
import { Card } from "@korsolutions/ui";

<Card.Root variant="default">
  <Card.Header>
    <Card.Title>Title text</Card.Title>
  </Card.Header>
  <Card.Body>
    {/* Main content */}
  </Card.Body>
  <Card.Footer>
    {/* Actions or metadata */}
  </Card.Footer>
</Card.Root>
```

### Card.Root

Root container that provides context and styling to all sub-components.

#### Props

```typescript
interface CardRootProps {
  variant?: keyof typeof CardVariants;  // "default" (default)
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;    // Custom render component
}
```

#### Default Styles (variant="default")

```typescript
{
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: radius,
  backgroundColor: colors.surface,
}
```

#### Example

```typescript
<Card.Root variant="default">
  {/* Sub-components */}
</Card.Root>

// Custom styling
<Card.Root style={{ borderWidth: 2, borderColor: "#000" }}>
  {/* Sub-components */}
</Card.Root>
```

### Card.Header

Optional header section, typically containing the title.

#### Props

```typescript
interface CardHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  paddingHorizontal: 24,
  paddingTop: 24,
}
```

#### Example

```typescript
<Card.Header>
  <Card.Title>User Profile</Card.Title>
</Card.Header>

// Custom styling
<Card.Header style={{ paddingHorizontal: 16 }}>
  <Card.Title>Compact Header</Card.Title>
</Card.Header>
```

### Card.Title

Text component for card titles.

#### Props

```typescript
interface CardTitleProps {
  children?: TextChildren;  // string | number | undefined
  style?: StyleProp<TextStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  fontFamily: fontFamily,
  fontSize: fontSize * 1.25,    // 1.25x base size
  fontWeight: "600",
  color: colors.foreground,
}
```

#### Example

```typescript
<Card.Title>Login to your account</Card.Title>

// Custom styling
<Card.Title style={{ fontSize: 24, fontWeight: "700" }}>
  Important Notice
</Card.Title>
```

### Card.Body

Main content area of the card.

#### Props

```typescript
interface CardBodyProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  padding: 24,
  gap: 24,
}
```

#### Example

```typescript
<Card.Body>
  <Text>Card content goes here</Text>
  <Button>
    Action
  </Button>
</Card.Body>

// Custom spacing
<Card.Body style={{ padding: 16, gap: 12 }}>
  {/* Compact content */}
</Card.Body>
```

### Card.Footer

Optional footer section for actions or metadata.

#### Props

```typescript
interface CardFooterProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  flexDirection: "row",
  paddingHorizontal: 24,
  paddingBottom: 24,
  gap: 24,
}
```

#### Example

```typescript
<Card.Footer>
  <Button variant="secondary">
    Cancel
  </Button>
  <Button>
    Submit
  </Button>
</Card.Footer>

// Vertical layout
<Card.Footer style={{ flexDirection: "column" }}>
  {/* Stacked buttons */}
</Card.Footer>
```

### Complete Example

```typescript
import { Card, Field, Input, Button } from "@korsolutions/ui";
import { useState } from "react";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Login to your account</Card.Title>
      </Card.Header>
      <Card.Body>
        <Field.Root>
          <Field.Label for="email">Email</Field.Label>
          <Field.Description>
            We'll never share your email.
          </Field.Description>
          <Input
            id="email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </Field.Root>
        <Field.Root>
          <Field.Label for="password">Password</Field.Label>
          <Field.Description>
            Must be at least 8 characters long.
          </Field.Description>
          <Input
            id="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
        </Field.Root>
      </Card.Body>
      <Card.Footer>
        <Button onPress={() => console.log("Login")}>
          Login
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
```

### Common Patterns

#### Minimal Card

```typescript
<Card.Root>
  <Card.Body>
    <Text>Simple content without header or footer</Text>
  </Card.Body>
</Card.Root>
```

#### Card with Custom Spacing

```typescript
<Card.Root style={{ margin: 16 }}>
  <Card.Body style={{ padding: 16, gap: 12 }}>
    {/* Compact layout */}
  </Card.Body>
</Card.Root>
```

#### Nested Content

```typescript
<Card.Root>
  <Card.Header>
    <Card.Title>Dashboard</Card.Title>
  </Card.Header>
  <Card.Body>
    <View style={{ flexDirection: "row", gap: 16 }}>
      <View style={{ flex: 1 }}>
        <Text>Column 1</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>Column 2</Text>
      </View>
    </View>
  </Card.Body>
</Card.Root>
```

### Platform Considerations

- **All Platforms**: Renders as a bordered, rounded container
- **Shadow**: Add platform-specific shadow using `style` prop
- **Responsive**: Use container width and padding adjustments for different screen sizes

---

## DescriptionList

Displays key-value pairs in a structured list format. Each row contains a term (label) and details (value), with optional actions. Ideal for showing metadata, settings, or structured information.

### When to Use

- Displaying object properties or metadata (user profiles, order details)
- Settings or configuration displays
- Key-value pair lists
- Structured information alongside Cards

### Component Structure

```typescript
import { DescriptionList } from "@korsolutions/ui";

<DescriptionList.Root variant="default">
  <DescriptionList.Item>
    <DescriptionList.Term>Label</DescriptionList.Term>
    <DescriptionList.Details>Value</DescriptionList.Details>
    <DescriptionList.Actions>{/* Optional actions */}</DescriptionList.Actions>
  </DescriptionList.Item>
</DescriptionList.Root>
```

### DescriptionList.Root

Root container that provides context and styling to all sub-components.

#### Props

```typescript
interface DescriptionListRootProps {
  variant?: keyof typeof DescriptionListVariants;  // "default" (default)
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

### DescriptionList.Item

A single row containing a term/details pair. Renders as a horizontal flex row with a top border separator.

#### Props

```typescript
interface DescriptionListItemProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  gap: 16,
}
```

### DescriptionList.Term

The label/key text. Takes up 40% of the row width.

#### Props

```typescript
interface DescriptionListTermProps {
  children?: TextChildren;
  style?: StyleProp<TextStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  fontSize: fontSize * 0.875,
  fontWeight: "500",
  color: colors.mutedForeground,
  width: "40%",
}
```

### DescriptionList.Details

The value/content text. Fills the remaining space with `flex: 1`.

#### Props

```typescript
interface DescriptionListDetailsProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  fontSize: fontSize * 0.875,
  color: colors.foreground,
  flex: 1,
}
```

### DescriptionList.Actions

Optional container for action buttons or controls, aligned to the right of the row.

#### Props

```typescript
interface DescriptionListActionsProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
}
```

### Complete Example

```typescript
import { DescriptionList, Button, Badge } from "@korsolutions/ui";

function UserProfile() {
  return (
    <DescriptionList.Root>
      <DescriptionList.Item>
        <DescriptionList.Term>Full name</DescriptionList.Term>
        <DescriptionList.Details>Jane Smith</DescriptionList.Details>
        <DescriptionList.Actions>
          <Button variant="ghost" size="sm" onPress={() => {}}>Edit</Button>
        </DescriptionList.Actions>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Email</DescriptionList.Term>
        <DescriptionList.Details>jane@example.com</DescriptionList.Details>
        <DescriptionList.Actions>
          <Button variant="ghost" size="sm" onPress={() => {}}>Edit</Button>
        </DescriptionList.Actions>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Status</DescriptionList.Term>
        <DescriptionList.Details
          render={() => <Badge color="#10b981">Active</Badge>}
        />
      </DescriptionList.Item>
    </DescriptionList.Root>
  );
}
```

### Common Patterns

#### Inside a Card

```typescript
<Card.Root>
  <Card.Header>
    <Card.Title>Order Details</Card.Title>
  </Card.Header>
  <Card.Body>
    <DescriptionList.Root>
      <DescriptionList.Item>
        <DescriptionList.Term>Order number</DescriptionList.Term>
        <DescriptionList.Details>#12345</DescriptionList.Details>
      </DescriptionList.Item>
      <DescriptionList.Item>
        <DescriptionList.Term>Amount</DescriptionList.Term>
        <DescriptionList.Details>$249.00</DescriptionList.Details>
      </DescriptionList.Item>
    </DescriptionList.Root>
  </Card.Body>
</Card.Root>
```

#### Custom Render for Details

Use the `render` prop on Details to display non-text content like badges or custom components:

```typescript
<DescriptionList.Details
  render={() => <Badge color="#10b981">Active</Badge>}
/>
```

---

## Item

Flexible content row for displaying media, title, description, and actions in a horizontal layout. Similar to a list item or cell component. Supports multiple variants and sizes.

### When to Use

- Displaying list items with icons and descriptions
- User/contact list entries
- File or document rows
- Notification items
- Any content that follows a media + text + actions pattern

### Component Structure

```typescript
import { Item } from "@korsolutions/ui";

<Item.Root variant="default" size="default">
  <Item.Media variant="icon">{/* Icon or image */}</Item.Media>
  <Item.Content>
    <Item.Title>Title text</Item.Title>
    <Item.Description>Description text</Item.Description>
  </Item.Content>
  <Item.Actions>{/* Buttons or controls */}</Item.Actions>
</Item.Root>
```

### Item.Root

Root container that provides context and styling. Accepts `variant` and `size` props.

#### Props

```typescript
interface ItemRootProps {
  variant?: "default" | "outline" | "muted";  // default: "default"
  size?: "default" | "sm" | "xs";             // default: "default"
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Variants

| Variant | Background | Border | Use Case |
|---------|-----------|--------|----------|
| `default` | Transparent | None | Inline items, lists |
| `outline` | Transparent | 1px border with radius | Standalone items, cards |
| `muted` | Muted background | None | Highlighted or secondary items |

#### Sizes

| Size | Padding | Gap | Icon Box | Font Scale |
|------|---------|-----|----------|------------|
| `default` | 12 | 12 | 40x40 | 1x / 0.875x |
| `sm` | 8 | 10 | 32x32 | 0.875x / 0.8125x |
| `xs` | 6 | 8 | 28x28 | 0.8125x / 0.75x |

### Item.Media

Container for media content (icons, images, avatars).

#### Props

```typescript
interface ItemMediaProps {
  variant?: "default" | "icon";  // default: "default"
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

- `"default"` — Simple centered container
- `"icon"` — Adds a muted background box with rounded corners (sized by parent's `size` prop)

### Item.Content

Flex container for title and description. Takes up remaining space (`flex: 1`).

#### Props

```typescript
interface ItemContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

### Item.Title

Primary text for the item.

#### Props

```typescript
interface ItemTitleProps {
  children?: TextChildren;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  render?: React.ComponentType<any>;
}
```

### Item.Description

Secondary descriptive text in muted color.

#### Props

```typescript
interface ItemDescriptionProps {
  children?: TextChildren;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  render?: React.ComponentType<any>;
}
```

### Item.Actions

Container for action buttons or controls, aligned to the right.

#### Props

```typescript
interface ItemActionsProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

### Complete Example

```typescript
import { Item, Button } from "@korsolutions/ui";
import { MailIcon, UserIcon } from "lucide-react-native";

function ContactList() {
  return (
    <View style={{ gap: 8 }}>
      <Item.Root variant="outline">
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

      <Item.Root variant="outline">
        <Item.Media variant="icon">
          <MailIcon size={18} color="hsl(0, 0%, 45%)" />
        </Item.Media>
        <Item.Content>
          <Item.Title>Inbox</Item.Title>
          <Item.Description>3 unread messages</Item.Description>
        </Item.Content>
      </Item.Root>
    </View>
  );
}
```

### Common Patterns

#### Title Only

```typescript
<Item.Root variant="outline">
  <Item.Media variant="icon">
    <UserIcon size={18} />
  </Item.Media>
  <Item.Content>
    <Item.Title>Simple item with title only</Item.Title>
  </Item.Content>
</Item.Root>
```

#### Muted Notification

```typescript
<Item.Root variant="muted">
  <Item.Media variant="icon">
    <BellIcon size={18} />
  </Item.Media>
  <Item.Content>
    <Item.Title>Notifications enabled</Item.Title>
    <Item.Description>You will receive push notifications</Item.Description>
  </Item.Content>
</Item.Root>
```

#### Compact List with Small Size

```typescript
<View style={{ gap: 4 }}>
  {files.map(file => (
    <Item.Root key={file.id} size="sm" variant="outline">
      <Item.Media variant="icon">
        <FileIcon size={16} />
      </Item.Media>
      <Item.Content>
        <Item.Title>{file.name}</Item.Title>
        <Item.Description>{file.size}</Item.Description>
      </Item.Content>
    </Item.Root>
  ))}
</View>
```

---

## Separator

A visual divider used to separate content sections. Simple non-compound component with variant-based orientation.

### When to Use

- Dividing sections of content
- Separating list items
- Visual breaks between groups of elements
- Horizontal or vertical dividers in toolbars

### Props

```typescript
interface SeparatorProps {
  variant?: "horizontal" | "vertical";  // default: "horizontal"
  style?: StyleProp<ViewStyle>;
}
```

### Variants

| Variant | Behavior | Default |
|---------|----------|---------|
| horizontal | 1px tall, stretches full width | Yes |
| vertical | 1px wide, stretches full height | No |

Both variants use `colors.border` as background color.

### Examples

#### Horizontal (Default)

```typescript
import { Separator, Typography } from "@korsolutions/ui";

<View style={{ gap: 12 }}>
  <Typography>Section 1</Typography>
  <Separator />
  <Typography>Section 2</Typography>
</View>
```

#### Vertical

```typescript
<View style={{ flexDirection: "row", alignItems: "center", gap: 12, height: 40 }}>
  <Typography>Left</Typography>
  <Separator variant="vertical" />
  <Typography>Right</Typography>
</View>
```

#### In a List

```typescript
<View>
  <Typography>Item 1</Typography>
  <Separator />
  <Typography>Item 2</Typography>
  <Separator />
  <Typography>Item 3</Typography>
</View>
```

### Notes

- The vertical variant requires the parent to have a defined height (or use `alignSelf: "stretch"` in a flex container)
- Uses `alignSelf: "stretch"` to fill the available width/height

---

## Portal

Render components outside the normal component hierarchy, useful for modals, tooltips, and overlays that need to appear above other content.

### When to Use

- Modal dialogs that overlay entire app
- Tooltips that need to escape container boundaries
- Dropdowns that need high z-index
- Notifications/toasts that float above content

### Components

Portal consists of two parts:
1. `Portal` - Renders children in portal host
2. `PortalHost` - Defines where portal content appears

### Portal

```typescript
interface PortalProps {
  name: string;              // Unique identifier for this portal
  hostName?: string;         // Portal host to render in (default: "__KOR_PORTAL_HOST__")
  children: React.ReactNode; // Content to portal
}
```

### PortalHost

```typescript
interface PortalHostProps {
  name?: string;            // Host identifier (default: "__KOR_PORTAL_HOST__")
  container?: {
    ios?: React.ComponentType<{ children: React.ReactNode }>;
    android?: React.ComponentType<{ children: React.ReactNode }>;
  };
}
```

### Basic Example

```typescript
import { Portal, PortalHost } from "@korsolutions/ui";

function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* Main app content */}
      <Text>Regular content</Text>

      {/* Portal host - renders portaled content */}
      <PortalHost />

      {/* Portal - content appears in PortalHost */}
      <Portal name="modal">
        <View style={styles.modal}>
          <Text>This appears above everything</Text>
        </View>
      </Portal>
    </View>
  );
}
```

### Multiple Portal Hosts

```typescript
function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>Main content</Text>
        <PortalHost name="main-content-host" />
      </View>

      <View style={{ flex: 1 }}>
        <Text>Sidebar</Text>
        <PortalHost name="sidebar-host" />
      </View>

      {/* Render in specific hosts */}
      <Portal name="main-modal" hostName="main-content-host">
        <Text>Appears in main content area</Text>
      </Portal>

      <Portal name="sidebar-tooltip" hostName="sidebar-host">
        <Text>Appears in sidebar area</Text>
      </Portal>
    </View>
  );
}
```

### Conditional Rendering

```typescript
function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        Open Modal
      </Button>

      {isOpen && (
        <Portal name="modal">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text>Modal Content</Text>
              <Button onPress={() => setIsOpen(false)}>
                Close
              </Button>
            </View>
          </View>
        </Portal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 8,
    minWidth: 300,
  },
});
```

### Platform Behavior

#### Web

On web, portals use React DOM's `createPortal` and render into a div appended to `document.body`:

```typescript
// Creates or finds existing div with hostName as ID
<div id="__KOR_PORTAL_HOST__">
  {/* Portal content renders here */}
</div>
```

#### Native (iOS/Android)

On native platforms, uses a custom store with `useSyncExternalStore`. Portal content renders in an absolutely positioned container:

```typescript
<View style={{
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  elevation: 999,
  zIndex: 999,
  pointerEvents: "box-none",
}}>
  {/* Portal content */}
</View>
```

### Common Patterns

#### Modal Dialog

```typescript
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Portal name="modal">
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={styles.content}>
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Portal>
  );
}
```

#### Dropdown Menu

```typescript
function Dropdown({ isOpen, children, anchor }) {
  if (!isOpen) return null;

  return (
    <Portal name="dropdown">
      <View style={[styles.dropdown, anchor]}>
        {children}
      </View>
    </Portal>
  );
}
```

#### Toast Notifications

```typescript
function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  return (
    <Portal name="toasts">
      <View style={styles.toastContainer}>
        {toasts.map(toast => (
          <View key={toast.id} style={styles.toast}>
            <Text>{toast.message}</Text>
          </View>
        ))}
      </View>
    </Portal>
  );
}
```

### Best Practices

1. **Unique Names**: Each portal needs a unique `name` prop
2. **Host Placement**: Place `PortalHost` at root level
3. **Cleanup**: Portal automatically unmounts when removed
4. **Z-Index**: Portal content has high z-index by default
5. **Events**: Use `pointerEvents="box-none"` for click-through overlays

---

## List

Performance-optimized list component for rendering arrays of data. Simpler alternative to FlatList with support for separators and empty states.

### When to Use

- Rendering small to medium lists (< 100 items)
- Simple list layouts without virtualization
- Lists with separators between items
- Empty state handling

### Props

```typescript
interface ListProps<T> {
  data: readonly T[];
  keyExtractor: (item: T, index: number) => string;
  renderItem: (info: { item: T; index: number }) => React.ReactElement;
  renderEmpty?: () => React.ReactElement;
  renderSeparator?: () => React.ReactElement;
}
```

### Basic Example

```typescript
import { List } from "@korsolutions/ui";

interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

function UserList() {
  return (
    <List
      data={users}
      keyExtractor={(user) => user.id}
      renderItem={({ item, index }) => (
        <View style={{ padding: 16 }}>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
}
```

### With Separator

```typescript
<List
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => (
    <View style={{ padding: 16 }}>
      <Text>{item.name}</Text>
    </View>
  )}
  renderSeparator={() => (
    <View style={{
      height: 1,
      backgroundColor: "#E0E0E0",
    }} />
  )}
/>
```

### With Empty State

```typescript
<List
  data={users}
  keyExtractor={(user) => user.id}
  renderItem={({ item }) => (
    <View style={{ padding: 16 }}>
      <Text>{item.name}</Text>
    </View>
  )}
  renderEmpty={() => (
    <View style={{ padding: 32, alignItems: "center" }}>
      <Text>No users found</Text>
    </View>
  )}
/>
```

### Complete Example

```typescript
import { List } from "@korsolutions/ui";
import { View, Text, Pressable } from "react-native";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function TodoList({ todos, onToggle }: {
  todos: Todo[];
  onToggle: (id: string) => void;
}) {
  return (
    <List
      data={todos}
      keyExtractor={(todo) => todo.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onToggle(item.id)}
          style={{
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: item.completed ? "#007AFF" : "#999",
            backgroundColor: item.completed ? "#007AFF" : "transparent",
          }} />
          <Text style={{
            flex: 1,
            textDecorationLine: item.completed ? "line-through" : "none",
            color: item.completed ? "#999" : "#000",
          }}>
            {item.text}
          </Text>
        </Pressable>
      )}
      renderSeparator={() => (
        <View style={{
          height: 1,
          backgroundColor: "#E0E0E0",
          marginHorizontal: 16,
        }} />
      )}
      renderEmpty={() => (
        <View style={{
          padding: 48,
          alignItems: "center",
        }}>
          <Text style={{ fontSize: 16, color: "#999" }}>
            No todos yet. Add one to get started!
          </Text>
        </View>
      )}
    />
  );
}
```

### Common Patterns

#### Index-Based Rendering

```typescript
<List
  data={items}
  keyExtractor={(item, index) => `item-${index}`}
  renderItem={({ item, index }) => (
    <View>
      <Text>#{index + 1}: {item.name}</Text>
    </View>
  )}
/>
```

#### Conditional Separator

```typescript
// Note: Separator automatically excludes after last item
<List
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemComponent item={item} />}
  renderSeparator={() => <Divider />}
/>
```

#### Scrollable List

```typescript
import { ScrollView } from "react-native";

<ScrollView>
  <List
    data={items}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ItemComponent item={item} />}
  />
</ScrollView>
```

### Implementation Details

The List component uses `React.Fragment` with keys for efficient rendering:

```typescript
// Simplified implementation
{data.map((item, index) => (
  <React.Fragment key={keyExtractor(item, index)}>
    {renderItem({ item, index })}
    {index !== data.length - 1 && renderSeparator?.()}
  </React.Fragment>
))}
```

### Performance Considerations

- **Small Lists**: Optimal for < 100 items
- **Large Lists**: Use FlatList for > 100 items (supports virtualization)
- **Re-renders**: Memoize `renderItem` and `renderSeparator` for better performance
- **Key Extraction**: Ensure `keyExtractor` returns stable, unique keys

### vs FlatList

| Feature | List | FlatList |
|---------|------|----------|
| Virtualization | No | Yes |
| Best for | < 100 items | Any size |
| Separator | Built-in | ItemSeparatorComponent |
| Empty State | Built-in | ListEmptyComponent |
| Complexity | Simple | More features |
| Performance | Good for small lists | Better for large lists |

### Platform Considerations

- **All Platforms**: Identical behavior
- **Performance**: Same performance characteristics across platforms
- **Styling**: Use standard React Native styling

---

## Table

Data table component for displaying structured tabular data. Uses a compound component pattern with Root, Header, Body, Row, Head, and Cell sub-components.

### When to Use

- Displaying structured data in rows and columns
- Data grids with headers
- Settings or configuration lists
- Comparison tables

### Component Structure

```typescript
import { Table } from "@korsolutions/ui";

<Table.Root variant="default">
  <Table.Header>
    <Table.Row>
      <Table.Head>Column 1</Table.Head>
      <Table.Head>Column 2</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Value 1</Table.Cell>
      <Table.Cell>Value 2</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Table.Root

Root container that provides context and styling to all sub-components.

#### Props

```typescript
interface TableRootProps {
  variant?: keyof typeof TableVariants;  // "default" (default)
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;     // Custom render component
}
```

#### Default Styles (variant="default")

```typescript
{
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: radius,
  overflow: "hidden",
}
```

### Table.Header

Container for the header row(s). Styled with a muted background to distinguish from body rows.

#### Props

```typescript
interface TableHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  backgroundColor: colors.muted,
}
```

### Table.Body

Container for data rows.

#### Props

```typescript
interface TableBodyProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

### Table.Row

A single row in the table. Renders children horizontally with a bottom border.

#### Props

```typescript
interface TableRowProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
}
```

### Table.Head

A header cell in a header row. Uses `flex: 1` to distribute space equally.

#### Props

```typescript
interface TableHeadProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 12,
}
```

### Table.Cell

A data cell in a body row. Uses `flex: 1` to distribute space equally.

#### Props

```typescript
interface TableCellProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: React.ComponentType<any>;
}
```

#### Default Styles

```typescript
{
  flex: 1,
  paddingHorizontal: 16,
  paddingVertical: 12,
}
```

### Complete Example

```typescript
import { Table, Typography } from "@korsolutions/ui";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "Editor" },
  { id: "3", name: "Charlie", email: "charlie@example.com", role: "Viewer" },
];

function UserTable() {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head><Typography variant="label">Name</Typography></Table.Head>
          <Table.Head><Typography variant="label">Email</Typography></Table.Head>
          <Table.Head><Typography variant="label">Role</Typography></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell><Typography>{user.name}</Typography></Table.Cell>
            <Table.Cell><Typography>{user.email}</Typography></Table.Cell>
            <Table.Cell><Typography>{user.role}</Typography></Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
```

### Common Patterns

#### Custom Column Widths

```typescript
<Table.Row>
  <Table.Cell style={{ flex: 2 }}>Wide column</Table.Cell>
  <Table.Cell style={{ flex: 1 }}>Normal column</Table.Cell>
</Table.Row>
```

#### Minimal Table (No Header)

```typescript
<Table.Root>
  <Table.Body>
    <Table.Row>
      <Table.Cell><Typography>Label</Typography></Table.Cell>
      <Table.Cell><Typography>Value</Typography></Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Platform Considerations

- **All Platforms**: Renders as a bordered, rounded container with rows
- **Overflow**: Root has `overflow: "hidden"` to clip content to border radius
- **Flex Layout**: Cells use `flex: 1` by default — override with `style={{ flex: N }}` for custom widths

---

## Sidebar

Collapsible navigation sidebar with grouped menu items, headers, footers, and submenus. The user controls all behavior (toggling, mobile handling) via the `useSidebar()` hook.

### When to Use

- App-level navigation sidebars
- Dashboard layouts with collapsible navigation
- Settings panels with grouped menu sections
- Any layout requiring a toggleable side panel

### Component Structure

```typescript
import { Sidebar, useSidebar, Icon } from "@korsolutions/ui";
import { Home, Settings } from "lucide-react-native";

<Sidebar.Provider>
  <Sidebar.Root>
    <Sidebar.Header>
      {/* Fixed top content (logo, app name) */}
    </Sidebar.Header>

    <Sidebar.Content>
      {/* Scrollable area */}
      <Sidebar.Group>
        <Sidebar.GroupLabel>Section</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuItem isActive onPress={handlePress}>
            <Icon render={Home} />
            Dashboard
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>

    <Sidebar.Footer>
      {/* Fixed bottom content */}
    </Sidebar.Footer>
  </Sidebar.Root>

  {/* Main content area */}
  <View style={{ flex: 1 }}>{children}</View>
</Sidebar.Provider>
```

### Sidebar.Provider

Wraps the sidebar and its adjacent content. Manages open/closed state and provides styles via context.

#### Props

```typescript
interface SidebarProviderProps {
  children?: React.ReactNode;
  /** Style variant (default: "default") */
  variant?: "default";
  /** Width of the sidebar in pixels (default: 256) */
  width?: number;
  /** Default open state for uncontrolled mode (default: true) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}
```

### Sidebar.Root

The sidebar container itself. Renders as a single View that collapses to `width: 0` when closed.

#### Props

```typescript
interface SidebarRootProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

### Sidebar.Header / Sidebar.Footer

Fixed areas at the top and bottom of the sidebar.

#### Props

```typescript
interface SidebarHeaderProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
// SidebarFooterProps is identical
```

### Sidebar.Content

Scrollable area between header and footer (uses `ScrollView`).

#### Props

```typescript
interface SidebarContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

### Sidebar.Group / Sidebar.GroupLabel

Groups related menu items with an optional label.

#### Props

```typescript
interface SidebarGroupProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface SidebarGroupLabelProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}
```

### Sidebar.Menu

Container for menu items (provides consistent gap).

#### Props

```typescript
interface SidebarMenuProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

### Sidebar.MenuItem

Pressable menu item. Accepts `Icon` and text children — icon color/size and text styles are automatically applied from the variant via `useOrganizedChildren`.

#### Props

```typescript
interface SidebarMenuItemProps extends Omit<PressableProps, "style"> {
  children?: React.ReactNode;
  /** Highlight as the active item */
  isActive?: boolean;
  /** Size variant: "default" or "lg" */
  size?: "default" | "lg";
  style?: StyleProp<ViewStyle>;
}
```

**Important**: Use `<Icon render={Home} />` (not `<Home />`) for icons inside `MenuItem`. The library's `Icon` component is required for automatic icon theming.

### Sidebar.MenuSub

Collapsible submenu container. Returns `null` when `open` is `false`.

#### Props

```typescript
interface SidebarMenuSubProps {
  children?: React.ReactNode;
  /** Whether the submenu is visible (default: true) */
  open?: boolean;
  style?: StyleProp<ViewStyle>;
}
```

### useSidebar Hook

Access sidebar state and controls from any component inside `Sidebar.Provider`.

```typescript
const {
  state,          // "expanded" | "collapsed"
  open,           // boolean
  setOpen,        // (open: boolean) => void
  toggleSidebar,  // () => void
  width,          // number | undefined
} = useSidebar();
```

### Complete Example

```tsx
import { Sidebar, useSidebar, Icon, Button, Typography, Badge } from "@korsolutions/ui";
import { Home, Inbox, Settings, PanelLeft, BookOpen, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

function ToggleButton() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button variant="ghost" size="sm" onPress={toggleSidebar}>
      <Icon render={PanelLeft} />
      {open ? "Close" : "Open"}
    </Button>
  );
}

function AppLayout() {
  const [active, setActive] = useState("home");
  const [docsOpen, setDocsOpen] = useState(true);

  return (
    <Sidebar.Provider>
      <Sidebar.Root>
        <Sidebar.Header>
          <Sidebar.MenuItem size="lg">
            <Icon render={Home} />
            <Typography style={{ fontWeight: "600" }}>My App</Typography>
          </Sidebar.MenuItem>
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem
                isActive={active === "home"}
                onPress={() => setActive("home")}
              >
                <Icon render={Home} />
                <Typography>Home</Typography>
              </Sidebar.MenuItem>

              <Sidebar.MenuItem
                isActive={active === "inbox"}
                onPress={() => setActive("inbox")}
              >
                <Icon render={Inbox} />
                <Typography>Inbox</Typography>
                <Badge variant="secondary">12</Badge>
              </Sidebar.MenuItem>

              {/* Collapsible submenu */}
              <Sidebar.MenuItem onPress={() => setDocsOpen(!docsOpen)}>
                <Icon render={BookOpen} />
                Documentation
                <Icon
                  render={ChevronRight}
                  size={16}
                  style={{
                    transform: [{ rotate: docsOpen ? "90deg" : "0deg" }],
                  }}
                />
              </Sidebar.MenuItem>
              <Sidebar.MenuSub open={docsOpen}>
                <Sidebar.MenuItem
                  isActive={active === "getting-started"}
                  onPress={() => setActive("getting-started")}
                >
                  Getting Started
                </Sidebar.MenuItem>
                <Sidebar.MenuItem
                  isActive={active === "api"}
                  onPress={() => setActive("api")}
                >
                  API Reference
                </Sidebar.MenuItem>
              </Sidebar.MenuSub>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>

        <Sidebar.Footer>
          <Sidebar.Menu>
            <Sidebar.MenuItem
              isActive={active === "settings"}
              onPress={() => setActive("settings")}
            >
              <Icon render={Settings} />
              <Typography>Settings</Typography>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar.Root>

      <View style={{ flex: 1, padding: 16 }}>
        <ToggleButton />
        {/* Main content */}
      </View>
    </Sidebar.Provider>
  );
}
```

### Controlled Mode

```tsx
const [open, setOpen] = useState(true);

<Sidebar.Provider open={open} onOpenChange={setOpen}>
  <Sidebar.Root>
    {/* ... */}
  </Sidebar.Root>
</Sidebar.Provider>
```

### Custom Width

```tsx
<Sidebar.Provider width={320}>
  {/* 320px wide sidebar instead of default 256 */}
</Sidebar.Provider>
```

### Common Patterns

#### Navigation with Expo Router

```tsx
import { Link, usePathname } from "expo-router";

function NavSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar.Root>
      <Sidebar.Content>
        <Sidebar.Menu>
          <Link href="/dashboard" asChild>
            <Sidebar.MenuItem isActive={pathname === "/dashboard"}>
              <Icon render={Home} />
              <Typography>Dashboard</Typography>
            </Sidebar.MenuItem>
          </Link>
        </Sidebar.Menu>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}
```

#### Badge on Menu Items

```tsx
<Sidebar.MenuItem isActive>
  <Icon render={Inbox} />
  <Typography>Inbox</Typography>
  <Badge variant="secondary">24</Badge>
</Sidebar.MenuItem>
```

### Platform Considerations

- **All Platforms**: Sidebar renders as a fixed-width column alongside content
- **Web**: Best used with responsive layout — show sidebar on desktop, hide on mobile
- **Native**: Consider using a drawer/modal pattern on small screens (user-managed)
- **Toggle**: The `useSidebar()` hook lets you toggle from anywhere inside the Provider

### Sub-Components Summary

| Sub-Component        | Purpose                                 |
| -------------------- | --------------------------------------- |
| `Sidebar.Provider`   | State management and style context      |
| `Sidebar.Root`       | The sidebar container (collapses to 0)  |
| `Sidebar.Header`     | Fixed top area                          |
| `Sidebar.Footer`     | Fixed bottom area                       |
| `Sidebar.Content`    | Scrollable middle area                  |
| `Sidebar.Group`      | Groups related items                    |
| `Sidebar.GroupLabel` | Section heading text                    |
| `Sidebar.Menu`       | Container for menu items                |
| `Sidebar.MenuItem`   | Pressable item with icon/text theming   |
| `Sidebar.MenuSub`    | Collapsible submenu container           |

---

## Additional Resources

- **Library Documentation**: `/library/AGENTS.md`
- **Example App**: `/example/AGENTS.md`
- **Component Source**: `/library/src/components/`
- **Theme System**: `/library/src/themes/`

## Version

Universal UI v0.1.x
Last Updated: 2026-01-28
