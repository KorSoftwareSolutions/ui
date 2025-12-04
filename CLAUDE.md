# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Universal UI is a library of unstyled UI primitives for React Native and Expo, published as `@korsolutions/ui`. The project follows a philosophy of minimal dependencies, easy-to-use APIs, and unstyled-by-default components.

## Monorepo Structure

This is a pnpm workspace monorepo with two packages:

- **library/** - The main UI library package (`@korsolutions/ui`)
- **example/** - An Expo app demonstrating the library components

## Common Commands

### Development
```bash
pnpm dev                # Start the example app (Expo dev server)
pnpm --filter library build   # Build the library package
pnpm lib:build          # Alias for building the library
```

### Type Checking & Linting
```bash
pnpm ts-check           # Type check all packages
pnpm -r ts-check        # Type check recursively (all packages)
pnpm lint               # Lint all packages
pnpm -r lint            # Lint recursively (all packages)
```

### Library Publishing
```bash
cd library
pnpm build              # Build before publishing
pnpm publish            # Publish to npm with public access
```

### Example App Commands
```bash
cd example
pnpm dev                # Start Expo dev server
pnpm android            # Start on Android
pnpm ios                # Start on iOS
pnpm web                # Start web version
pnpm web:build          # Build for web
pnpm web:deploy         # Deploy to Firebase hosting
```

## Architecture

### Library Package Structure

The library uses a **primitive + component** pattern:

#### Primitives (`library/src/primitives/`)
Unstyled, headless UI components that provide functionality without opinions on styling. Each primitive is a compound component exported as an object with sub-components:

```typescript
ButtonPrimitive = {
  Root: ButtonRoot,
  Label: ButtonLabel,
  Spinner: ButtonSpinner
}
```

Primitives handle behavior, accessibility, and structure but don't apply visual styles.

#### Components (`library/src/components/`)
Pre-composed components that use primitives and apply variant styles. Components use a **variants system** where each variant is a hook that returns themed styles:

```typescript
// Component uses variant
function Button(props: ButtonProps) {
  const variantStyles = ButtonVariants[props.variant]();
  return <ButtonPrimitive.Root styles={variantStyles}>...</ButtonPrimitive.Root>
}
```

Variants are located in `variants.ts` files within each component directory.

#### Theme System (`library/src/themes/`)
Centralized theming through `ThemeProvider` and `useTheme` hook. Themes define:
- **colors** - Color tokens (supports light/dark color schemes)
- **radius** - Border radius values
- **fontFamily** - Font family tokens
- **fontSize** - Font size tokens
- **letterSpacing** - Letter spacing values

Themes are defined in `library/src/themes/themes.ts`. The system automatically responds to device color scheme changes.

#### Utilities (`library/src/utils/`)
- `use-themed-styles.ts` - Hook for creating themed styles
- `calculate-styles.ts` - Style calculation helpers
- `normalize-layout.ts` - Layout normalization utilities
- `hsla-utils.ts` - HSLA color manipulation

#### Hooks (`library/src/hooks/`)
Custom React hooks like `useScreenSize` for responsive behavior.

### Build System

The library uses **tsdown** for bundling. Configuration is in `library/tsdown.config.ts` with multiple entry points:
- `./src/index.tsx` - Main entry (provider, hooks)
- `./src/primitives/index.ts` - Primitives export
- `./src/components/index.ts` - Components export
- `./src/hooks/index.ts` - Hooks export

### Package Exports

The library supports subpath exports for tree-shaking:
```typescript
import { UniversalUIProvider } from '@korsolutions/ui'
import { ButtonPrimitive } from '@korsolutions/ui/primitives'
import { Button } from '@korsolutions/ui/components'
import { useScreenSize } from '@korsolutions/ui/hooks'
```

### Example App Structure

Built with Expo Router (file-based routing):
- `example/app/_layout.tsx` - Root layout wrapping app with `UniversalUIProvider`
- `example/app/index.tsx` - Home screen
- `example/app/components/` - Component demo pages

The example app imports the library as a workspace dependency (`@korsolutions/ui: workspace:*`) and uses `customConditions: ["dev-source"]` in tsconfig to import from library source files during development instead of built files.

## Key Development Patterns

### Adding a New Component

1. Create primitive in `library/src/primitives/[name]/`
   - Define compound component structure (Root, Label, etc.)
   - Export types and primitive object

2. Create component in `library/src/components/[name]/`
   - Create `[name].tsx` with main component
   - Create `variants.ts` with styled variants
   - Export from `library/src/components/index.ts`

3. Add demo in `example/app/components/[name].tsx`

### Working with Themes

Always use `useTheme()` to access theme values. Use the `useThemedStyles` utility for reactive theme-aware styles:

```typescript
const styles = useThemedStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md
  }
}))
```

### TypeScript Configuration

- Library extends `expo/tsconfig.base` with strict mode enabled
- Path alias `@/*` maps to `library/src/*`
- Build outputs to `library/dist/` with `.mjs` and `.d.mts` extensions

## Requirements

- Node.js >= 18
- pnpm >= 8
