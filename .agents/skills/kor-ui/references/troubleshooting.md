# Universal UI Library - Troubleshooting Guide

A comprehensive guide to diagnosing and resolving common issues when working with the Universal UI library.

---

## Table of Contents

1. [Setup Issues](#1-setup-issues)
2. [Component Issues](#2-component-issues)
3. [Type Errors](#3-type-errors)
4. [Platform-Specific Issues](#4-platform-specific-issues)
5. [Performance Issues](#5-performance-issues)

---

## 1. Setup Issues

### 1.1 UIProvider Not Wrapping App

**Problem**: Components throw errors like "useTheme must be used within a ThemeProvider" or "useAlert must be used within Alert".

**Symptoms**:
- App crashes immediately on load
- Error message: `Error: useTheme must be used within a ThemeProvider`
- Components fail to render with context errors
- Theme-dependent components display no styles

**Root Cause**: The `UIProvider` component is not wrapping your application's root component. The library requires `UIProvider` at the top level to provide theme context, portal host, and safe area context to all components.

**Solution**:

```typescript
// app/_layout.tsx or App.tsx
import { UIProvider } from "@korsolutions/ui";

export default function RootLayout() {
  return (
    <UIProvider>
      {/* Your app content */}
      <Stack />
    </UIProvider>
  );
}
```

For Expo Router with custom theme and portal configuration:

```typescript
import { UIProvider } from "@korsolutions/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FullWindowOverlay } from "react-native-screens";

export default function RootLayout() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <UIProvider
      portalContainer={{
        ios: FullWindowOverlay,
      }}
      theme={{
        colors: {
          light: {
            primary: "hsla(210, 100%, 50%, 1)",
          },
        },
      }}
      safeAreaInsets={safeAreaInsets}
    >
      <Stack />
    </UIProvider>
  );
}
```

**Prevention Tips**:
- Always wrap your root component with `UIProvider` before using any Universal UI components
- Check your app entry point (`_layout.tsx`, `App.tsx`, or `index.tsx`)
- The provider must be a parent of ALL components using the library
- If using React Navigation, place `UIProvider` outside the navigation container

---

### 1.2 Missing Peer Dependencies

**Problem**: Build fails with errors about missing packages like `react-native`, `react-native-web`, or `react-dom`.

**Symptoms**:
- NPM/Yarn install warnings: `WARN requires a peer of react-native@* but none is installed`
- Runtime error: `Cannot find module 'react-native'`
- Web build fails with: `Module not found: Can't resolve 'react-native-web'`
- TypeScript errors about missing type definitions

**Root Cause**: The Universal UI library declares peer dependencies that must be installed by the consuming application. These are not automatically installed to avoid version conflicts.

**Solution**:

Check your `package.json` includes all required peer dependencies:

```json
{
  "dependencies": {
    "@korsolutions/ui": "^0.0.51",
    "react": "^18.2.0",
    "react-native": "^0.73.0",
    "react-dom": "^18.2.0",
    "react-native-web": "^0.19.0"
  }
}
```

Install missing dependencies:

```bash
# Using bun
bun add react-native react-native-web react-dom

# Using npm
npm install react-native react-native-web react-dom

# Using yarn
yarn add react-native react-native-web react-dom
```

For Expo projects (recommended):

```bash
npx expo install react-native react-native-web react-dom
```

**Prevention Tips**:
- Always check peer dependency warnings during installation
- Use Expo CLI's `expo install` command for Expo projects (ensures compatible versions)
- Review the library's `package.json` `peerDependencies` field
- Keep peer dependencies updated alongside the library

---

### 1.3 Import Resolution Errors

**Problem**: Imports fail with "Cannot find module '@korsolutions/ui'" or subpath imports don't work.

**Symptoms**:
- Error: `Module not found: Error: Can't resolve '@korsolutions/ui/components'`
- TypeScript error: `Cannot find module '@korsolutions/ui' or its corresponding type declarations`
- Imports work in one file but not others
- Web build succeeds but mobile build fails (or vice versa)

**Root Cause**: Package exports may not be configured correctly, or your bundler doesn't support package exports. The library uses subpath exports for better tree-shaking.

**Solution**:

Use the main entry point:

```typescript
// Correct - main entry point
import { Button, Alert, useTheme } from "@korsolutions/ui";

// Also works - subpath imports (if supported by bundler)
import { Button } from "@korsolutions/ui/components";
import { useTheme } from "@korsolutions/ui";
```

For TypeScript errors, ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node16"
    "resolveJsonModule": true,
    "skipLibCheck": true
  }
}
```

For Expo projects using the development source, check `tsconfig.json`:

```json
{
  "compilerOptions": {
    "customConditions": ["dev-source"],
    "paths": {
      "@korsolutions/ui": ["../library/src"]
    }
  }
}
```

**Prevention Tips**:
- Prefer importing from the main entry point: `@korsolutions/ui`
- Avoid deep imports like `@korsolutions/ui/dist/...`
- Ensure your bundler (Metro, Webpack, Vite) is up to date
- For monorepos, use workspace protocol: `"@korsolutions/ui": "workspace:*"`

---

### 1.4 TypeScript Configuration Issues

**Problem**: TypeScript can't find types, or path aliases don't work.

**Symptoms**:
- Error: `Cannot find module '@/' or its corresponding type declarations`
- Path aliases resolve incorrectly
- Types are missing for components
- IntelliSense doesn't work for library components

**Root Cause**: TypeScript configuration is missing path mappings or the types aren't properly exported from the library.

**Solution**:

For library development, ensure `library/tsconfig.json` has:

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ESNext",
    "module": "preserve",
    "moduleResolution": "bundler",
    "jsx": "react-native",
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
```

For consuming applications:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Rebuild the library to regenerate type definitions:

```bash
cd library
bun build
```

**Prevention Tips**:
- Always run `bun build` in the library after making changes
- Check that `dist/typescript/` directory exists and contains `.d.ts` files
- Use `skipLibCheck: true` to avoid issues with third-party types
- For monorepos, ensure the root `tsconfig.json` references all packages

---

## 2. Component Issues

### 2.1 Components Not Rendering

**Problem**: Components render nothing or appear as blank space.

**Symptoms**:
- Component takes up no space on screen
- React DevTools shows component in tree but nothing visible
- No error messages in console
- Surrounding components render correctly

**Root Cause**: Missing `children` prop, incorrect component composition, or conditional rendering returning null.

**Solution**:

Ensure you're using compound components correctly:

```typescript
// Wrong - missing children
<Button.Root onPress={handlePress} />

// Correct - with children
<Button.Root onPress={handlePress}>
  <Button.Label>Submit</Button.Label>
</Button.Root>

// Wrong - incorrect nesting
<Alert>
  <Alert.Title>Title</Alert.Title>
</Alert>

// Correct - using Root component
<Alert.Root>
  <Alert.Title>Title</Alert.Title>
  <Alert.Description>Description</Alert.Description>
</Alert.Root>
```

Check for conditional rendering issues:

```typescript
// Wrong - might return undefined
<Button.Root>
  {isLoading && <Button.Spinner />}
</Button.Root>

// Correct - always has content
<Button.Root>
  {isLoading ? <Button.Spinner /> : <Button.Label>Submit</Button.Label>}
</Button.Root>
```

**Prevention Tips**:
- Always use `.Root` as the outermost component
- Provide at least one child component
- Check React DevTools to verify component structure
- Use TypeScript to catch missing required props

---

### 2.2 Styles Not Applying

**Problem**: Custom styles don't override component styles, or variants don't change appearance.

**Symptoms**:
- `style` prop has no effect
- Component ignores custom colors or spacing
- Variants look the same
- Theme changes don't reflect in components

**Root Cause**: Incorrect style composition order or styles not being passed to primitives.

**Solution**:

Check style composition order in custom variants:

```typescript
// Wrong - user styles come first (will be overridden)
const composedStyle = [props.style, props.styles?.root];

// Correct - variant styles first, then user styles
const composedStyle = [props.styles?.root, props.style];
```

Ensure variants are using `useThemedStyles`:

```typescript
// Wrong - static styles
export const useButtonVariantDefault = (): ButtonStyles => ({
  root: {
    backgroundColor: '#007AFF', // hardcoded
  },
});

// Correct - themed styles
export const useButtonVariantDefault = (): ButtonStyles => {
  return useThemedStyles(({ colors, radius }) => ({
    root: {
      backgroundColor: colors.primary,
      borderRadius: radius,
    },
  }));
};
```

Pass styles correctly to sub-components:

```typescript
// In sub-component
const component = useComponent();
const composedProps = {
  ...component.styles?.icon,
  ...props,
  style: [component.styles?.icon?.style, props.style],
};
```

**Prevention Tips**:
- Always use `useThemedStyles` hook in variant hooks
- Follow style composition order: `[variantStyles, userStyles]`
- Spread context styles before user props in sub-components
- Test style overrides in development

---

### 2.3 Variants Not Working

**Problem**: Setting the `variant` prop has no visual effect.

**Symptoms**:
- All variants look the same
- Changing variant prop doesn't update styles
- Console shows no errors
- Default variant applies regardless of prop

**Root Cause**: Variant not calling the hook function, or variant name doesn't match exported variants object.

**Solution**:

Ensure variant hooks are called (not just referenced):

```typescript
// Wrong - missing function call
export function ButtonRoot(props: ButtonRootProps) {
  const variant = props.variant ?? "default";
  const variantStyles = ButtonVariants[variant]; // Missing ()

  return <ButtonPrimitive.Root {...props} styles={variantStyles} />;
}

// Correct - calling the hook
export function ButtonRoot(props: ButtonRootProps) {
  const variant = props.variant ?? "default";
  const variantStyles = ButtonVariants[variant](); // Call hook

  return <ButtonPrimitive.Root {...props} styles={variantStyles} />;
}
```

Verify variant export matches usage:

```typescript
// variants/index.ts
export const ButtonVariants = {
  default: useButtonVariantDefault,
  secondary: useButtonVariantSecondary,
  destructive: useButtonVariantDestructive,
};

// Usage - must match key exactly
<Button.Root variant="destructive"> // Correct
<Button.Root variant="danger"> // Wrong - not in variants object
```

**Prevention Tips**:
- Always call variant hooks with `()`
- Use TypeScript to ensure variant names are type-safe
- Export variant type: `variant?: keyof typeof ButtonVariants`
- Test all variants during component development

---

### 2.4 Portal Content Not Showing

**Problem**: Modals, tooltips, or other portal content don't appear.

**Symptoms**:
- Component state updates but nothing visible
- Portal components render in DevTools but not on screen
- Other UI blocks portal content
- Content appears in wrong location

**Root Cause**: `PortalHost` not in component tree, or portal configuration incorrect.

**Solution**:

Verify `UIProvider` includes `PortalHost` (it does by default):

```typescript
// UIProvider automatically includes PortalHost
<UIProvider>
  <YourApp />
</UIProvider>
```

For iOS, use `FullWindowOverlay` for proper z-index:

```typescript
import { UIProvider } from "@korsolutions/ui";
import { FullWindowOverlay } from "react-native-screens";

<UIProvider
  portalContainer={{
    ios: FullWindowOverlay,
  }}
>
  <YourApp />
</UIProvider>
```

Ensure portal components use correct host name:

```typescript
// Default portal (recommended)
<Dialog.Root>
  <Dialog.Trigger>
    <Button.Root><Button.Label>Open</Button.Label></Button.Root>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Content>
      {/* Content */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

// Custom portal host
<Portal hostName="custom-host">
  {/* Content */}
</Portal>
```

**Prevention Tips**:
- Always wrap app with `UIProvider`
- Use `FullWindowOverlay` on iOS for modals
- Check `pointerEvents` on parent components
- Verify z-index is sufficient (Portal uses 999)
- Test on actual devices, not just simulators

---

### 2.5 Theme Not Updating

**Problem**: Theme changes don't reflect in components, or only some components update.

**Symptoms**:
- Toggling light/dark mode has no effect
- Some components update but others don't
- Theme updates after app restart but not dynamically
- Custom theme values ignored

**Root Cause**: Components not using `useThemedStyles` hook, or theme not reactive.

**Solution**:

Use `useThemedStyles` in all variants (not `useMemo`):

```typescript
// Wrong - static styles
export const useButtonVariantDefault = (): ButtonStyles => {
  const theme = useTheme();

  return useMemo(() => ({
    root: {
      backgroundColor: theme.colors.primary,
    },
  }), [theme]); // Won't update reactively
};

// Correct - reactive styles
export const useButtonVariantDefault = (): ButtonStyles => {
  return useThemedStyles(({ colors }) => ({
    root: {
      backgroundColor: colors.primary,
    },
  }));
};
```

For primitive components, never access theme directly:

```typescript
// Wrong - primitives accessing theme
export function ButtonRoot(props: ButtonRootProps) {
  const theme = useTheme(); // Primitives should not use theme
  return <Pressable style={{ backgroundColor: theme.colors.primary }} />;
}

// Correct - primitives receive styles
export function ButtonRoot(props: ButtonRootProps) {
  return <Pressable style={[props.styles?.root, props.style]} />;
}
```

**Prevention Tips**:
- Always use `useThemedStyles` hook in variant files
- Never use `useTheme` in primitive components
- Don't memoize theme-dependent styles manually
- Test theme switching during development

---

## 3. Type Errors

### 3.1 Component Prop Type Errors

**Problem**: TypeScript errors when passing props to components.

**Symptoms**:
- Error: `Type 'X' is not assignable to type 'Y'`
- Props that should be optional show as required
- Valid props are rejected by TypeScript
- Auto-complete doesn't suggest correct props

**Root Cause**: Incorrect type definitions or props not properly exported.

**Solution**:

Check prop interface extends primitive props:

```typescript
// Wrong - missing primitive props
export interface ButtonRootProps {
  variant?: keyof typeof ButtonVariants;
  onPress?: () => void;
}

// Correct - extends primitive
import type { ButtonRootProps as ButtonPrimitiveRootProps } from "@/primitives";

export interface ButtonRootProps extends ButtonPrimitiveRootProps {
  variant?: keyof typeof ButtonVariants;
}
```

Export all types from component index:

```typescript
// components/button/index.ts
export const Button = {
  Root: ButtonRoot,
  Label: ButtonPrimitive.Label,
  Spinner: ButtonPrimitive.Spinner,
};

// Must also export types
export type { ButtonRootProps } from "./components/button-root";
export type { ButtonLabelProps } from "@/primitives";
export type { ButtonSpinnerProps } from "@/primitives";
export type { ButtonStyles } from "./types";
```

**Prevention Tips**:
- Always extend primitive props in component props
- Export all types from component index
- Run `bun ts-check` regularly
- Use TypeScript strict mode during development

---

### 3.2 Theme Type Mismatches

**Problem**: TypeScript errors when accessing theme properties.

**Symptoms**:
- Error: `Property 'X' does not exist on type 'Colors'`
- Custom theme properties not recognized
- Theme values show as `any` type
- IntelliSense doesn't suggest theme properties

**Root Cause**: Theme type definitions don't match theme implementation, or custom theme not properly typed.

**Solution**:

Ensure theme matches type definition:

```typescript
// themes/types.ts
export interface Colors {
  background: Color;
  foreground: Color;
  primary: Color;
  // ... all color properties
}

// themes/default/light.ts
export const lightColors: Colors = {
  background: "hsla(0, 0%, 100%, 1)",
  foreground: "hsla(0, 0%, 0%, 1)",
  primary: "hsla(210, 100%, 50%, 1)",
  // ... must include all properties from Colors interface
};
```

For custom themes, use `DeepPartial`:

```typescript
import type { DeepPartial, ThemeAssets } from "@korsolutions/ui";

const customTheme: DeepPartial<ThemeAssets> = {
  colors: {
    light: {
      primary: "hsla(160, 100%, 40%, 1)", // Override only what you need
    },
  },
  radius: 12,
};

<UIProvider theme={customTheme}>
  <App />
</UIProvider>
```

**Prevention Tips**:
- Use `DeepPartial<ThemeAssets>` for custom themes
- Define complete color sets when overriding
- Keep theme type definitions in sync with implementation
- Use `satisfies` operator for type checking

---

### 3.3 Render Prop Type Issues with Icon Components

**Problem**: TypeScript errors when using the `render` prop for icons.

**Symptoms**:
- Error: `Type 'X' is not assignable to parameter of type 'never'`
- Icon components show type errors with lucide-react-native
- Render prop requires explicit typing
- Generic icon components don't type-check

**Root Cause**: Incorrect render prop type definition or missing `PropsWithRequiredRender` type.

**Solution**:

Use `PropsWithRequiredRender` for icon components:

```typescript
// Wrong - incorrect render prop type
export interface AlertIconProps {
  render: React.ComponentType;
  size?: number;
  color?: ColorValue;
}

// Correct - using PropsWithRequiredRender
import type { PropsWithRequiredRender, SvgProps } from "@/types/props.types";

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

Usage with lucide-react-native:

```typescript
import { InfoIcon } from "lucide-react-native";

// Correct usage
<Alert.Icon render={InfoIcon} />

// With additional props
<Alert.Icon render={InfoIcon} size={24} color="red" />
```

**Prevention Tips**:
- Always use `PropsWithRequiredRender<SvgProps>` for icon components
- Include `absoluteStrokeWidth` in composed props
- Destructure `render` as `Component` in parameters
- Test with multiple icon libraries

---

## 4. Platform-Specific Issues

### 4.1 Web Styling Issues

**Problem**: Components look different or broken on web compared to mobile.

**Symptoms**:
- Fonts appear too large or too small
- Spacing is off on web
- Hover states don't work
- Responsive behavior incorrect

**Root Cause**: React Native Web style differences or missing web-specific styles.

**Solution**:

Use platform-specific styles:

```typescript
import { Platform } from "react-native";

export const useButtonVariantDefault = (): ButtonStyles => {
  return useThemedStyles(({ colors, radius }) => ({
    root: {
      backgroundColor: colors.primary,
      borderRadius: radius,
      padding: 12,
      ...Platform.select({
        web: {
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.2s",
        },
        default: {},
      }),
    },
  }));
};
```

For responsive design:

```typescript
import { useScreenSize } from "@korsolutions/ui";

export default function MyComponent() {
  const screenSize = useScreenSize();

  return (
    <View
      style={{
        width: "100%",
        maxWidth: screenSize.isDesktop ? 600 : undefined,
        padding: screenSize.isMobile ? 16 : 24,
      }}
    >
      {/* Content */}
    </View>
  );
}
```

**Prevention Tips**:
- Test on web browsers during development
- Use `Platform.select` for platform-specific styles
- Include hover states for interactive elements on web
- Use `useScreenSize` hook for responsive layouts
- Test across different browsers (Chrome, Safari, Firefox)

---

### 4.2 iOS Safe Area Problems

**Problem**: Content appears under notch, status bar, or home indicator.

**Symptoms**:
- Top content obscured by status bar
- Bottom content hidden by home indicator
- Modals don't respect safe area
- Content not inset properly on iPhone X and newer

**Root Cause**: Safe area insets not properly applied or `SafeAreaProvider` missing.

**Solution**:

Provide safe area insets to `UIProvider`:

```typescript
import { UIProvider } from "@korsolutions/ui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function App() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <UIProvider safeAreaInsets={safeAreaInsets}>
      <YourApp />
    </UIProvider>
  );
}

// Wrap with SafeAreaProvider at root
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Root() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}
```

Use safe area utilities in components:

```typescript
import { useSafeArea } from "@korsolutions/ui";

