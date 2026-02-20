# Theme Customization Reference

## Table of Contents

1. [Theme Architecture](#theme-architecture)
2. [Provider Configuration](#provider-configuration)
3. [Theme Hooks](#theme-hooks)
4. [Color Customization](#color-customization)
5. [Typography Customization](#typography-customization)
6. [Responsive Design](#responsive-design)

---

## Theme Architecture

Universal UI's theme system is built on a strongly-typed architecture that provides type-safe access to design tokens throughout your application.

### ThemeAssets Interface

The core of the theme system is the `ThemeAssets` interface, which defines the complete structure of a theme:

```typescript
interface ThemeAssets {
  colors: Record<ColorScheme, Colors>;
  radius: Radius;
  fontFamily: FontFamily;
  letterSpacing: LetterSpacing;
  fontSize: FontSize;
}
```

**Type Definitions:**

```typescript
type ColorScheme = "light" | "dark";
type Radius = number;
type FontFamily = string;
type LetterSpacing = number;
type FontSize = number;
```

### Color Scheme System

Universal UI supports automatic light/dark mode switching. The theme system maintains two color palettes within a single theme configuration:

```typescript
colors: {
  light: { /* light mode colors */ },
  dark: { /* dark mode colors */ }
}
```

The active color scheme is determined by:

1. System color scheme preference (auto-detected)
2. Manual override via `setColorScheme()`

### Color Tokens

The `Colors` interface defines 14 semantic color tokens. All colors use HSLA format for consistency and flexibility.

#### Background Colors

```typescript
background: Color; // Main background color
foreground: Color; // Main text/content color
```

**Usage:**

- `background`: Page backgrounds, main container backgrounds
- `foreground`: Body text, primary content

**Example:**

```typescript
// Default light mode
background: "hsla(224, 0%, 100%, 1)"; // White
foreground: "hsla(224, 0%, 4%, 1)"; // Near black
```

#### Primary Action Colors

```typescript
primary: Color; // Primary action/brand color
primaryForeground: Color; // Text color on primary backgrounds
```

**Usage:**

- `primary`: Primary buttons, links, key actions
- `primaryForeground`: Text/icons on primary-colored elements

**Example:**

```typescript
// Default light mode
primary: "hsla(224, 0%, 9%, 1)"; // Dark gray
primaryForeground: "hsla(224, 0%, 98%, 1)"; // Off-white
```

#### Secondary Action Colors

```typescript
secondary: Color; // Secondary action color
secondaryForeground: Color; // Text color on secondary backgrounds
```

**Usage:**

- `secondary`: Secondary buttons, alternative actions
- `secondaryForeground`: Text/icons on secondary-colored elements

**Example:**

```typescript
// Default light mode
secondary: "hsla(224, 0%, 96%, 1)"; // Light gray
secondaryForeground: "hsla(224, 0%, 9%, 1)"; // Dark gray
```

#### Muted/Subtle Colors

```typescript
muted: Color; // Subtle backgrounds
mutedForeground: Color; // Muted/secondary text
```

**Usage:**

- `muted`: Hover states, disabled backgrounds, subtle containers
- `mutedForeground`: Captions, helper text, secondary labels

**Example:**

```typescript
// Default light mode
muted: "hsla(224, 0%, 96%, 1)"; // Light gray
mutedForeground: "hsla(224, 0%, 45%, 1)"; // Medium gray
```

#### Structural Colors

```typescript
border: Color; // Border color
surface: Color; // Card/elevated surface color
```

**Usage:**

- `border`: Input borders, dividers, card outlines
- `surface`: Cards, modals, elevated panels

**Example:**

```typescript
// Default light mode
border: "hsla(224, 0%, 90%, 1)"; // Light gray
surface: "hsla(224, 0%, 100%, 1)"; // White
```

#### Status Colors

```typescript
success: Color; // Success states
warning: Color; // Warning states
danger: Color; // Error/destructive states
info: Color; // Informational states
```

**Usage:**

- `success`: Success messages, confirmation indicators
- `warning`: Warning messages, caution indicators
- `danger`: Error messages, destructive actions
- `info`: Informational messages, tips

**Example:**

```typescript
// Default theme (same for light/dark)
success: "hsla(140, 100%, 40%, 1)"; // Green
warning: "hsla(31, 92%, 45%, 1)"; // Orange
danger: "hsla(360, 100%, 45%, 1)"; // Red
info: "hsla(210, 92%, 45%, 1)"; // Blue
```

### HSLA Color Format

All colors in Universal UI use the HSLA format:

```typescript
type Color = `hsla(${number}, ${number}%, ${number}%, ${number})`;
```

**Format Breakdown:**

- **H** (Hue): 0-360 degrees on the color wheel
- **S** (Saturation): 0-100%, color intensity
- **L** (Lightness): 0-100%, light to dark
- **A** (Alpha): 0-1, transparency level

**Example:**

```typescript
"hsla(210, 92%, 45%, 1)";
// H: 210 (blue)
// S: 92% (highly saturated)
// L: 45% (medium lightness)
// A: 1 (fully opaque)
```

**Benefits of HSLA:**

- Easy to adjust lightness for hover states
- Simple saturation control for muted variants
- Intuitive hue shifts for analogous colors
- Built-in alpha transparency

### Typography Tokens

```typescript
fontSize: FontSize; // Base font size (number)
fontFamily: FontFamily; // Font family name (string)
letterSpacing: LetterSpacing; // Letter spacing (number)
```

**Default Values:**

```typescript
fontSize: 16,          // Base size in pixels
fontFamily: "System",  // System font
letterSpacing: 0,      // No extra spacing
```

**Usage:**

- `fontSize`: Base font size, components scale from this
- `fontFamily`: Applied to all text by default
- `letterSpacing`: Global letter spacing adjustment

### Spacing Tokens

```typescript
radius: Radius; // Border radius (number)
```

**Default Value:**

```typescript
radius: 10; // 10 pixels
```

**Usage:**

- Applied to buttons, inputs, cards, and other UI elements
- Provides consistent corner rounding throughout the app

---

## Provider Configuration

### UIProvider Setup

Wrap your application with `UIProvider` to enable theming:

```typescript
import { UIProvider } from "@korsolutions/ui";

export default function App() {
  return (
    <UIProvider>
      <YourApp />
    </UIProvider>
  );
}
```

**With Expo Router:**

```typescript
// app/_layout.tsx
import { UIProvider } from "@korsolutions/ui";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UIProvider>
      <Stack />
    </UIProvider>
  );
}
```

### Partial Theme Overrides

You can customize the theme by passing a partial theme object. The system will merge your overrides with the default theme.

**Basic Override:**

```typescript
import { UIProvider } from "@korsolutions/ui";

export default function App() {
  return (
    <UIProvider
      theme={{
        radius: 16,
        fontSize: 18,
      }}
    >
      <YourApp />
    </UIProvider>
  );
}
```

**Color Override (Light Mode Only):**

```typescript
<UIProvider
  theme={{
    colors: {
      light: {
        primary: "hsla(220, 90%, 56%, 1)",
        primaryForeground: "hsla(0, 0%, 100%, 1)",
      },
    },
  }}
>
  <YourApp />
</UIProvider>
```

**Color Override (Both Modes):**

```typescript
<UIProvider
  theme={{
    colors: {
      light: {
        primary: "hsla(220, 90%, 56%, 1)",
        primaryForeground: "hsla(0, 0%, 100%, 1)",
      },
      dark: {
        primary: "hsla(220, 80%, 65%, 1)",
        primaryForeground: "hsla(0, 0%, 100%, 1)",
      },
    },
  }}
>
  <YourApp />
</UIProvider>
```

### Complete Theme Example

```typescript
import { UIProvider, type ThemeAssets } from "@korsolutions/ui";

const customTheme: ThemeAssets = {
  colors: {
    light: {
      background: "hsla(0, 0%, 100%, 1)",
      foreground: "hsla(222, 47%, 11%, 1)",
      primary: "hsla(221, 83%, 53%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",
      secondary: "hsla(210, 40%, 96%, 1)",
      secondaryForeground: "hsla(222, 47%, 11%, 1)",
      muted: "hsla(210, 40%, 96%, 1)",
      mutedForeground: "hsla(215, 16%, 47%, 1)",
      border: "hsla(214, 32%, 91%, 1)",
      surface: "hsla(0, 0%, 100%, 1)",
      success: "hsla(142, 71%, 45%, 1)",
      warning: "hsla(38, 92%, 50%, 1)",
      danger: "hsla(0, 84%, 60%, 1)",
      info: "hsla(221, 83%, 53%, 1)",
    },
    dark: {
      background: "hsla(222, 47%, 11%, 1)",
      foreground: "hsla(210, 40%, 98%, 1)",
      primary: "hsla(217, 91%, 60%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",
      secondary: "hsla(217, 33%, 17%, 1)",
      secondaryForeground: "hsla(210, 40%, 98%, 1)",
      muted: "hsla(217, 33%, 17%, 1)",
      mutedForeground: "hsla(215, 20%, 65%, 1)",
      border: "hsla(217, 33%, 17%, 1)",
      surface: "hsla(222, 47%, 11%, 1)",
      success: "hsla(142, 71%, 45%, 1)",
      warning: "hsla(38, 92%, 50%, 1)",
      danger: "hsla(0, 84%, 60%, 1)",
      info: "hsla(217, 91%, 60%, 1)",
    },
  },
  radius: 8,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};

export default function App() {
  return (
    <UIProvider theme={customTheme}>
      <YourApp />
    </UIProvider>
  );
}
```

### Dynamic Theme Switching

For apps that need to switch between multiple theme presets:

```typescript
import { UIProvider, type ThemeAssets, defaultThemeAssets } from "@korsolutions/ui";
import { useState } from "react";

// Define theme presets
const themes = {
  default: defaultThemeAssets,
  ocean: oceanTheme,
  forest: forestTheme,
};

function ThemedApp() {
  const [currentTheme, setCurrentTheme] = useState<ThemeAssets>(defaultThemeAssets);

  return (
    <UIProvider theme={currentTheme}>
      <YourApp onThemeChange={(name) => setCurrentTheme(themes[name])} />
    </UIProvider>
  );
}
```

### Advanced: Theme Context Provider Pattern

For complex apps with theme selection UI:

```typescript
// contexts/theme-context.tsx
import { createContext, useContext, useState, type PropsWithChildren } from "react";
import { defaultThemeAssets, type ThemeAssets } from "@korsolutions/ui";

interface ThemeSelectionContextValue {
  currentTheme: ThemeAssets;
  currentThemeName: string;
  setCurrentTheme: (name: string) => void;
  availableThemes: Array<{ name: string; assets: ThemeAssets }>;
}

const ThemeSelectionContext = createContext<ThemeSelectionContextValue | null>(null);

const AVAILABLE_THEMES = [
  { name: "default", assets: defaultThemeAssets },
  { name: "ocean", assets: oceanTheme },
  { name: "forest", assets: forestTheme },
];

export function ThemeSelectionProvider({ children }: PropsWithChildren) {
  const [currentThemeName, setCurrentThemeName] = useState("default");
  const currentTheme = AVAILABLE_THEMES.find((t) => t.name === currentThemeName)?.assets ?? defaultThemeAssets;

  return (
    <ThemeSelectionContext.Provider
      value={{
        currentTheme,
        currentThemeName,
        setCurrentTheme: setCurrentThemeName,
        availableThemes: AVAILABLE_THEMES,
      }}
    >
      {children}
    </ThemeSelectionContext.Provider>
  );
}

export function useThemeSelection() {
  const context = useContext(ThemeSelectionContext);
  if (!context) throw new Error("useThemeSelection must be used within ThemeSelectionProvider");
  return context;
}

// app/_layout.tsx
import { UIProvider } from "@korsolutions/ui";
import { ThemeSelectionProvider, useThemeSelection } from "./contexts/theme-context";

function ThemedApp() {
  const { currentTheme } = useThemeSelection();

  return (
    <UIProvider theme={currentTheme}>
      <YourApp />
    </UIProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeSelectionProvider>
      <ThemedApp />
    </ThemeSelectionProvider>
  );
}
```

---

## Theme Hooks

### useTheme()

Access the current theme values in any component.

**Basic Usage:**

```typescript
import { useTheme } from "@korsolutions/ui";

function MyComponent() {
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

**Available Properties:**

```typescript
const theme = useTheme();

theme.colors; // Active color palette (light or dark)
theme.colorScheme; // Current scheme: "light" | "dark"
theme.radius; // Border radius value
theme.fontSize; // Base font size
theme.fontFamily; // Font family name
theme.letterSpacing; // Letter spacing value
theme.setColorScheme; // Function to manually set color scheme
```

**Manual Color Scheme Control:**

```typescript
import { useTheme } from "@korsolutions/ui";

function ThemeSwitcher() {
  const theme = useTheme();

  return (
    <Button
      onPress={() => {
        const newScheme = theme.colorScheme === "light" ? "dark" : "light";
        theme.setColorScheme(newScheme);
      }}
    >
      
        Switch to {theme.colorScheme === "light" ? "dark" : "light"} mode
      
    </Button>
  );
}
```

**Accessing Color Tokens:**

```typescript
function StatusBadge({ status }: { status: "success" | "warning" | "danger" }) {
  const theme = useTheme();

  const statusColors = {
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
  };

  return (
    <View style={{ backgroundColor: statusColors[status], padding: 8, borderRadius: theme.radius }}>
      <Text style={{ color: theme.colors.background }}>{status}</Text>
    </View>
  );
}
```

### useThemedStyles()

Create reactive styles that automatically update when the theme changes. This hook is the recommended way to create theme-aware styles in variant hooks and custom components.

**Basic Usage:**

```typescript
import { useThemedStyles } from "@korsolutions/ui/utils";

function MyComponent() {
  const styles = useThemedStyles(({ colors, radius, fontSize }) => ({
    container: {
      backgroundColor: colors.background,
      borderRadius: radius,
      padding: 16,
    },
    text: {
      color: colors.foreground,
      fontSize: fontSize,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}
```

**Available Theme Properties:**

```typescript
useThemedStyles(({ colors, radius, fontSize, fontFamily, letterSpacing }) => ({
  // Your styles here
}));
```

**In Component Variants:**

This hook is primarily used when creating custom variants for library components:

```typescript
// components/button/variants/custom.tsx
import { useThemedStyles } from "@korsolutions/ui/utils";
import type { ButtonStyles } from "../types";

export const useButtonVariantCustom = (): ButtonStyles => {
  return useThemedStyles(
    ({ colors, radius, fontSize }): ButtonStyles => ({
      root: {
        backgroundColor: colors.primary,
        borderRadius: radius,
        padding: 12,
        paddingHorizontal: 16,
      },
      label: {
        color: colors.primaryForeground,
        fontSize: fontSize,
        fontWeight: "600",
      },
      spinner: {
        color: colors.primaryForeground,
      },
    }),
  );
};
```

**Complex Calculations:**

```typescript
const styles = useThemedStyles(({ colors, radius, fontSize }) => {
  const spacing = fontSize * 0.75;
  const largeFontSize = fontSize * 1.25;

  return {
    container: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: radius,
      padding: spacing,
    },
    title: {
      color: colors.foreground,
      fontSize: largeFontSize,
      fontWeight: "700",
      marginBottom: spacing / 2,
    },
    description: {
      color: colors.mutedForeground,
      fontSize: fontSize * 0.875,
      lineHeight: fontSize * 1.5,
    },
  };
});
```

**Conditional Styles:**

```typescript
function Card({ variant }: { variant: "default" | "highlighted" }) {
  const styles = useThemedStyles(({ colors, radius }) => ({
    container: {
      backgroundColor: variant === "highlighted" ? colors.primary : colors.surface,
      borderRadius: radius,
      padding: 16,
    },
    text: {
      color: variant === "highlighted" ? colors.primaryForeground : colors.foreground,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Content</Text>
    </View>
  );
}
```

---

## Color Customization

### Creating Custom Color Schemes

Define custom light and dark color palettes for your brand:

```typescript
import type { Colors } from "@korsolutions/ui";

const brandLightColors: Colors = {
  background: "hsla(0, 0%, 100%, 1)",
  foreground: "hsla(240, 10%, 4%, 1)",

  primary: "hsla(262, 83%, 58%, 1)", // Purple
  primaryForeground: "hsla(0, 0%, 100%, 1)",

  secondary: "hsla(270, 95%, 75%, 1)", // Light purple
  secondaryForeground: "hsla(240, 10%, 4%, 1)",

  muted: "hsla(240, 5%, 96%, 1)",
  mutedForeground: "hsla(240, 4%, 46%, 1)",

  border: "hsla(240, 6%, 90%, 1)",
  surface: "hsla(0, 0%, 100%, 1)",

  success: "hsla(142, 71%, 45%, 1)",
  warning: "hsla(38, 92%, 50%, 1)",
  danger: "hsla(0, 84%, 60%, 1)",
  info: "hsla(262, 83%, 58%, 1)", // Match primary
};

const brandDarkColors: Colors = {
  background: "hsla(240, 10%, 4%, 1)",
  foreground: "hsla(0, 0%, 98%, 1)",

  primary: "hsla(263, 70%, 70%, 1)", // Lighter purple for dark mode
  primaryForeground: "hsla(240, 10%, 4%, 1)",

  secondary: "hsla(240, 4%, 16%, 1)",
  secondaryForeground: "hsla(0, 0%, 98%, 1)",

  muted: "hsla(240, 4%, 16%, 1)",
  mutedForeground: "hsla(240, 5%, 65%, 1)",

  border: "hsla(240, 4%, 16%, 1)",
  surface: "hsla(240, 10%, 10%, 1)",

  success: "hsla(142, 71%, 45%, 1)",
  warning: "hsla(38, 92%, 50%, 1)",
  danger: "hsla(0, 84%, 60%, 1)",
  info: "hsla(263, 70%, 70%, 1)",
};
```

### Light/Dark Mode Best Practices

**Contrast Ratios:**

- Ensure foreground/background contrast meets WCAG AA standards (4.5:1 for normal text)
- Use lighter shades in dark mode, darker shades in light mode
- Test with accessibility tools

**Consistency:**

- Status colors (success, warning, danger, info) can often remain the same in both modes
- Adjust lightness for semantic colors if needed for readability
- Keep hue consistent between light/dark versions of the same token

**Example Pattern:**

```typescript
// Light mode: Dark primary, light background
primary: "hsla(220, 90%, 40%, 1)",           // Dark blue
primaryForeground: "hsla(0, 0%, 100%, 1)",   // White text

// Dark mode: Light primary, dark background
primary: "hsla(220, 80%, 70%, 1)",           // Light blue
primaryForeground: "hsla(220, 90%, 10%, 1)", // Dark blue text
```

### Complete Brand Color Example

A full theme implementation with custom brand colors:

```typescript
import type { ThemeAssets } from "@korsolutions/ui";

export const acmeTheme: ThemeAssets = {
  colors: {
    light: {
      // Base
      background: "hsla(0, 0%, 100%, 1)",
      foreground: "hsla(210, 11%, 15%, 1)",

      // Primary: Teal brand color
      primary: "hsla(174, 72%, 41%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",

      // Secondary: Coral accent
      secondary: "hsla(14, 100%, 95%, 1)",
      secondaryForeground: "hsla(14, 70%, 40%, 1)",

      // Muted: Soft gray
      muted: "hsla(210, 16%, 96%, 1)",
      mutedForeground: "hsla(210, 9%, 45%, 1)",

      // Structure
      border: "hsla(210, 16%, 88%, 1)",
      surface: "hsla(0, 0%, 100%, 1)",

      // Status
      success: "hsla(142, 76%, 36%, 1)",
      warning: "hsla(32, 95%, 44%, 1)",
      danger: "hsla(0, 72%, 51%, 1)",
      info: "hsla(199, 89%, 48%, 1)",
    },
    dark: {
      // Base
      background: "hsla(210, 11%, 15%, 1)",
      foreground: "hsla(0, 0%, 98%, 1)",

      // Primary: Lighter teal for dark mode
      primary: "hsla(174, 65%, 55%, 1)",
      primaryForeground: "hsla(210, 11%, 15%, 1)",

      // Secondary: Darker coral
      secondary: "hsla(14, 25%, 25%, 1)",
      secondaryForeground: "hsla(14, 100%, 85%, 1)",

      // Muted: Dark gray
      muted: "hsla(210, 9%, 25%, 1)",
      mutedForeground: "hsla(210, 9%, 65%, 1)",

      // Structure
      border: "hsla(210, 9%, 25%, 1)",
      surface: "hsla(210, 11%, 20%, 1)",

      // Status
      success: "hsla(142, 76%, 45%, 1)",
      warning: "hsla(32, 95%, 55%, 1)",
      danger: "hsla(0, 72%, 60%, 1)",
      info: "hsla(199, 89%, 60%, 1)",
    },
  },
  radius: 12,
  fontFamily: "System",
  letterSpacing: 0,
  fontSize: 16,
};
```

### Color Utility: HSLA Adjustments

When creating color variations, adjust HSLA values systematically:

**Hover States (lighten/darken):**

```typescript
// Light mode: darken on hover
primary: "hsla(174, 72%, 41%, 1)";
primaryHover: "hsla(174, 72%, 35%, 1)"; // -6% lightness

// Dark mode: lighten on hover
primary: "hsla(174, 65%, 55%, 1)";
primaryHover: "hsla(174, 65%, 65%, 1)"; // +10% lightness
```

**Disabled States (reduce saturation):**

```typescript
primary: "hsla(174, 72%, 41%, 1)";
primaryDisabled: "hsla(174, 20%, 60%, 1)"; // Lower saturation, higher lightness
```

**Transparency:**

```typescript
primary: "hsla(174, 72%, 41%, 1)";
primaryTransparent: "hsla(174, 72%, 41%, 0.1)"; // 10% opacity
```

---

## Typography Customization

### Font Family with Expo

To use custom fonts with Expo, load them before rendering:

**Step 1: Install Expo Font**

```bash
bun add expo-font
```

**Step 2: Load Fonts in Root Layout**

```typescript
// app/_layout.tsx
import { UIProvider } from "@korsolutions/ui";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UIProvider
      theme={{
        fontFamily: "Inter-Regular",
      }}
    >
      <Stack />
    </UIProvider>
  );
}
```

**Step 3: Use in Components**

The `fontFamily` from the theme will be applied automatically to all text components. For different weights:

```typescript
import { useTheme } from "@korsolutions/ui";

function MyComponent() {
  const theme = useTheme();

  return (
    <View>
      <Text style={{ fontFamily: "Inter-Regular", fontSize: theme.fontSize }}>
        Regular text
      </Text>
      <Text style={{ fontFamily: "Inter-Bold", fontSize: theme.fontSize * 1.5 }}>
        Bold heading
      </Text>
    </View>
  );
}
```

### Font Size Scaling

Scale font sizes relative to the base `fontSize`:

```typescript
import { useThemedStyles } from "@korsolutions/ui/utils";

function TypographyExample() {
  const styles = useThemedStyles(({ fontSize, colors }) => ({
    heading1: {
      fontSize: fontSize * 2,      // 32px if base is 16px
      fontWeight: "700",
      color: colors.foreground,
    },
    heading2: {
      fontSize: fontSize * 1.5,    // 24px
      fontWeight: "600",
      color: colors.foreground,
    },
    body: {
      fontSize: fontSize,          // 16px
      color: colors.foreground,
    },
    caption: {
      fontSize: fontSize * 0.875,  // 14px
      color: colors.mutedForeground,
    },
    small: {
      fontSize: fontSize * 0.75,   // 12px
      color: colors.mutedForeground,
    },
  }));

  return (
    <View>
      <Text style={styles.heading1}>Heading 1</Text>
      <Text style={styles.heading2}>Heading 2</Text>
      <Text style={styles.body}>Body text</Text>
      <Text style={styles.caption}>Caption text</Text>
      <Text style={styles.small}>Small print</Text>
    </View>
  );
}
```

**Typography Scale:**

```typescript
// Recommended scale based on base fontSize
const scale = {
  h1: fontSize * 2, // 32px
  h2: fontSize * 1.5, // 24px
  h3: fontSize * 1.25, // 20px
  body: fontSize, // 16px
  small: fontSize * 0.875, // 14px
  tiny: fontSize * 0.75, // 12px
};
```

### Letter Spacing

Global letter spacing can be set via the theme:

```typescript
<UIProvider
  theme={{
    letterSpacing: 0.5,  // Add 0.5px spacing to all text
  }}
>
  <App />
</UIProvider>
```

**Component-Level Adjustment:**

```typescript
const styles = useThemedStyles(({ letterSpacing, fontSize }) => ({
  heading: {
    letterSpacing: letterSpacing - 0.5, // Tighter for headings
    fontSize: fontSize * 2,
  },
  body: {
    letterSpacing: letterSpacing, // Default
  },
  button: {
    letterSpacing: letterSpacing + 1, // Wider for buttons
    textTransform: "uppercase",
  },
}));
```

---

## Responsive Design

### useScreenSize() Hook

Get responsive breakpoints and screen dimensions:

```typescript
import { useScreenSize } from "@korsolutions/ui/hooks";

function ResponsiveComponent() {
  const screen = useScreenSize();

  return (
    <View>
      <Text>Screen size: {screen.size}</Text>
      <Text>Width: {screen.width}px</Text>
      <Text>Height: {screen.height}px</Text>
      <Text>Is mobile: {screen.isMobile ? "Yes" : "No"}</Text>
      <Text>Is tablet: {screen.isTablet ? "Yes" : "No"}</Text>
      <Text>Is desktop: {screen.isDesktop ? "Yes" : "No"}</Text>
    </View>
  );
}
```

**Available Properties:**

```typescript
const screen = useScreenSize();

screen.size; // "mobile" | "tablet" | "desktop"
screen.width; // number (window width in pixels)
screen.height; // number (window height in pixels)
screen.isMobile; // boolean (< 768px)
screen.isTablet; // boolean (768px - 1024px)
screen.isDesktop; // boolean (> 1024px)
screen.select(); // Function for responsive values
```

### Breakpoints

| Breakpoint | Range          | Usage                            |
| ---------- | -------------- | -------------------------------- |
| `mobile`   | < 768px        | Phones, small screens            |
| `tablet`   | 768px - 1024px | Tablets, small laptops           |
| `desktop`  | > 1024px       | Laptops, desktops, large screens |

### Conditional Rendering

Render different components based on screen size:

```typescript
import { useScreenSize } from "@korsolutions/ui/hooks";

function Navigation() {
  const screen = useScreenSize();

  if (screen.isMobile) {
    return <MobileNavigation />;
  }

  if (screen.isTablet) {
    return <TabletNavigation />;
  }

  return <DesktopNavigation />;
}
```

**Using Boolean Helpers:**

```typescript
function Layout() {
  const screen = useScreenSize();

  return (
    <View style={{ flexDirection: "row" }}>
      {screen.isDesktop && <Sidebar />}
      <MainContent />
    </View>
  );
}
```

### Responsive Values with select()

The `select()` method provides a clean API for responsive values:

**With Default:**

```typescript
function Card() {
  const screen = useScreenSize();

  const padding = screen.select({
    mobile: 12,
    tablet: 16,
    default: 24,  // Used for desktop or if specific size not provided
  });

  return <View style={{ padding }} />;
}
```

**Without Default:**

```typescript
const columns = screen.select({
  mobile: 1,
  tablet: 2,
  desktop: 3,
});
// Returns number | undefined
```

**In Styles:**

```typescript
function ResponsiveGrid() {
  const screen = useScreenSize();

  const styles = {
    grid: {
      flexDirection: screen.select({
        mobile: "column",
        default: "row",
      }) as "column" | "row",
      gap: screen.select({
        mobile: 12,
        tablet: 16,
        desktop: 24,
        default: 16,
      }),
    },
  };

  return <View style={styles.grid}>{/* Content */}</View>;
}
```

### Responsive Typography

Scale typography based on screen size:

```typescript
import { useScreenSize, useThemedStyles } from "@korsolutions/ui";

function ResponsiveText() {
  const screen = useScreenSize();

  const styles = useThemedStyles(({ fontSize, colors }) => ({
    heading: {
      fontSize: screen.select({
        mobile: fontSize * 1.5,   // 24px on mobile
        tablet: fontSize * 1.75,  // 28px on tablet
        desktop: fontSize * 2,    // 32px on desktop
        default: fontSize * 2,
      }),
      color: colors.foreground,
      fontWeight: "700",
    },
  }));

  return <Text style={styles.heading}>Responsive Heading</Text>;
}
```

### Responsive Layout Pattern

Complete example of a responsive layout:

```typescript
import { useScreenSize, useThemedStyles } from "@korsolutions/ui";

function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const screen = useScreenSize();

  const styles = useThemedStyles(({ colors, radius }) => ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      maxWidth: screen.select({
        mobile: "100%",
        tablet: 720,
        desktop: 1200,
        default: 1200,
      }),
      marginHorizontal: "auto",
      paddingHorizontal: screen.select({
        mobile: 16,
        tablet: 24,
        desktop: 32,
        default: 24,
      }),
    },
    grid: {
      flexDirection: screen.isMobile ? "column" : "row",
      gap: screen.select({
        mobile: 16,
        default: 24,
      }),
    },
    card: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: radius,
      padding: screen.select({
        mobile: 16,
        default: 24,
      }),
    },
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.grid}>{children}</View>
      </View>
    </View>
  );
}
```

### Platform-Specific Rendering

Combine with React Native's `Platform` for platform-specific behavior:

```typescript
import { Platform } from "react-native";
import { useScreenSize } from "@korsolutions/ui/hooks";

function Navigation() {
  const screen = useScreenSize();

  // Show sidebar only on web and desktop
  const shouldShowSidebar = Platform.OS === "web" && screen.isDesktop;

  return (
    <View style={{ flexDirection: "row" }}>
      {shouldShowSidebar && <Sidebar />}
      <MainContent />
    </View>
  );
}
```

---

## Complete Theme Example

Putting it all together - a complete custom theme with responsive components:

```typescript
// themes/brand.ts
import type { ThemeAssets } from "@korsolutions/ui";

export const brandTheme: ThemeAssets = {
  colors: {
    light: {
      background: "hsla(0, 0%, 100%, 1)",
      foreground: "hsla(222, 47%, 11%, 1)",
      primary: "hsla(262, 83%, 58%, 1)",
      primaryForeground: "hsla(0, 0%, 100%, 1)",
      secondary: "hsla(270, 95%, 75%, 1)",
      secondaryForeground: "hsla(222, 47%, 11%, 1)",
      muted: "hsla(240, 5%, 96%, 1)",
      mutedForeground: "hsla(240, 4%, 46%, 1)",
      border: "hsla(240, 6%, 90%, 1)",
      surface: "hsla(0, 0%, 100%, 1)",
      success: "hsla(142, 71%, 45%, 1)",
      warning: "hsla(38, 92%, 50%, 1)",
      danger: "hsla(0, 84%, 60%, 1)",
      info: "hsla(262, 83%, 58%, 1)",
    },
    dark: {
      background: "hsla(222, 47%, 11%, 1)",
      foreground: "hsla(0, 0%, 98%, 1)",
      primary: "hsla(263, 70%, 70%, 1)",
      primaryForeground: "hsla(222, 47%, 11%, 1)",
      secondary: "hsla(240, 4%, 16%, 1)",
      secondaryForeground: "hsla(0, 0%, 98%, 1)",
      muted: "hsla(240, 4%, 16%, 1)",
      mutedForeground: "hsla(240, 5%, 65%, 1)",
      border: "hsla(240, 4%, 16%, 1)",
      surface: "hsla(222, 47%, 15%, 1)",
      success: "hsla(142, 71%, 45%, 1)",
      warning: "hsla(38, 92%, 50%, 1)",
      danger: "hsla(0, 84%, 60%, 1)",
      info: "hsla(263, 70%, 70%, 1)",
    },
  },
  radius: 12,
  fontFamily: "Inter-Regular",
  letterSpacing: 0,
  fontSize: 16,
};

// app/_layout.tsx
import { UIProvider } from "@korsolutions/ui";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { brandTheme } from "../themes/brand";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <UIProvider theme={brandTheme}>
      <Stack />
    </UIProvider>
  );
}

// components/hero.tsx
import { useScreenSize, useThemedStyles, useTheme } from "@korsolutions/ui";
import { View, Text } from "react-native";

export function Hero() {
  const theme = useTheme();
  const screen = useScreenSize();

  const styles = useThemedStyles(({ colors, fontSize, radius }) => ({
    container: {
      backgroundColor: colors.primary,
      borderRadius: radius,
      padding: screen.select({
        mobile: 24,
        tablet: 32,
        desktop: 48,
        default: 32,
      }),
      alignItems: "center",
    },
    title: {
      fontFamily: "Inter-Bold",
      fontSize: screen.select({
        mobile: fontSize * 2,
        tablet: fontSize * 2.5,
        desktop: fontSize * 3,
        default: fontSize * 2.5,
      }),
      color: colors.primaryForeground,
      textAlign: "center",
      marginBottom: 16,
    },
    description: {
      fontFamily: "Inter-Regular",
      fontSize: screen.select({
        mobile: fontSize,
        tablet: fontSize * 1.125,
        desktop: fontSize * 1.25,
        default: fontSize * 1.125,
      }),
      color: colors.primaryForeground,
      textAlign: "center",
      opacity: 0.9,
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.description}>
        A beautiful, responsive experience on all devices
      </Text>
    </View>
  );
}
```
