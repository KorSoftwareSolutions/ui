# AGENTS.md - Universal UI Example App

## Overview

This is an Expo application demonstrating the Universal UI library components. Built with Expo Router for file-based routing, it provides interactive examples of all library components across iOS, Android, and web platforms.

## App Structure

```
example/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout with UIProvider
│   ├── index.tsx          # Home page with component list
│   ├── theme.tsx          # Theme demonstration
│   ├── theme-selector.tsx # Theme picker modal
│   └── components/        # Component demo pages
│       ├── _layout.tsx    # Components layout (web sidebar)
│       ├── button.tsx
│       ├── alert.tsx
│       └── ...
├── components/            # Shared UI components
│   ├── component-screen-layout.tsx
│   ├── component-sidebar.tsx
│   ├── use-case-section.tsx
│   └── ...
├── constants/             # App constants
│   └── components.ts      # Component navigation data
├── themes/                # Theme definitions
└── AGENTS.md             # This file
```

## Routing with Expo Router

### File-Based Routing

Expo Router uses the file system for navigation:

| File                        | Route                | Purpose              |
| --------------------------- | -------------------- | -------------------- |
| `app/index.tsx`             | `/`                  | Home page            |
| `app/components/button.tsx` | `/components/button` | Button demo          |
| `app/theme.tsx`             | `/theme`             | Theme showcase       |
| `app/theme-selector.tsx`    | `/theme-selector`    | Theme picker (modal) |

### Navigation Types

```typescript
import { Link, router, usePathname } from "expo-router";
import type { Href } from "expo-router";

// Link component
<Link href="/components/button">Button</Link>

// Programmatic navigation
router.push("/components/button");

// Get current path
const pathname = usePathname(); // "/components/button"
```

## Component Demo Pattern

### Basic Structure

Every component demo follows this pattern:

```typescript
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button } from "@korsolutions/ui";
import React from "react";

export default function ButtonScreen() {
  return (
    <ComponentScreenLayout title="Button">
      <UseCaseSection title="Default">
        <Button onPress={() => console.log("pressed")}>Submit</Button>
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <Button isDisabled onPress={() => console.log("pressed")}>Submit</Button>
      </UseCaseSection>

      <UseCaseSection title="Loading">
        <Button isLoading onPress={() => console.log("pressed")}>Submitting...</Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
```

### ComponentScreenLayout

Provides consistent layout for demo pages:

```typescript
interface Props {
  title: string; // Component name
  children: React.ReactNode;
  backHref?: Href; // Back button destination (default: "/")
}
```

Features:

- Header with title and back button
- Theme switcher
- Color scheme toggle (light/dark)
- Safe area handling
- Keyboard avoidance
- Scrollable content
- Max-width: 600px (centered)

### UseCaseSection

Wraps individual use cases:

```typescript
interface Props {
  title: string; // Use case name
  children: React.ReactNode;
}
```

Features:

- Section heading
- Consistent spacing
- Clear visual separation

## Adding a New Component Demo

### Step 1: Create Demo File

```bash
touch app/components/alert.tsx
```

### Step 2: Write Demo Content

```typescript
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Alert } from "@korsolutions/ui";
import { InfoIcon } from "lucide-react-native";
import React from "react";

export default function AlertScreen() {
  return (
    <ComponentScreenLayout title="Alert">
      <UseCaseSection title="Default">
        <Alert.Root variant="default">
          <Alert.Icon render={InfoIcon} />
          <Alert.Title>Heads up!</Alert.Title>
          <Alert.Description>
            You can add components to your app using the cli.
          </Alert.Description>
        </Alert.Root>
      </UseCaseSection>

      <UseCaseSection title="Destructive">
        <Alert.Root variant="destructive">
          <Alert.Icon render={InfoIcon} />
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>
            Your session has expired. Please log in again.
          </Alert.Description>
        </Alert.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
```

### Step 3: Add to Navigation

```typescript
// constants/components.ts
export const COMPONENTS: ComponentRoute[] = [
  // ... existing components
  {
    title: "Alert",
    href: "/components/alert",
  },
];
```

The component will now appear:

- In the home page list
- In the web sidebar (desktop)
- In navigation

## Platform-Specific Features

### Web Sidebar

On desktop web (>1024px), a sidebar appears with component navigation.

**Implementation**: `app/components/_layout.tsx`

```typescript
import { ComponentSidebar } from "@/components/component-sidebar";
import { useScreenSize, useTheme } from "@korsolutions/ui";
import { Stack, usePathname } from "expo-router";
import { Platform, View } from "react-native";

export default function ComponentsLayout() {
  const theme = useTheme();
  const screenSize = useScreenSize();
  const pathname = usePathname();
  const shouldShowSidebar = Platform.OS === "web" && screenSize.isDesktop;

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {shouldShowSidebar && <ComponentSidebar currentPath={pathname} />}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </View>
  );
}
```

**Responsive Breakpoints**:

- Mobile: < 768px (no sidebar)
- Tablet: 768px - 1024px (no sidebar)
- Desktop: > 1024px (sidebar visible)

### Platform Detection

```typescript
import { Platform } from "react-native";

if (Platform.OS === "web") {
  // Web-specific code
} else if (Platform.OS === "ios") {
  // iOS-specific code
} else if (Platform.OS === "android") {
  // Android-specific code
}
```

