# AGENTS.md - Universal UI Library

## Overview

This is the main UI component library package (`@korsolutions/ui`) providing unstyled primitives and styled components for React Native and Expo applications.

## Core Principles

1. **Minimal Dependencies** - Keep external dependencies to a minimum
2. **Unstyled Primitives** - Primitives provide behavior without visual styles
3. **Variant System** - Use themed style hooks for component variants
4. **Compound Components** - Export components as objects with sub-components
5. **Type Safety** - Full TypeScript coverage with strict mode enabled

## Architecture

The library uses a **3-layer architecture**:

```
Layer 1: Primitives (behavior, no styles)
Layer 2: Components (styled wrappers)
Layer 3: Variants (themed style hooks)
     ↓
  Themes (color tokens, spacing, typography)
```

### Layer 1: Primitives (`src/primitives/`)

Headless UI components providing behavior without visual styles.

**Pattern**:

```typescript
// primitives/button/button-root.tsx
export interface ButtonRootProps {
  children?: React.ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  styles?: ButtonStyles;  // Injected by variants
}

export function ButtonRoot(props: ButtonRootProps) {
  const composedStyle = [props.styles?.root, props.style];

  return (
    <ButtonContext.Provider value={{ styles: props.styles }}>
      <Pressable
        style={composedStyle}
        disabled={props.isDisabled}
        onPress={props.onPress}
      >
        {props.children}
      </Pressable>
    </ButtonContext.Provider>
  );
}

// primitives/button/index.ts
export const ButtonPrimitive = {
  Root: ButtonRoot,
  Label: ButtonLabel,
  Spinner: ButtonSpinner,
};
```

**Key Rules**:

- ❌ No inline styles or hardcoded colors
- ❌ No theme access (`useTheme`)
- ✅ Accept `styles` prop for variant injection
- ✅ Provide context for sub-components
- ✅ Handle behavior (state, events, accessibility)

### Layer 2: Components (`src/components/`)

Styled components using primitives with variant system.

**Pattern**:

```typescript
// components/button/components/button-root.tsx
export interface ButtonRootProps extends ButtonPrimitiveRootProps {
  variant?: keyof typeof ButtonVariants;
}

export function ButtonRoot(props: ButtonRootProps) {
  const variant = props.variant ?? "default";
  const variantStyles = ButtonVariants[variant]();

  return <ButtonPrimitive.Root {...props} styles={variantStyles} />;
}

// components/button/index.ts
export const Button = {
  Root: ButtonRoot,
  Label: ButtonPrimitive.Label,
  Spinner: ButtonPrimitive.Spinner,
};
```

**Key Rules**:

- ✅ Use primitives as base
- ✅ Apply variants for styling
- ✅ Default variant is "default"
- ✅ Re-export primitive sub-components
- ❌ No direct styling in components

### Layer 3: Variants (`src/components/[name]/variants/`)

Theme-aware style hooks providing reactive styles.

**Pattern**:

```typescript
// components/button/variants/default.tsx
import { useThemedStyles } from "../../../utils/use-themed-styles";
import { type ButtonStyles } from "../types";

export const useButtonVariantDefault = (): ButtonStyles => {
  return useThemedStyles(
    ({ colors, radius, fontSize }): ButtonStyles => ({
      root: {
        backgroundColor: colors.primary,
        borderRadius: radius,
        padding: 12,
        paddingHorizontal: 16,
      },
      label: {
        color: colors.background,
        fontSize: fontSize,
        fontWeight: "600",
      },
      spinner: {
        color: colors.background,
      },
    }),
  );
};

// components/button/variants/index.ts
export const ButtonVariants = {
  default: useButtonVariantDefault,
  secondary: useButtonVariantSecondary,
};
```

**Key Rules**:

- ✅ Always use `useThemedStyles` hook
- ✅ Return complete style objects
- ✅ Access theme tokens (colors, radius, fontSize, etc.)
- ❌ No hardcoded values (use theme)
- ✅ Each variant is a hook

## Component Development Workflow

### Step 1: Create Primitive Structure

```bash
mkdir -p src/primitives/alert/components
touch src/primitives/alert/components/alert-root.tsx
touch src/primitives/alert/components/alert-icon.tsx
touch src/primitives/alert/components/alert-title.tsx
touch src/primitives/alert/components/alert-description.tsx
touch src/primitives/alert/context.ts
touch src/primitives/alert/types.ts
touch src/primitives/alert/index.ts
```

### Step 2: Define Types

```typescript
// src/primitives/alert/types.ts
import type { AlertRootProps } from "./components/alert-root";
import type { AlertIconProps } from "./components/alert-icon";
import type { AlertTitleProps } from "./components/alert-title";
import type { AlertDescriptionProps } from "./components/alert-description";

export interface AlertStyles {
  root?: AlertRootProps["style"];
  icon?: AlertIconProps;
  title?: AlertTitleProps["style"];
  description?: AlertDescriptionProps["style"];
}
```

### Step 3: Create Context

```typescript
// src/primitives/alert/context.ts
import { createContext, useContext } from "react";
import type { AlertStyles } from "./types";

export interface AlertContext {
  styles?: AlertStyles;
}

export const AlertContext = createContext<AlertContext | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within Alert");
  }
  return context;
};
```

