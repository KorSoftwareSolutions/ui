# Display Components Reference

Complete reference for display components in Universal UI. These components are used to present content, state, and information to users.

## Table of Contents

1. [Typography](#typography)
2. [Avatar](#avatar)
3. [Badge](#badge)
4. [Icon](#icon)
5. [Empty](#empty)
6. [Progress](#progress)

---

## Typography

The Typography component provides semantic text rendering with pre-defined variants for headings, body text, and specialized content.

### Overview

Typography is a single-component wrapper around React Native's Text with theme-aware styling. It automatically applies consistent font sizes, weights, colors, and spacing based on the selected variant.

**When to use:**
- Display headings and titles
- Render body text and paragraphs
- Show labels, captions, or code snippets
- Ensure consistent typography across your app

**When not to use:**
- For interactive text elements (use Link component)
- Inside form fields (use Field.Label)

### API

```typescript
interface TypographyProps extends TextProps {
  variant?:
    | "heading-lg" | "heading-md" | "heading-sm"
    | "body-lg" | "body-md" | "body-sm";
  // All standard React Native Text props
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}
```

### Variants

#### Heading Variants

| Variant | Font Size | Weight | Use Case |
|---------|-----------|--------|----------|
| `heading-lg` | 1.5x base | 600 | Page titles, major headings |
| `heading-md` | 1.25x base | 600 | Section titles, card headers |
| `heading-sm` | 1.125x base | 600 | Subsections, small headings |

#### Body Variants

| Variant | Font Size | Weight | Use Case |
|---------|-----------|--------|----------|
| `body-lg` | 1.125x base | 400 | Emphasized paragraphs, lead text |
| `body-md` | 1x base (default) | 400 | Standard body text, descriptions |
| `body-sm` | 0.875x base | 400 | Captions, helper text, metadata |

### Basic Examples

```tsx
import { Typography } from "@korsolutions/ui";

// Default body text
<Typography>This is standard body text</Typography>

// Large heading
<Typography variant="heading-lg">Page Title</Typography>

// Section heading
<Typography variant="heading-md">Section Title</Typography>

// Small body text
<Typography variant="body-sm">Helper text or caption</Typography>
```

### Advanced Examples

```tsx
// Custom styling
<Typography
  variant="heading-lg"
  style={{ color: "#007AFF", marginBottom: 16 }}
>
  Custom Styled Heading
</Typography>

// With inline content
<Typography variant="body-md">
  This is a paragraph with{" "}
  <Typography variant="body-md" style={{ fontWeight: "700" }}>
    bold text
  </Typography>{" "}
  inline.
</Typography>

// Multiple lines
<Typography
  variant="body-md"
  numberOfLines={2}
  ellipsizeMode="tail"
>
  This text will be truncated after two lines with an ellipsis at the end.
</Typography>
```

### Common Patterns

```tsx
// Card with heading and description
<View>
  <Typography variant="heading-md" style={{ marginBottom: 8 }}>
    Feature Name
  </Typography>
  <Typography variant="body-sm" style={{ color: "#666" }}>
    Brief description of the feature
  </Typography>
</View>

// Article layout
<View style={{ gap: 16 }}>
  <Typography variant="heading-lg">Article Title</Typography>
  <Typography variant="body-sm" style={{ color: "#999" }}>
    Published on January 28, 2026
  </Typography>
  <Typography variant="body-md" style={{ lineHeight: 24 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </Typography>
</View>
```

### Styling Considerations

- All variants use the theme's `foreground` color by default
- Font family and letter spacing are inherited from theme
- Line height is calculated proportionally for each variant
- Override styles are merged with variant styles
- Custom `style` prop always takes precedence

---

## Avatar

A circular container for displaying user profile images with fallback text support.

### Overview

Avatar consists of three sub-components: Root (container), Image (profile picture), and Fallback (text displayed when image fails or is missing). The fallback automatically hides when the image loads successfully.

**When to use:**
- Display user profile pictures
- Show user identifiers in lists or comments
- Represent entities with images or initials

**When not to use:**
- For non-circular images (use Image component)
- For logos or brand imagery (use Image)

### API

#### Avatar.Root

```typescript
interface AvatarRootProps {
  variant?: "default";
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: (props: AvatarRootProps) => React.ReactNode;
}
```

#### Avatar.Image

```typescript
interface AvatarImageProps {
  source: ImageSource;  // { uri: string } or require()
  style?: StyleProp<ImageStyle>;
}
```

#### Avatar.Fallback

```typescript
interface AvatarFallbackProps {
  children: string | string[];  // Text to display (typically initials)
  style?: StyleProp<TextStyle>;
}
```

### Basic Examples

```tsx
import { Avatar } from "@korsolutions/ui";

// With image and fallback
<Avatar.Root>
  <Avatar.Image
    source={{ uri: "https://example.com/avatar.jpg" }}
  />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>

// Fallback only
<Avatar.Root>
  <Avatar.Fallback>IK</Avatar.Fallback>
</Avatar.Root>

// Local image
<Avatar.Root>
  <Avatar.Image source={require("./avatar.png")} />
  <Avatar.Fallback>AB</Avatar.Fallback>
</Avatar.Root>
```

### Advanced Examples

```tsx
// Custom size
<Avatar.Root style={{ width: 80, height: 80 }}>
  <Avatar.Image source={{ uri: "..." }} />
  <Avatar.Fallback style={{ fontSize: 24 }}>AB</Avatar.Fallback>
</Avatar.Root>

// Custom colors
<Avatar.Root style={{ backgroundColor: "#007AFF" }}>
  <Avatar.Fallback style={{ color: "#FFF" }}>JD</Avatar.Fallback>
</Avatar.Root>

// With status indicator
<View style={{ position: "relative" }}>
  <Avatar.Root>
    <Avatar.Image source={{ uri: "..." }} />
    <Avatar.Fallback>JD</Avatar.Fallback>
  </Avatar.Root>
  <View style={{
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#FFF"
  }} />
</View>
```

### Common Patterns

```tsx
// User list item
<View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
  <Avatar.Root>
    <Avatar.Image source={{ uri: user.avatarUrl }} />
    <Avatar.Fallback>{user.initials}</Avatar.Fallback>
  </Avatar.Root>
  <View>
    <Typography variant="body-md">{user.name}</Typography>
    <Typography variant="body-sm">{user.email}</Typography>
  </View>
</View>

// Avatar group
<View style={{ flexDirection: "row" }}>
  {users.slice(0, 3).map((user, index) => (
    <Avatar.Root
      key={user.id}
      style={{ marginLeft: index > 0 ? -12 : 0 }}
    >
      <Avatar.Image source={{ uri: user.avatarUrl }} />
      <Avatar.Fallback>{user.initials}</Avatar.Fallback>
    </Avatar.Root>
  ))}
  {users.length > 3 && (
    <Avatar.Root style={{ marginLeft: -12 }}>
      <Avatar.Fallback>+{users.length - 3}</Avatar.Fallback>
    </Avatar.Root>
  )}
</View>
```

### Styling Considerations

- Default size is 64x64 pixels (override via `style` prop on Root)
- Always circular (50% border radius)
- Fallback is centered both horizontally and vertically
- Image uses `cover` resize mode by default
- Fallback only displays when image fails or is not provided
- Image automatically triggers fallback on load error

---

## Badge

Small labels for displaying status, counts, or categories.

### Overview

Badge is a compact two-part component (Root container, Label text) for displaying short text with semantic or custom colors.

**When to use:**
- Show status indicators (active, pending, error)
- Display counts or notifications
- Label items with categories or tags
- Highlight new or updated content

**When not to use:**
- For long text (use Typography)
- As interactive buttons (use Button)

### API

#### Badge.Root

```typescript
interface BadgeRootProps {
  variant?: "default" | "secondary";
  color?: string;  // Custom background color (overrides variant)
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: (props: BadgeRootProps) => React.ReactNode;
}
```

#### Badge.Label

```typescript
interface BadgeLabelProps {
  children?: string;
  style?: StyleProp<TextStyle>;
  render?: (props: BadgeLabelProps) => React.ReactNode;
}
```

### Variants

| Variant | Background | Text Color | Use Case |
|---------|-----------|------------|----------|
| `default` | Primary color | Primary foreground | Primary status, main actions |
| `secondary` | Secondary color | Secondary foreground | Secondary status, subtle labels |

### Basic Examples

```tsx
import { Badge } from "@korsolutions/ui";

// Default variant
<Badge.Root>
  <Badge.Label>New</Badge.Label>
</Badge.Root>

// Secondary variant
<Badge.Root variant="secondary">
  <Badge.Label>Beta</Badge.Label>
</Badge.Root>

// Custom color
<Badge.Root color="#10b981">
  <Badge.Label>Active</Badge.Label>
</Badge.Root>
```

### Advanced Examples

```tsx
// Semantic colors
const STATUS_COLORS = {
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6"
};

<Badge.Root color={STATUS_COLORS.success}>
  <Badge.Label>Approved</Badge.Label>
</Badge.Root>

// With icon
import { Icon } from "@korsolutions/ui";
import { CheckIcon } from "lucide-react-native";

<Badge.Root style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
  <Icon render={CheckIcon} size={12} color="#FFF" />
  <Badge.Label>Verified</Badge.Label>
</Badge.Root>

// Notification badge
<View style={{ position: "relative" }}>
  <Icon render={BellIcon} size={24} />
  <Badge.Root
    style={{
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: 20,
      height: 20,
      borderRadius: 10
    }}
  >
    <Badge.Label>3</Badge.Label>
  </Badge.Root>
</View>
```

### Common Patterns

```tsx
// Status badges
<View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
  <Badge.Root color="#10b981">
    <Badge.Label>Active</Badge.Label>
  </Badge.Root>
  <Badge.Root color="#6b7280">
    <Badge.Label>Inactive</Badge.Label>
  </Badge.Root>
  <Badge.Root color="#ef4444">
    <Badge.Label>Suspended</Badge.Label>
  </Badge.Root>
</View>

// Version badge
<Badge.Root variant="secondary">
  <Badge.Label>v2.1.0</Badge.Label>
</Badge.Root>

// Category tags
<View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
  {categories.map(category => (
    <Badge.Root key={category.id} color={category.color}>
      <Badge.Label>{category.name}</Badge.Label>
    </Badge.Root>
  ))}
</View>
```

### Styling Considerations

- Default padding: 4px vertical, 8px horizontal
- Font size is 0.75x theme base font size
- Font weight is 600 (semi-bold)
- Border radius uses theme's `radius` value
- `alignSelf: "flex-start"` prevents horizontal stretching
- Custom `color` prop overrides variant background color
- Label color automatically contrasts with background

---

## Icon

Render prop wrapper for Lucide React Native icons with theme integration.

### Overview

Icon provides a consistent API for rendering Lucide icons with automatic theming, sizing, and stroke width configuration.

**When to use:**
- Display icons throughout your UI
- Combine with text for enhanced meaning
- Create icon buttons
- Show visual indicators

**When not to use:**
- For images or photos (use Image component)
- For custom SVG graphics (use the SVG directly)

### API

```typescript
interface IconProps extends SvgProps {
  variant?: "default";
  render: React.ComponentType<SvgProps>;  // Required: Lucide icon component
  color?: string;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
  absoluteStrokeWidth?: boolean;
}
```

**Important:** The `render` prop is required and should be a Lucide icon component.

### Basic Examples

```tsx
import { Icon } from "@korsolutions/ui";
import { Heart, Settings, User } from "lucide-react-native";

// Default icon
<Icon render={Heart} />

// Custom size
<Icon render={Settings} size={32} />

// Custom color
<Icon render={User} color="#007AFF" />

// Custom stroke width
<Icon render={Heart} strokeWidth={3} />
```

### Advanced Examples

```tsx
import { useTheme } from "@korsolutions/ui";

// Using theme colors
function ThemedIcon() {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 16 }}>
      <Icon render={Heart} color={colors.danger} />
      <Icon render={Check} color={colors.success} />
      <Icon render={Alert} color={colors.warning} />
    </View>
  );
}

// Icon sizes
<View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
  <Icon render={Home} size={16} />
  <Icon render={Home} size={24} />
  <Icon render={Home} size={32} />
  <Icon render={Home} size={48} />
</View>

// Variable stroke widths
<View style={{ flexDirection: "row", gap: 16 }}>
  <Icon render={Search} strokeWidth={1} size={32} />
  <Icon render={Search} strokeWidth={2} size={32} />
  <Icon render={Search} strokeWidth={3} size={32} />
</View>
```

### Common Patterns

```tsx
// Icon with text
<View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
  <Icon render={Mail} />
  <Typography>Messages</Typography>
</View>

// Icon button
import { Button } from "@korsolutions/ui";

<Button style={{ width: 40, height: 40, padding: 0 }}>
  <Icon render={Heart} color="#FFF" size={20} />
</Button>

// Navigation items
const navigationItems = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: User, label: "Profile" },
];

{navigationItems.map(item => (
  <View key={item.label} style={{ alignItems: "center", gap: 4 }}>
    <Icon render={item.icon} />
    <Typography variant="body-sm">{item.label}</Typography>
  </View>
))}

// Status icons with colors
<View style={{ flexDirection: "row", gap: 12 }}>
  <Icon render={CheckCircle} color="#10b981" />
  <Icon render={AlertCircle} color="#f59e0b" />
  <Icon render={XCircle} color="#ef4444" />
</View>
```

### Styling Considerations

- Default size: 1.5x theme base font size
- Default color: theme foreground color
- Default stroke width: 2
- `absoluteStrokeWidth` defaults to `true` (consistent stroke across sizes)
- All Lucide icons are compatible
- Icons are SVG-based and scale perfectly
- Override any SvgProps (fill, opacity, etc.)

---

## Empty

Displays empty states with optional media, title, and description.

### Overview

Empty is a compound component for showing placeholder content when data is absent or unavailable. It supports images, icons, avatars, or custom media along with descriptive text.

**When to use:**
- Show empty search results
- Display "no items" states
- Indicate missing or unavailable content
- Provide offline or error states with context

**When not to use:**
- For loading states (use skeleton or spinner)
- For error messages with actions (use Alert)

### API

#### Empty.Root

```typescript
interface EmptyRootProps {
  variant?: "default";
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: (props: EmptyRootProps) => React.ReactNode;
}
```

#### Empty.Media

```typescript
interface EmptyMediaProps {
  children: React.ReactNode;  // Icon, Avatar, or custom component
  style?: StyleProp<ViewStyle>;
  render?: (props: EmptyMediaProps) => React.ReactNode;
}
```

#### Empty.Title

```typescript
interface EmptyTitleProps {
  children: string;
  style?: StyleProp<TextStyle>;
  render?: (props: EmptyTitleProps) => React.ReactNode;
}
```

#### Empty.Description

```typescript
interface EmptyDescriptionProps {
  children: string;
  style?: StyleProp<TextStyle>;
  render?: (props: EmptyDescriptionProps) => React.ReactNode;
}
```

### Basic Examples

```tsx
import { Empty, Icon } from "@korsolutions/ui";
import { InboxIcon } from "lucide-react-native";

// With icon
<Empty.Root>
  <Empty.Media>
    <Icon render={InboxIcon} size={48} />
  </Empty.Media>
  <Empty.Title>No messages</Empty.Title>
  <Empty.Description>
    You don't have any messages yet. Check back later.
  </Empty.Description>
</Empty.Root>

// Without media
<Empty.Root>
  <Empty.Title>No results found</Empty.Title>
  <Empty.Description>
    Try adjusting your search or filters.
  </Empty.Description>
</Empty.Root>
```

### Advanced Examples

```tsx
import { Avatar, Button } from "@korsolutions/ui";

// With avatar
<Empty.Root>
  <Empty.Media>
    <Avatar.Root>
      <Avatar.Image source={{ uri: "https://..." }} />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar.Root>
  </Empty.Media>
  <Empty.Title>User offline</Empty.Title>
  <Empty.Description>
    This user is currently offline. Try again later.
  </Empty.Description>
  <Button>
    Send message
  </Button>
</Empty.Root>

// Network error with actions
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";

function NetworkError() {
  const theme = useTheme();

  return (
    <Empty.Root>
      <Empty.Media>
        <MaterialCommunityIcons
          name="wifi-off"
          size={48}
          color={theme.colors.mutedForeground}
        />
      </Empty.Media>
      <Empty.Title>No connection</Empty.Title>
      <Empty.Description>
        Please check your network settings and try again.
      </Empty.Description>
      <View style={{ flexDirection: "row", gap: 16 }}>
        <Button onPress={retry}>
          Retry
        </Button>
        <Button variant="secondary" onPress={openSettings}>
          Settings
        </Button>
      </View>
    </Empty.Root>
  );
}
```

### Common Patterns

```tsx
// Empty search results
<Empty.Root>
  <Empty.Media>
    <Icon render={SearchIcon} size={48} />
  </Empty.Media>
  <Empty.Title>No results for "{query}"</Empty.Title>
  <Empty.Description>
    Try different keywords or check your spelling.
  </Empty.Description>
</Empty.Root>

// Empty list with CTA
<Empty.Root>
  <Empty.Media>
    <Icon render={PlusCircleIcon} size={48} />
  </Empty.Media>
  <Empty.Title>No items yet</Empty.Title>
  <Empty.Description>
    Get started by creating your first item.
  </Empty.Description>
  <Button onPress={onCreate}>
    Create item
  </Button>
</Empty.Root>

// Conditional rendering
{items.length === 0 ? (
  <Empty.Root>
    <Empty.Title>No notifications</Empty.Title>
    <Empty.Description>
      You're all caught up! Check back later.
    </Empty.Description>
  </Empty.Root>
) : (
  <List items={items} />
)}
```

### Styling Considerations

- Root has centered alignment and 32px padding by default
- Gap between elements is 32px
- Media container has a circular background (64x64px)
- Title uses theme foreground color with 600 font weight
- Description uses muted foreground color
- All text is center-aligned
- Customize spacing via `style` prop on Root
- Can include any children (buttons, links, etc.)

---

## Progress

Linear progress bar for displaying completion percentage.

### Overview

Progress is a two-part component (Root container, Indicator bar) that visually represents the completion state of a task or operation.

**When to use:**
- Show upload or download progress
- Display completion percentage
- Indicate task or form completion
- Visualize data loading states

**When not to use:**
- For indeterminate loading (use spinner or skeleton)
- For circular progress (create custom component)

### API

#### Progress.Root

```typescript
interface ProgressRootProps {
  variant?: "default";
  value?: number;      // Current value (default: 0)
  max?: number;        // Maximum value (default: 100)
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: (props: ProgressRootProps) => React.ReactNode;
}
```

#### Progress.Indicator

```typescript
interface ProgressIndicatorProps {
  style?: StyleProp<ViewStyle>;
  render?: (props: ProgressIndicatorProps & { percentage: number }) => React.ReactNode;
}
```

**Note:** Percentage is automatically calculated as `(value / max) * 100` and clamped between 0-100.

### Basic Examples

```tsx
import { Progress } from "@korsolutions/ui";

// Default (0%)
<Progress.Root>
  <Progress.Indicator />
</Progress.Root>

// 50% complete
<Progress.Root value={50}>
  <Progress.Indicator />
</Progress.Root>

// Custom max value
<Progress.Root value={7} max={10}>
  <Progress.Indicator />
</Progress.Root>

// 100% complete
<Progress.Root value={100}>
  <Progress.Indicator />
</Progress.Root>
```

### Advanced Examples

```tsx
import { useState, useEffect } from "react";

// Animated progress
function AnimatedProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <Progress.Root value={progress}>
      <Progress.Indicator />
    </Progress.Root>
  );
}

// Custom colors
<Progress.Root
  value={75}
  style={{ backgroundColor: "#e5e7eb" }}
>
  <Progress.Indicator style={{ backgroundColor: "#10b981" }} />
</Progress.Root>

// With label
<View style={{ gap: 8 }}>
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <Typography variant="body-sm">Uploading...</Typography>
    <Typography variant="body-sm">75%</Typography>
  </View>
  <Progress.Root value={75}>
    <Progress.Indicator />
  </Progress.Root>
</View>
```

### Common Patterns

```tsx
// Multiple progress bars
<View style={{ gap: 16 }}>
  <View style={{ gap: 8 }}>
    <Typography variant="body-sm">Task 1</Typography>
    <Progress.Root value={100}>
      <Progress.Indicator />
    </Progress.Root>
  </View>
  <View style={{ gap: 8 }}>
    <Typography variant="body-sm">Task 2</Typography>
    <Progress.Root value={60}>
      <Progress.Indicator />
    </Progress.Root>
  </View>
  <View style={{ gap: 8 }}>
    <Typography variant="body-sm">Task 3</Typography>
    <Progress.Root value={20}>
      <Progress.Indicator />
    </Progress.Root>
  </View>
</View>

// File upload progress
function FileUpload({ file, onComplete }) {
  const [progress, setProgress] = useState(0);

  const uploadFile = async () => {
    // Simulate upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setProgress(i);
    }
    onComplete();
  };

  useEffect(() => {
    uploadFile();
  }, []);

  return (
    <View style={{ gap: 8 }}>
      <Typography variant="body-sm">{file.name}</Typography>
      <Progress.Root value={progress}>
        <Progress.Indicator />
      </Progress.Root>
      <Typography variant="body-sm" style={{ color: "#999" }}>
        {progress === 100 ? "Complete" : `${progress}% uploaded`}
      </Typography>
    </View>
  );
}

// Skill or stat visualization
const skills = [
  { name: "React Native", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 75 },
];

{skills.map(skill => (
  <View key={skill.name} style={{ gap: 8 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Typography variant="body-sm">{skill.name}</Typography>
      <Typography variant="body-sm">{skill.level}%</Typography>
    </View>
    <Progress.Root value={skill.level}>
      <Progress.Indicator />
    </Progress.Root>
  </View>
))}
```

### Styling Considerations

- Default height: 8px
- Default width: 100% (fill container)
- Background uses theme's `muted` color
- Indicator uses theme's `primary` color
- Border radius uses theme's `radius` value
- Overflow is hidden to clip indicator
- Indicator width is set via inline style (`width: ${percentage}%`)
- Values outside 0-100 range are automatically clamped
- Custom colors can be applied via `style` prop
- Supports custom height via `style` prop on Root

---

## Best Practices

### General Guidelines

1. **Consistency**: Use the same variants and sizes throughout your app
2. **Accessibility**: Ensure text has sufficient contrast and size
3. **Performance**: Typography and Icon components are optimized for re-rendering
4. **Theme Integration**: Leverage theme colors instead of hardcoded values
5. **Composition**: Combine display components with layout components for complex UIs

### Typography

- Use heading variants hierarchically (lg → md → sm)
- Default to `body-md` for most text
- Use `body-sm` sparingly for metadata and captions
- Override line height for multi-line readability

### Avatar

- Always provide a fallback for better UX
- Use 2-character initials for best appearance
- Keep avatars circular for consistency
- Consider adding status indicators for online/offline

### Badge

- Keep text short (1-2 words max)
- Use semantic colors for status (green = success, red = error)
- Avoid mixing too many custom colors
- Place near related content for context

### Icon

- Match icon size to adjacent text
- Use consistent stroke widths across related icons
- Pair icons with labels for clarity
- Test icon visibility in both light and dark themes

### Empty

- Provide helpful, actionable descriptions
- Include CTAs when appropriate
- Use relevant media (icons, illustrations)
- Keep tone friendly and encouraging

### Progress

- Show percentage labels for precision
- Animate transitions for smooth UX
- Use semantic colors (green for complete, red for error)
- Provide text status alongside visual progress