export default function MyScreen() {
  const safeArea = useSafeArea();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: safeArea.top,
        paddingBottom: safeArea.bottom,
      }}
    >
      {/* Content */}
    </View>
  );
}
```

**Prevention Tips**:
- Always provide `safeAreaInsets` to `UIProvider`
- Test on devices with notches (iPhone X and newer)
- Use `useSafeArea` hook for custom layouts
- Apply safe area to modal content
- Check both portrait and landscape orientations

---

### 4.3 Android Keyboard Handling

**Problem**: Keyboard covers input fields or pushes content incorrectly.

**Symptoms**:
- Input fields hidden behind keyboard
- Content doesn't scroll when keyboard appears
- Keyboard dismiss button missing
- Layout jumps when keyboard opens/closes

**Root Cause**: Missing `KeyboardAvoidingView` or incorrect Android manifest settings.

**Solution**:

Use `KeyboardAvoidingView`:

```typescript
import { KeyboardAvoidingView, Platform } from "react-native";

export default function FormScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Input.Root>
          <Input.Input placeholder="Email" />
        </Input.Root>
        {/* More inputs */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
```

For Android, set in `AndroidManifest.xml`:

```xml
<activity
  android:name=".MainActivity"
  android:windowSoftInputMode="adjustResize">
</activity>
```

**Prevention Tips**:
- Wrap forms in `KeyboardAvoidingView`
- Use `adjustResize` on Android (not `adjustPan`)
- Test on Android devices with different screen sizes
- Provide keyboard dismiss button in `ScrollView`
- Use `keyboardShouldPersistTaps="handled"` on `ScrollView`

---

### 4.4 Font Loading Issues

**Problem**: Custom fonts don't load or fallback to system fonts.

**Symptoms**:
- Fonts look wrong on first render
- Flash of unstyled text (FOUT)
- Fonts work on one platform but not others
- Console warnings about missing fonts

**Root Cause**: Fonts not loaded before app renders, or incorrect font family names.

**Solution**:

For Expo, use `expo-font`:

```typescript
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
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

For web, add to `app.json`:

```json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

**Prevention Tips**:
- Load fonts before rendering app
- Use `SplashScreen` to hide loading state
- Verify font family names match exactly (case-sensitive)
- Test on all platforms
- Provide fallback fonts for web

---

## 5. Performance Issues

### 5.1 List Rendering Performance

**Problem**: Lists with many items lag or drop frames when scrolling.

**Symptoms**:
- Stuttering during scroll
- Frame drops in React Native performance monitor
- UI freezes when rendering long lists
- Memory usage increases with list size

**Root Cause**: Not using `FlatList` or `FlashList`, or inefficient item rendering.

**Solution**:

Use `FlatList` or `FlashList` for long lists:

```typescript
import { FlashList } from "@shopify/flash-list";
import { Card } from "@korsolutions/ui";

export default function ItemList({ items }: { items: Item[] }) {
  const renderItem = useCallback(({ item }: { item: Item }) => (
    <Card.Root>
      <Card.Header>
        <Card.Title>{item.title}</Card.Title>
        <Card.Description>{item.description}</Card.Description>
      </Card.Header>
    </Card.Root>
  ), []);

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={100}
      keyExtractor={(item) => item.id}
    />
  );
}
```

Memoize list items:

```typescript
import { memo } from "react";