### Responsive Design

```typescript
import { useScreenSize } from "@korsolutions/ui";

const screenSize = useScreenSize();

if (screenSize.isMobile) {
  // Mobile layout
} else if (screenSize.isTablet) {
  // Tablet layout
} else if (screenSize.isDesktop) {
  // Desktop layout
}
```

## Theme Demonstration

### Theme Context

The root layout provides theme context:

```typescript
// app/_layout.tsx
import { UniversalUIProvider } from "@korsolutions/ui";

export default function RootLayout() {
  return (
    <UniversalUIProvider>
      <Stack />
    </UniversalUIProvider>
  );
}
```

### Using Theme in Demos

```typescript
import { useTheme } from "@korsolutions/ui";

export default function ComponentScreen() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.foreground }}>
        Hello World
      </Text>
    </View>
  );
}
```

### Theme Switcher

Available in the header of every component screen. Allows switching between:

- Light/Dark color schemes
- Different theme presets

## Common Patterns

### Multiple Variants

```typescript
<UseCaseSection title="Variants">
  <View style={{ flexDirection: "row", gap: 16 }}>
    <Button variant="default">Default</Button>
    <Button variant="secondary">Secondary</Button>
  </View>
</UseCaseSection>
```

### With Icons

```typescript
import { HeartIcon } from "lucide-react-native";

<Button>
  <Icon render={HeartIcon} />
  Like
</Button>
```

### Interactive Demos

```typescript
import { useState } from "react";

export default function ComponentScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <ComponentScreenLayout title="Component">
      <UseCaseSection title="Interactive">
        <Button isLoading={isLoading} onPress={handlePress}>
          {isLoading ? "Loading..." : "Click me"}
        </Button>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
```

### Grouped Examples

```typescript
<UseCaseSection title="Sizes">
  <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
    <Icon render={HeartIcon} size={16} />
    <Icon render={HeartIcon} size={24} />
    <Icon render={HeartIcon} size={32} />
    <Icon render={HeartIcon} size={48} />
  </View>
</UseCaseSection>
```

## Navigation Constants

### Component Routes

```typescript
// constants/components.ts
import { Href } from "expo-router";

export interface ComponentRoute {
  title: string;
  href: Href;
}

export const COMPONENTS: ComponentRoute[] = [
  { title: "Alert Dialog", href: "/components/alert-dialog" },
  { title: "Alert", href: "/components/alert" },
  { title: "Avatar", href: "/components/avatar" },
  // ... more components
];
```

Used by:

- Home page component list
- Web sidebar navigation
- Alphabetically sorted

## Running the Example App

### Development

```bash
# From root
bun dev

# Or from example directory
cd example
bun dev
```

Starts Expo dev server with options:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser

### Platform-Specific

```bash
cd example

bun android    # Run on Android
bun ios        # Run on iOS
bun web        # Open in web browser
```

### Building

```bash
cd example

bun web:build    # Build for web
bun web:deploy   # Deploy to hosting
```

## File Organization

### Shared Components

Place reusable components in `components/`:

```
components/
├── component-screen-layout.tsx  # Page wrapper
├── component-sidebar.tsx        # Web sidebar
├── component-list-item.tsx      # Home list item
├── use-case-section.tsx         # Section wrapper
├── screen-header.tsx            # Header component
└── theme-switcher.tsx           # Theme picker
```

### Demo Pages

Place component demos in `app/components/`:

```
app/components/
├── _layout.tsx          # Layout with sidebar
├── alert-dialog.tsx
├── alert.tsx
├── avatar.tsx
└── ... (alphabetically)
```

## Common Issues

**Issue**: Component not appearing in navigation

- **Fix**: Add to `constants/components.ts`

**Issue**: Sidebar not showing on web

- **Fix**: Ensure window width > 1024px

**Issue**: Theme not updating

- **Fix**: Check root layout has `UniversalUIProvider`

**Issue**: Import errors

- **Fix**: Use `@/` alias for example files
- **Fix**: Import from `@korsolutions/ui` for library components

**Issue**: Hot reload not working

- **Fix**: Restart Expo dev server

## Best Practices

1. **Consistent Naming**
   - File: `alert.tsx`
   - Function: `AlertScreen`
   - Title: "Alert"

2. **Multiple Use Cases**
   - Show all variants
   - Show different states (disabled, loading, etc.)
   - Show with/without optional props

3. **Real Examples**
   - Use realistic content
   - Show practical use cases
   - Demonstrate best practices

4. **Platform Testing**
   - Test on iOS, Android, and web
   - Check responsive behavior
   - Verify theme switching

5. **Clean Code**
   - Use TypeScript
   - Follow existing patterns
   - Keep demos simple and focused

## Resources

- **Monorepo docs**: [`../AGENTS.md`](../AGENTS.md)
- **Library docs**: [`../library/AGENTS.md`](../library/AGENTS.md)
- **App source**: [`app/`](app/)
- **Component demos**: [`app/components/`](app/components/)
- **Shared components**: [`components/`](components/)
- **Navigation constants**: [`constants/components.ts`](constants/components.ts)
