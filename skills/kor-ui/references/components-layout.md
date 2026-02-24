# Layout Components Reference

Complete reference for layout and structural components in Universal UI. These components handle content organization, rendering, and portal management.

## Table of Contents

1. [Card](#card)
2. [Separator](#separator)
3. [Portal](#portal)
4. [List](#list)

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

## Additional Resources

- **Library Documentation**: `/library/AGENTS.md`
- **Example App**: `/example/AGENTS.md`
- **Component Source**: `/library/src/components/`
- **Theme System**: `/library/src/themes/`

## Version

Universal UI v0.1.x
Last Updated: 2026-01-28