const ListItem = memo(({ item }: { item: Item }) => (
  <Card.Root>
    <Card.Header>
      <Card.Title>{item.title}</Card.Title>
    </Card.Header>
  </Card.Root>
));

export default function ItemList({ items }: { items: Item[] }) {
  return (
    <FlashList
      data={items}
      renderItem={({ item }) => <ListItem item={item} />}
      estimatedItemSize={100}
    />
  );
}
```

**Prevention Tips**:
- Use `FlashList` for best performance (or `FlatList` if not available)
- Memoize list item components with `memo`
- Use `keyExtractor` for stable keys
- Provide `estimatedItemSize` for FlashList
- Avoid inline functions in `renderItem`
- Keep item components simple and flat

---

### 5.2 Theme Update Re-renders

**Problem**: Entire app re-renders when theme changes, causing lag.

**Symptoms**:
- Noticeable delay when toggling theme
- All components flash or re-mount
- Performance monitor shows many re-renders
- Animations stutter during theme change

**Root Cause**: Components not properly memoized or theme context causing cascade re-renders.

**Solution**:

Memoize theme-independent components:

```typescript
import { memo } from "react";

const StaticHeader = memo(() => (
  <View>
    <Text>Header</Text>
  </View>
));

export default function Screen() {
  return (
    <>
      <StaticHeader />
      {/* Theme-dependent content */}
    </>
  );
}
```

Split theme-dependent and independent parts:

```typescript
// Wrong - entire component re-renders on theme change
export default function Screen() {
  const theme = useTheme();

  return (
    <View>
      <StaticContent /> {/* Re-renders unnecessarily */}
      <ThemedContent style={{ color: theme.colors.foreground }} />
    </View>
  );
}