### Step 4: Create Root Component

```typescript
// src/primitives/alert/components/alert-root.tsx
import React from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";
import { AlertContext } from "../context";
import type { AlertStyles } from "../types";

export interface AlertRootProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  styles?: AlertStyles;
}

export function AlertRoot(props: AlertRootProps) {
  const composedStyle = [props.styles?.root, props.style];

  return (
    <AlertContext.Provider value={{ styles: props.styles }}>
      <View style={composedStyle}>{props.children}</View>
    </AlertContext.Provider>
  );
}
```

### Step 5: Create Sub-Components

```typescript
// src/primitives/alert/components/alert-icon.tsx
import type { PropsWithRequiredRender, SvgProps } from "@/types/props.types";
import React from "react";
import { useAlert } from "../context";

export type AlertIconProps = SvgProps;

export function AlertIcon({
  render: Component,
  ...props
}: PropsWithRequiredRender<AlertIconProps>) {
  const alert = useAlert();

  const composedProps = {
    ...alert.styles?.icon,
    ...props,
    style: [alert.styles?.icon?.style, props.style],
  };

  return <Component absoluteStrokeWidth {...composedProps} />;
}
```

### Step 6: Export Primitive

```typescript
// src/primitives/alert/index.ts
import { AlertRoot } from "./components/alert-root";
import { AlertIcon } from "./components/alert-icon";
import { AlertTitle } from "./components/alert-title";
import { AlertDescription } from "./components/alert-description";

export const AlertPrimitive = {
  Root: AlertRoot,
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
};

export type { AlertRootProps } from "./components/alert-root";
export type { AlertIconProps } from "./components/alert-icon";
export type { AlertTitleProps } from "./components/alert-title";
export type { AlertDescriptionProps } from "./components/alert-description";
export type { AlertStyles } from "./types";
```

### Step 7: Create Component Wrapper

```bash
mkdir -p src/components/alert/components
mkdir -p src/components/alert/variants
touch src/components/alert/components/alert-root.tsx
touch src/components/alert/variants/default.tsx
touch src/components/alert/variants/destructive.tsx
touch src/components/alert/variants/index.ts
touch src/components/alert/types.ts
touch src/components/alert/index.ts
```

### Step 8: Create Variant

```typescript
// src/components/alert/variants/default.tsx
import { useThemedStyles } from "../../../utils/use-themed-styles";
import type { AlertStyles } from "../types";

export const useAlertVariantDefault = (): AlertStyles => {
  return useThemedStyles(
    ({ colors, radius, fontSize }): AlertStyles => ({
      root: {
        padding: 16,
        backgroundColor: colors.background,
        borderRadius: radius,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        gap: 12,
      },
      icon: {
        color: colors.foreground,
        size: 20,
        style: {
          marginTop: 2,
        },
      },
      title: {
        fontSize: fontSize,
        fontWeight: "600",
        color: colors.foreground,
        marginBottom: 4,
      },
      description: {
        fontSize: fontSize * 0.875,
        color: colors.mutedForeground,
        lineHeight: 20,
      },
    }),
  );
};
```

### Step 9: Create Component

```typescript
// src/components/alert/components/alert-root.tsx
import { AlertPrimitive } from "@/primitives";
import type { AlertRootProps as AlertPrimitiveRootProps } from "@/primitives";
import React from "react";
import { AlertVariants } from "../variants";

export interface AlertRootProps extends AlertPrimitiveRootProps {
  variant?: keyof typeof AlertVariants;
}

export function AlertRoot(props: AlertRootProps) {
  const variant = props.variant ?? "default";
  const variantStyles = AlertVariants[variant]();

  return <AlertPrimitive.Root {...props} styles={variantStyles} />;
}

// src/components/alert/index.ts
import { AlertPrimitive } from "@/primitives";
import { AlertRoot } from "./components/alert-root";

export const Alert = {
  Root: AlertRoot,
  Icon: AlertPrimitive.Icon,
  Title: AlertPrimitive.Title,
  Description: AlertPrimitive.Description,
};

export type { AlertRootProps } from "./components/alert-root";
export type { AlertIconProps } from "@/primitives";
export type { AlertTitleProps } from "@/primitives";
export type { AlertDescriptionProps } from "@/primitives";
export type { AlertStyles } from "./types";
```

### Step 10: Export from Indices

```typescript
// src/primitives/index.ts
export * from "./alert";
// ... other primitives

// src/components/index.ts
export * from "./alert";
// ... other components
```

## Common Patterns

### Context Pattern for Sub-Components

Sub-components access styles via context:

```typescript
// In Root component
<ComponentContext.Provider value={{ styles: props.styles }}>
  {props.children}
</ComponentContext.Provider>

// In sub-component
const component = useComponent();
const composedProps = {
  ...component.styles?.subComponent,
  ...props,
  style: [component.styles?.subComponent?.style, props.style],
};
```

### Style Composition Order

Always compose styles in this order:

1. Variant styles (from `styles` prop)
2. User styles (from `style` prop)

