# AGENTS.md - Universal UI Monorepo

## Overview

This is a bun workspace monorepo for Universal UI (`@korsolutions/ui`), a library of unstyled UI primitives for React Native and Expo. The project follows a philosophy of minimal dependencies, easy-to-use APIs, and unstyled-by-default components.

## Monorepo Structure

```
kor-ui/
├── library/          # The @korsolutions/ui package
│   ├── src/         # Source code (primitives, components, themes)
│   ├── dist/        # Built package (gitignored)
│   └── AGENTS.md    # Library-specific agent instructions
├── example/         # Expo app demonstrating the library
│   ├── app/         # Expo Router pages
│   └── AGENTS.md    # Example app-specific agent instructions
├── package.json     # Root workspace configuration
└── AGENTS.md        # This file
```

## Quick Command Reference

| Task              | Command         | Location |
| ----------------- | --------------- | -------- |
| Start example app | `bun dev`       | Root     |
| Build library     | `bun lib:build` | Root     |
| Type check all    | `bun ts-check`  | Root     |
| Lint all          | `bun lint`      | Root     |
| Build library     | `bun build`     | library/ |
| Publish library   | `bun publish`   | library/ |
| Start Expo        | `bun dev`       | example/ |
| Web build         | `bun web:build` | example/ |

## Package Responsibilities

### Library Package (`library/`)

**Purpose**: The UI component library itself

**Contains**:

- Primitives (unstyled, headless UI components)
- Components (styled components using primitives)
- Theme system and utilities
- Type definitions

**When to work here**:

- Adding new components
- Creating variants
- Modifying themes
- Fixing component bugs
- Updating build configuration

**See**: [`library/AGENTS.md`](library/AGENTS.md) for detailed component development patterns

### Example Package (`example/`)

**Purpose**: Expo app demonstrating library components

**Contains**:

- Component demo pages
- Navigation structure
- Theme examples
- Usage patterns

**When to work here**:

- Creating component demos
- Testing components visually
- Adding navigation for new components
- Platform-specific examples (web sidebar, etc.)

**See**: [`example/AGENTS.md`](example/AGENTS.md) for demo creation patterns

## Development Workflow

### 1. Adding a New Component

```bash
# Step 1: Create primitive and component in library
cd library/
# Create files in src/primitives/[name]/ and src/components/[name]/
# See library/AGENTS.md for detailed patterns

# Step 2: Build library
bun build

# Step 3: Create demo in example
cd ../example/
# Create app/components/[name].tsx
# Add to constants/components.ts
# See example/AGENTS.md for demo patterns

# Step 4: Test
cd ..
bun dev  # Opens Expo dev server
```

### 2. Testing Changes

```bash
# From root
bun dev              # Start example app with latest library changes

# The example app uses workspace:* dependency
# Changes in library/src/ are available immediately
# No need to rebuild for development
```

### 3. Publishing Library

```bash
# From library directory
cd library/

# 1. Build
bun build

# 2. Type check
bun ts-check

# 3. Publish (bumps version, publishes to npm)
bun publish
```

## Package Dependencies

### Library Dependencies

- Minimal external dependencies
- React Native core
- Expo modules (router, haptics, etc.)

### Example Dependencies

- `@korsolutions/ui: workspace:*` (local library)
- Expo and React Native
- lucide-react-native (for icons in demos)

### Workspace Resolution

The example app imports the library as:

```typescript
import { Button } from "@korsolutions/ui/components";
```

During development, this resolves to `library/src/` via the `dev-source` export condition in `library/package.json`.

## When to Work Where

| Task                      | Location                                  | Reference         |
| ------------------------- | ----------------------------------------- | ----------------- |
| Add new primitive         | `library/src/primitives/`                 | library/AGENTS.md |
| Add new component         | `library/src/components/`                 | library/AGENTS.md |
| Add variant               | `library/src/components/[name]/variants/` | library/AGENTS.md |
| Modify theme              | `library/src/themes/`                     | library/AGENTS.md |
| Create demo               | `example/app/components/`                 | example/AGENTS.md |
| Add to navigation         | `example/constants/components.ts`         | example/AGENTS.md |
| Platform-specific feature | `example/`                                | example/AGENTS.md |

## Common Operations

### Install Dependencies

```bash
# Root (installs for all packages)
bun install
```

### Type Checking

```bash
# Check all packages
bun ts-check

# Check recursively (includes nested)
bun -r ts-check
```

### Linting

```bash
# Lint all packages
bun lint

# Lint recursively
bun -r lint
```

### Building

```bash
# Build library only
bun lib:build

# Or from library directory
cd library && bun build
```

## Architecture Overview

The library uses a **primitive + component + variant** pattern:

1. **Primitives** (`library/src/primitives/`) - Unstyled, headless components providing behavior
2. **Components** (`library/src/components/`) - Styled components using primitives with variants
3. **Variants** (`library/src/components/[name]/variants/`) - Theme-aware style hooks
4. **Themes** (`library/src/themes/`) - Color tokens, spacing, typography

See `library/AGENTS.md` for detailed architecture documentation.

## Build System

- **Library**: Uses `react-native-builder-bob` for cross-platform builds
- **Example**: Uses Expo for web, iOS, and Android builds
- **Development**: Hot reloading via Expo dev server
- **Production**: Library publishes to npm, example deploys to web

## Platform Support

| Platform | Library | Example                       |
| -------- | ------- | ----------------------------- |
| iOS      | ✅      | ✅                            |
| Android  | ✅      | ✅                            |
| Web      | ✅      | ✅ (with responsive features) |

## Environment Requirements

- Node.js >= 18
- bun >= 1.0
- Expo CLI (installed via dev dependencies)

## Troubleshooting

### "Cannot find module @korsolutions/ui"

- Run `bun install` from root
- Check `example/package.json` has `"@korsolutions/ui": "workspace:*"`

### Library changes not reflecting

- Ensure using `dev-source` export condition
- Check `example/tsconfig.json` has `customConditions: ["dev-source"]`
- Restart Expo dev server

### Type errors after changes

- Run `bun ts-check` to see all errors
- Ensure library is built: `cd library && bun build`

### Import path errors

- Use `@/` alias in library for `library/src/`
- Use `@/` alias in example for `example/`
- Check respective `tsconfig.json` files for path mappings

## Skill Maintenance

When adding, removing, or modifying components in the library, update the kor-ui skill to reflect the changes:

- **`skills/kor-ui/SKILL.md`** - Component overview tables, variant lists, and usage examples
- **`skills/kor-ui/references/components-interactive.md`** - Button, IconButton, Tabs, Menu, Popover, Calendar
- **`skills/kor-ui/references/components-layout.md`** - Card, Separator, ScrollBar, Portal, List
- **`skills/kor-ui/references/components-display.md`** - Typography, Avatar, Badge, Icon, Empty, Progress
- **`skills/kor-ui/references/components-inputs.md`** - Input, NumericInput, PhoneInput, Textarea, Checkbox, Select, Field
- **`skills/kor-ui/references/components-feedback.md`** - Alert, AlertDialog, Toast

The skill is for AI consumers to learn how to **use** the library. Focus on API surface, props, variants, and usage examples. Do not document internal implementation details.

## Related Documentation

- **Library Development**: [`library/AGENTS.md`](library/AGENTS.md)
- **Example App**: [`example/AGENTS.md`](example/AGENTS.md)
- **Project Info**: [`README.md`](README.md)

## Quick Links

- [Library Source](library/src/)
- [Components](library/src/components/)
- [Primitives](library/src/primitives/)
- [Example App](example/app/)
- [Component Demos](example/app/components/)