// Correct - isolate theme usage
const ThemedContent = () => {
  const theme = useTheme();
  return <Text style={{ color: theme.colors.foreground }}>Content</Text>;
};

const StaticContent = memo(() => <Text>Static</Text>);

export default function Screen() {
  return (
    <View>
      <StaticContent /> {/* Won't re-render */}
      <ThemedContent />
    </View>
  );
}
```

**Prevention Tips**:
- Use `memo` for components that don't depend on theme
- Isolate theme-dependent logic to leaf components
- Avoid calling `useTheme` at top-level components
- Use `useCallback` for event handlers
- Profile with React DevTools to identify re-render sources

---

## Quick Reference

### Common Error Messages

| Error Message | Section | Quick Fix |
|---------------|---------|-----------|
| "useTheme must be used within a ThemeProvider" | [1.1](#11-uiprovider-not-wrapping-app) | Wrap app with `UIProvider` |
| "Cannot find module '@korsolutions/ui'" | [1.3](#13-import-resolution-errors) | Check package installation and imports |
| "Property 'X' does not exist on type 'Colors'" | [3.2](#32-theme-type-mismatches) | Use `DeepPartial<ThemeAssets>` for custom themes |
| Portal content not showing | [2.4](#24-portal-content-not-showing) | Use `FullWindowOverlay` on iOS |
| Component renders blank | [2.1](#21-components-not-rendering) | Check component composition and children |

### Performance Checklist

- [ ] Use `FlatList` or `FlashList` for lists
- [ ] Memoize list items with `memo`
- [ ] Use `useCallback` for event handlers
- [ ] Isolate theme-dependent components
- [ ] Avoid inline functions in render
- [ ] Provide stable keys for lists
- [ ] Profile with React DevTools

### Setup Checklist

- [ ] Wrap app with `UIProvider`
- [ ] Install all peer dependencies
- [ ] Configure TypeScript with path aliases
- [ ] Provide safe area insets on iOS
- [ ] Load fonts before first render
- [ ] Configure portal container for iOS

---

## Getting Help

If you encounter an issue not covered in this guide:

1. Check the main documentation in `AGENTS.md` files
2. Search existing GitHub issues: https://github.com/KorSoftwareSolutions/ui/issues
3. Review component examples in the `example/` app
4. Open a new GitHub issue with:
   - Minimal reproduction code
   - Platform and version information
   - Error messages and stack traces
   - Screenshots or videos if applicable

---

**Last Updated**: 2026-01-28
**Library Version**: 0.0.51