```typescript
const composedStyle = [props.styles?.root, props.style];
```

### SVG Icon Components

For components accepting icons:

```typescript
export type IconProps = SvgProps;

export function Icon({
  render: Component,
  ...props
}: PropsWithRequiredRender<IconProps>) {
  const composedProps = {
    ...context.styles?.icon,
    ...props,
    style: [context.styles?.icon?.style, props.style],
    absoluteStrokeWidth: true,
  };

  return <Component {...composedProps} />;
}
```

## Theme System

### Accessing Theme

```typescript
// In component code (variants only)
import { useThemedStyles } from "../../../utils/use-themed-styles";

const styles = useThemedStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius,
  },
}));
```

### Theme Structure

```typescript
interface Theme {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    muted: string;
    mutedForeground: string;
    border: string;
    success: string;
    warning: string;
    danger: string;
    // ... more
  };
  radius: number;
  fontSize: number;
  fontFamily: string;
  letterSpacing: number;
}
```

### Theme Tokens

Always use theme tokens instead of hardcoded values:

| Token               | Usage                            |
| ------------------- | -------------------------------- |
| `colors.background` | Main background color            |
| `colors.foreground` | Main text color                  |
| `colors.primary`    | Primary action color             |
| `colors.muted`      | Subtle background (hover states) |
| `colors.border`     | Border color                     |
| `radius`            | Border radius value              |
| `fontSize`          | Base font size                   |
| `fontFamily`        | Font family string               |

## Anti-Patterns (Avoid)

### ❌ Inline Styles in Primitives

```typescript
// BAD
<View style={{ padding: 16, backgroundColor: '#fff' }}>
```

### ✅ Use styles prop

```typescript
// GOOD
<View style={[props.styles?.root, props.style]}>
```

### ❌ Direct Theme in Primitives

```typescript
// BAD - primitives should not access theme
const theme = useTheme();
```

### ✅ Theme Only in Variants

```typescript
// GOOD - use in variant hooks
export const useVariant = (): Styles => {
  return useThemedStyles((theme) => ({
    root: { backgroundColor: theme.colors.background },
  }));
};
```

### ❌ Hardcoded Colors

```typescript
// BAD
backgroundColor: "#007AFF";
```

### ✅ Theme Colors

```typescript
// GOOD
backgroundColor: theme.colors.primary;
```

### ❌ String Values for Spacing

```typescript
// BAD
padding: "16px";
```

### ✅ Number Values

```typescript
// GOOD
padding: 16;
```

## Type Safety

### Export All Types

```typescript
export type { ComponentRootProps } from "./components/component-root";
export type { ComponentStyles } from "./types";
```

### Use PropsWithRequiredRender

For components requiring `render` prop:

```typescript
import type { PropsWithRequiredRender, SvgProps } from "@/types/props.types";

function Icon(props: PropsWithRequiredRender<SvgProps>) {
  const { render: Component, ...rest } = props;
  return <Component {...rest} />;
}
```

### StyleProp Types

```typescript
import type { StyleProp, ViewStyle, TextStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
```

## Build System

### Building the Library

```bash
cd library
bun build
```

This runs:

1. `bob build` - Compiles TypeScript with Babel
2. `tsc-alias` - Resolves path aliases in type definitions

### Build Output

```
dist/
├── commonjs/        # CommonJS modules
├── module/          # ES modules (.mjs)
└── typescript/      # Type definitions (.d.mts)
```

### Package Exports

```json
{
  "exports": {
    ".": "./src/index.tsx",
    "./primitives": "./src/primitives/index.ts",
    "./components": "./src/components/index.ts",
    "./hooks": "./src/hooks/index.ts"
  }
}
```

## Component Checklist

- [ ] Primitive created with compound component pattern
- [ ] Context created for sharing styles
- [ ] Types defined in `types.ts`
- [ ] Root component provides context
- [ ] Sub-components use context for styles
- [ ] Component wrapper uses primitive
- [ ] At least one variant created (default)
- [ ] Variant uses `useThemedStyles`
- [ ] Exported from primitive index
- [ ] Exported from component index
- [ ] TypeScript types exported
- [ ] No console errors or warnings
- [ ] Example page created
- [ ] Added to navigation

## Common Issues

**Issue**: "Cannot find module @/..."

- **Fix**: Check `tsconfig.json` has path alias: `"@/*": ["./src/*"]`

**Issue**: Styles not applying

- **Fix**: Ensure variant styles passed to primitive via `styles` prop

**Issue**: Theme not updating

- **Fix**: Use `useThemedStyles` hook, not plain `useMemo`

**Issue**: Type errors with compound exports

- **Fix**: Export both types and components from index files

**Issue**: Build fails

- **Fix**: Run `bun build` from library directory, check for TypeScript errors

## Resources

- **Monorepo docs**: [`../AGENTS.md`](../AGENTS.md)
- **Example app**: [`../example/AGENTS.md`](../example/AGENTS.md)
- **Source code**: [`src/`](src/)
- **Primitives**: [`src/primitives/`](src/primitives/)
- **Components**: [`src/components/`](src/components/)
- **Themes**: [`src/themes/`](src/themes/)
