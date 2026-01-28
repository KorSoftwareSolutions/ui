# Feedback Components Reference

This document covers all feedback components in the Universal UI library that provide user notifications, confirmations, and status messages.

## Table of Contents

1. [Alert](#alert)
2. [AlertDialog](#alertdialog)
3. [Toast](#toast)

---

## Alert

### Overview

Alert is a non-intrusive message component for displaying important information, warnings, or errors to users. It appears inline with content and does not interrupt user flow.

**When to use:**
- Display contextual information or notices
- Show warning messages that don't require immediate action
- Present error messages for failed operations
- Highlight important information on a page

**When NOT to use:**
- Time-sensitive notifications (use Toast)
- Require user confirmation (use AlertDialog)
- Need to interrupt user flow (use AlertDialog)

### API

#### Alert.Root

The root container that provides context and styling.

```typescript
interface AlertRootProps {
  variant?: "default" | "destructive";
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: (props: AlertRootProps) => React.ReactNode;
}
```

**Props:**
- `variant` - Visual style variant (default: "default")
- `children` - Sub-components (Icon, Body, Title, Description)
- `style` - Additional styles to override variant styles
- `render` - Custom render function to replace default View

#### Alert.Icon

Displays an icon in the alert.

```typescript
interface AlertIconProps extends SvgProps {
  render: (props: SvgProps) => React.ReactElement;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `render` - Icon component from lucide-react-native or custom SVG
- `size` - Icon size (inherited from variant if not specified)
- `color` - Icon color (inherited from variant if not specified)
- `style` - Additional styles

#### Alert.Body

Container for title and description, provides flexible layout.

```typescript
interface AlertBodyProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  render?: (props: AlertBodyProps) => React.ReactNode;
}
```

**Props:**
- `children` - Alert.Title and Alert.Description components
- `style` - Additional styles
- `render` - Custom render function

#### Alert.Title

The alert title/heading.

```typescript
interface AlertTitleProps {
  children?: TextChildren;
  style?: StyleProp<TextStyle>;
  render?: (props: AlertTitleProps) => React.ReactNode;
}
```

**Props:**
- `children` - Title text
- `style` - Additional text styles
- `render` - Custom render function

#### Alert.Description

The alert description/body text.

```typescript
interface AlertDescriptionProps {
  children?: TextChildren;
  style?: StyleProp<TextStyle>;
  render?: (props: AlertDescriptionProps) => React.ReactNode;
}
```

**Props:**
- `children` - Description text
- `style` - Additional text styles
- `render` - Custom render function

### Variants

#### Default
- Background: `colors.background`
- Border: `colors.border`
- Text: `colors.foreground`
- Use for general information and notices

#### Destructive
- Background: `colors.background`
- Border: `colors.danger`
- Text: `colors.danger`
- Use for errors, warnings, and critical information

### Examples

#### Basic Alert

```typescript
import { Alert } from "@korsolutions/ui";

export default function Example() {
  return (
    <Alert.Root>
      <Alert.Body>
        <Alert.Title>Note</Alert.Title>
        <Alert.Description>
          This is a default alert with a title and description.
        </Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}
```

#### Alert with Icon

```typescript
import { Alert } from "@korsolutions/ui";
import { InfoIcon } from "lucide-react-native";

export default function Example() {
  return (
    <Alert.Root>
      <Alert.Icon render={InfoIcon} />
      <Alert.Body>
        <Alert.Title>Information</Alert.Title>
        <Alert.Description>
          Here's some important information you should know.
        </Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}
```

#### Destructive Alert

```typescript
import { Alert } from "@korsolutions/ui";
import { AlertCircleIcon } from "lucide-react-native";

export default function Example() {
  return (
    <Alert.Root variant="destructive">
      <Alert.Icon render={AlertCircleIcon} />
      <Alert.Body>
        <Alert.Title>Error</Alert.Title>
        <Alert.Description>
          Something went wrong. Please try again later.
        </Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}
```

#### Alert without Icon

```typescript
import { Alert } from "@korsolutions/ui";

export default function Example() {
  return (
    <Alert.Root variant="destructive">
      <Alert.Body>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>
          This action cannot be undone.
        </Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}
```

#### Custom Icon (using @expo/vector-icons)

```typescript
import { Alert } from "@korsolutions/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Example() {
  return (
    <Alert.Root variant="destructive">
      <Alert.Icon render={(props) =>
        <MaterialCommunityIcons {...props} name="alert-circle" />
      } />
      <Alert.Body>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>
          This action cannot be undone.
        </Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}
```

---

## AlertDialog

### Overview

AlertDialog is a modal dialog that interrupts user flow to present important information and request confirmation. It blocks interaction with the rest of the app until dismissed.

**When to use:**
- Confirm destructive actions (delete, logout)
- Request user permission before proceeding
- Display critical warnings that require acknowledgment
- Present choices with clear consequences

**When NOT to use:**
- Simple notifications (use Toast)
- Non-blocking information (use Alert)
- Complex forms (use Modal or Sheet)

### API

#### AlertDialog.Root

The root provider that manages dialog state.

```typescript
interface AlertDialogRootProps {
  variant?: "default";
  children: React.ReactNode;
}
```

**Props:**
- `variant` - Visual style variant (default: "default")
- `children` - All AlertDialog sub-components

#### AlertDialog.Trigger

Wraps a pressable element that opens the dialog.

```typescript
interface AlertDialogTriggerProps extends PressableProps {
  children: React.ReactElement<React.RefAttributes<ViewRef> & PressableProps>;
}
```

**Props:**
- `children` - Single pressable child element (Button, Pressable, etc.)
- Inherits all PressableProps
- Automatically adds accessibility attributes

#### AlertDialog.Portal

Portal component that renders dialog content in a separate layer.

```typescript
interface AlertDialogPortalProps {
  children: React.ReactNode;
}
```

**Props:**
- `children` - Overlay, Content, and other dialog elements
- Only renders when dialog is open

#### AlertDialog.Overlay

Semi-transparent background overlay.

```typescript
interface AlertDialogOverlayProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `style` - Additional styles
- Inherits all PressableProps
- Closes dialog when pressed (dismissible)

#### AlertDialog.Content

The main dialog container.

```typescript
interface AlertDialogContentProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `children` - Dialog content (Title, Description, Footer)
- `style` - Additional styles
- Inherits all ViewProps

#### AlertDialog.Title

The dialog title/heading.

```typescript
interface AlertDialogTitleProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}
```

**Props:**
- `children` - Title text
- `style` - Additional text styles
- Inherits all TextProps

#### AlertDialog.Description

The dialog description/message.

```typescript
interface AlertDialogDescriptionProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}
```

**Props:**
- `children` - Description text
- `style` - Additional text styles
- Inherits all TextProps

#### AlertDialog.Footer

Container for action buttons.

```typescript
interface AlertDialogFooterProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `children` - Cancel and Action buttons
- `style` - Additional styles (default: row layout with gap)
- Inherits all ViewProps

#### AlertDialog.Cancel

Cancel/dismiss button.

```typescript
interface AlertDialogCancelProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `children` - Button text
- `style` - Additional button styles
- `onPress` - Custom handler (called before closing)
- Automatically closes dialog when pressed

#### AlertDialog.Action

Confirm/action button.

```typescript
interface AlertDialogActionProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

**Props:**
- `children` - Button text
- `style` - Additional button styles
- `onPress` - Custom handler (called before closing)
- Automatically closes dialog when pressed

### Async API

#### AsyncAlertDialog.show()

Programmatic API for showing dialogs with async/await pattern.

```typescript
interface AsyncAlertDialogProps {
  variant?: "default";
  title: string;
  description: string;
  actionLabel?: string;  // default: "Continue"
  cancelLabel?: string;  // default: "Cancel"
}

interface AsyncAlertDialogResult {
  confirmed: boolean;
}

AsyncAlertDialog.show(
  props: AsyncAlertDialogProps
): Promise<AsyncAlertDialogResult>
```

**Props:**
- `variant` - Visual style variant
- `title` - Dialog title (required)
- `description` - Dialog message (required)
- `actionLabel` - Text for confirm button
- `cancelLabel` - Text for cancel button

**Returns:**
- Promise that resolves when user makes a choice
- `{ confirmed: true }` if user clicked action button
- `{ confirmed: false }` if user clicked cancel button or dismissed

**Features:**
- Queue system prevents multiple dialogs simultaneously
- Automatic dialog management
- No need to manage state manually
- Works with async/await pattern

#### AsyncAlertDialogManager

Required component to enable async dialogs. Must be rendered once in your app.

```typescript
import { AsyncAlertDialogManager } from "@korsolutions/ui";

export default function RootLayout() {
  return (
    <>
      <App />
      <AsyncAlertDialogManager />
    </>
  );
}
```

### Examples

#### Basic Dialog

```typescript
import { AlertDialog, Button } from "@korsolutions/ui";

export default function Example() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button.Root>
          <Button.Label>Show Dialog</Button.Label>
        </Button.Root>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action>Continue</AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

#### With Callbacks

```typescript
import { AlertDialog, Button } from "@korsolutions/ui";

export default function Example() {
  const handleConfirm = () => {
    console.log("User confirmed!");
    // Perform action
  };

  const handleCancel = () => {
    console.log("User cancelled");
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button.Root>
          <Button.Label>Delete Account</Button.Label>
        </Button.Root>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Account</AlertDialog.Title>
          <AlertDialog.Description>
            This will permanently delete your account and remove your
            data from our servers. This action cannot be undone.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel onPress={handleCancel}>
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action onPress={handleConfirm}>
              Delete
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

#### Async Pattern (Recommended)

```typescript
import { AsyncAlertDialog, Button } from "@korsolutions/ui";
import { useState } from "react";

export default function Example() {
  const [result, setResult] = useState<string>("");

  const handleDelete = async () => {
    const response = await AsyncAlertDialog.show({
      title: "Delete Account",
      description: "This action cannot be undone. Are you sure?",
      actionLabel: "Delete",
      cancelLabel: "Keep Account",
    });

    if (response.confirmed) {
      // User confirmed - proceed with deletion
      await deleteAccount();
      setResult("Account deleted");
    } else {
      // User cancelled
      setResult("Cancelled");
    }
  };

  return (
    <Button.Root onPress={handleDelete}>
      <Button.Label>Delete Account</Button.Label>
    </Button.Root>
  );
}
```

#### Async with Error Handling

```typescript
import { AsyncAlertDialog, Button, Toast } from "@korsolutions/ui";

export default function Example() {
  const handleRiskyOperation = async () => {
    const response = await AsyncAlertDialog.show({
      title: "Confirm Action",
      description: "This will modify your data. Continue?",
      actionLabel: "Yes, Continue",
      cancelLabel: "No, Cancel",
    });

    if (!response.confirmed) {
      return;
    }

    try {
      await performRiskyOperation();
      Toast.show({
        id: "success",
        variant: "success",
        title: "Success",
        description: "Operation completed successfully",
      });
    } catch (error) {
      Toast.show({
        id: "error",
        variant: "danger",
        title: "Error",
        description: "Operation failed. Please try again.",
      });
    }
  };

  return (
    <Button.Root onPress={handleRiskyOperation}>
      <Button.Label>Start Operation</Button.Label>
    </Button.Root>
  );
}
```

#### Multiple Sequential Confirmations

```typescript
import { AsyncAlertDialog, Button } from "@korsolutions/ui";

export default function Example() {
  const handleMultiStep = async () => {
    // First confirmation
    const firstResponse = await AsyncAlertDialog.show({
      title: "Step 1: Backup Data",
      description: "Do you want to backup your data first?",
      actionLabel: "Yes, Backup",
      cancelLabel: "Skip",
    });

    if (firstResponse.confirmed) {
      await backupData();
    }

    // Second confirmation
    const secondResponse = await AsyncAlertDialog.show({
      title: "Step 2: Delete Account",
      description: "Proceed with account deletion?",
      actionLabel: "Delete",
      cancelLabel: "Cancel",
    });

    if (secondResponse.confirmed) {
      await deleteAccount();
    }
  };

  return (
    <Button.Root onPress={handleMultiStep}>
      <Button.Label>Start Process</Button.Label>
    </Button.Root>
  );
}
```

---

## Toast

### Overview

Toast is an imperative notification system for displaying temporary, non-blocking messages. Toasts appear at the top of the screen and auto-dismiss after a duration.

**When to use:**
- Success confirmations ("Saved!", "Updated!")
- Error notifications that don't require action
- Brief status updates
- Non-critical information
- Undo confirmations

**When NOT to use:**
- Critical errors requiring immediate attention (use AlertDialog)
- Persistent information (use Alert)
- Messages requiring user action (use AlertDialog)
- Long messages (use Alert or AlertDialog)

### API

#### Toast.show()

Displays a toast notification.

```typescript
interface ToastConfig {
  id: string;              // Unique identifier (prevents duplicates)
  title: string;           // Toast title (required)
  description?: string;    // Optional description
  variant?: "default" | "success" | "danger";
  duration?: number;       // Auto-dismiss duration in ms (default: 3000)
}

Toast.show(config: ToastConfig): string
```

**Props:**
- `id` - Unique identifier (required). Prevents duplicate toasts
- `title` - Toast title text (required)
- `description` - Optional description text
- `variant` - Visual style variant (default: "default")
- `duration` - Time before auto-dismiss in milliseconds (default: 3000)

**Returns:**
- The toast ID (same as input `id`)

#### Toast.dismiss()

Manually dismisses a toast.

```typescript
Toast.dismiss(id: string): void
```

**Props:**
- `id` - ID of toast to dismiss

### Variants

#### Default
- Background: `colors.surface`
- Border: `colors.border`
- Text: `colors.foreground`
- Use for general notifications

#### Success
- Background: `colors.success`
- Border: `colors.success`
- Text: `colors.foreground`
- Use for successful operations

#### Danger
- Background: `colors.danger`
- Border: `colors.danger`
- Text: `colors.foreground`
- Use for errors and failures

### Positioning

Toasts appear at the top center of the screen with:
- Top padding: Safe area top inset + 24px
- Horizontal centering
- Maximum width: 400px
- Multiple toasts stack vertically with 8px gap

### Examples

#### Basic Toast

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const showToast = () => {
    Toast.show({
      id: "notification",
      title: "Notification",
      description: "This is a default toast message",
    });
  };

  return (
    <Button.Root onPress={showToast}>
      <Button.Label>Show Toast</Button.Label>
    </Button.Root>
  );
}
```

#### Title Only

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const showToast = () => {
    Toast.show({
      id: "quick-note",
      title: "Settings saved",
    });
  };

  return (
    <Button.Root onPress={showToast}>
      <Button.Label>Save Settings</Button.Label>
    </Button.Root>
  );
}
```

#### Success Toast

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const handleSubmit = async () => {
    await submitForm();

    Toast.show({
      id: "form-success",
      variant: "success",
      title: "Success",
      description: "Your form was submitted successfully",
    });
  };

  return (
    <Button.Root onPress={handleSubmit}>
      <Button.Label>Submit</Button.Label>
    </Button.Root>
  );
}
```

#### Error Toast

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const handleDelete = async () => {
    try {
      await deleteItem();
    } catch (error) {
      Toast.show({
        id: "delete-error",
        variant: "danger",
        title: "Error",
        description: "Failed to delete item. Please try again.",
      });
    }
  };

  return (
    <Button.Root onPress={handleDelete}>
      <Button.Label>Delete</Button.Label>
    </Button.Root>
  );
}
```

#### Custom Duration

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const showQuickToast = () => {
    Toast.show({
      id: "quick-message",
      title: "Quick message",
      description: "This will disappear in 1 second",
      duration: 1000,
    });
  };

  const showLongToast = () => {
    Toast.show({
      id: "long-message",
      title: "Important",
      description: "Take your time reading this (10 seconds)",
      duration: 10000,
    });
  };

  return (
    <>
      <Button.Root onPress={showQuickToast}>
        <Button.Label>Quick (1s)</Button.Label>
      </Button.Root>
      <Button.Root onPress={showLongToast}>
        <Button.Label>Long (10s)</Button.Label>
      </Button.Root>
    </>
  );
}
```

#### Manual Dismiss

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const toastId = "persistent-toast";

  const showPersistentToast = () => {
    Toast.show({
      id: toastId,
      title: "Processing...",
      description: "Please wait",
      duration: 0,  // Won't auto-dismiss
    });
  };

  const dismissToast = () => {
    Toast.dismiss(toastId);
  };

  return (
    <>
      <Button.Root onPress={showPersistentToast}>
        <Button.Label>Start Process</Button.Label>
      </Button.Root>
      <Button.Root onPress={dismissToast}>
        <Button.Label>Dismiss</Button.Label>
      </Button.Root>
    </>
  );
}
```

#### Duplicate Prevention

```typescript
import { Toast, Button } from "@korsolutions/ui";

export default function Example() {
  const showToast = () => {
    // Even if called multiple times, only one toast with this ID
    // will be shown at a time
    Toast.show({
      id: "unique-notification",
      title: "Notification",
      description: "This won't duplicate even if clicked multiple times",
    });
  };

  return (
    <Button.Root onPress={showToast}>
      <Button.Label>Click Multiple Times</Button.Label>
    </Button.Root>
  );
}
```

#### Toast with Form Submission

```typescript
import { Toast, Button, Input } from "@korsolutions/ui";
import { useState } from "react";

export default function Example() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Toast.show({
        id: "validation-error",
        variant: "danger",
        title: "Validation Error",
        description: "Name is required",
      });
      return;
    }

    setIsLoading(true);

    try {
      await submitName(name);

      Toast.show({
        id: "submit-success",
        variant: "success",
        title: "Success",
        description: "Name saved successfully",
      });

      setName("");
    } catch (error) {
      Toast.show({
        id: "submit-error",
        variant: "danger",
        title: "Error",
        description: "Failed to save. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Input.Root>
        <Input.Field
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </Input.Root>
      <Button.Root onPress={handleSubmit} isLoading={isLoading}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
    </>
  );
}
```

---

## Component Comparison

### When to use which?

| Component | Use Case | Blocks UI | Requires Action | Auto-Dismiss |
|-----------|----------|-----------|-----------------|--------------|
| **Alert** | Inline information, contextual warnings | No | No | No |
| **AlertDialog** | Confirmations, critical decisions | Yes | Yes | No |
| **Toast** | Success messages, brief notifications | No | No | Yes |

### Decision Tree

```
Need user confirmation?
├─ Yes → Use AlertDialog
└─ No
   ├─ Critical information?
   │  └─ Yes → Use AlertDialog
   └─ No
      ├─ Inline with content?
      │  └─ Yes → Use Alert
      └─ No → Use Toast
```

---

## Common Patterns

### Form Submission with All Three

```typescript
import { Alert, AsyncAlertDialog, Toast, Button } from "@korsolutions/ui";
import { useState } from "react";

export default function FormExample() {
  const [hasChanges, setHasChanges] = useState(false);

  const handleSubmit = async () => {
    try {
      await submitForm();

      Toast.show({
        id: "submit-success",
        variant: "success",
        title: "Form submitted successfully",
      });

      setHasChanges(false);
    } catch (error) {
      Toast.show({
        id: "submit-error",
        variant: "danger",
        title: "Submission failed",
      });
    }
  };

  const handleCancel = async () => {
    if (hasChanges) {
      const response = await AsyncAlertDialog.show({
        title: "Unsaved Changes",
        description: "You have unsaved changes. Discard them?",
        actionLabel: "Discard",
        cancelLabel: "Keep Editing",
      });

      if (response.confirmed) {
        // Navigate away or reset form
      }
    }
  };

  return (
    <>
      <Alert.Root>
        <Alert.Body>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>
            All fields marked with * are required.
          </Alert.Description>
        </Alert.Body>
      </Alert.Root>

      {/* Form fields here */}

      <Button.Root onPress={handleSubmit}>
        <Button.Label>Submit</Button.Label>
      </Button.Root>
      <Button.Root onPress={handleCancel}>
        <Button.Label>Cancel</Button.Label>
      </Button.Root>
    </>
  );
}
```

---

## Setup Requirements

### Toast Container

Toast requires the `ToastContainer` component to be rendered once in your app:

```typescript
// app/_layout.tsx
import { ToastContainer } from "@korsolutions/ui";

export default function RootLayout() {
  return (
    <>
      <Stack />
      <ToastContainer />
    </>
  );
}
```

### AsyncAlertDialog Manager

AsyncAlertDialog requires the `AsyncAlertDialogManager` component:

```typescript
// app/_layout.tsx
import { AsyncAlertDialogManager } from "@korsolutions/ui";

export default function RootLayout() {
  return (
    <>
      <Stack />
      <AsyncAlertDialogManager />
    </>
  );
}
```

### Complete Setup Example

```typescript
// app/_layout.tsx
import {
  UniversalUIProvider,
  ToastContainer,
  AsyncAlertDialogManager
} from "@korsolutions/ui";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UniversalUIProvider>
      <Stack />
      <ToastContainer />
      <AsyncAlertDialogManager />
    </UniversalUIProvider>
  );
}
```

---

## Accessibility

### Alert
- Non-intrusive, screen reader accessible
- Proper semantic structure (title/description)
- Does not interrupt user flow

### AlertDialog
- Blocks interaction until dismissed
- Proper focus management
- Escape key support (web)
- Overlay dismissible by default
- Accessibility attributes on trigger

### Toast
- Announced by screen readers
- Does not block interaction
- Auto-dismisses to avoid clutter
- Positioned in safe area

---

## Platform Considerations

### iOS
- All components work natively
- Toasts respect safe area insets
- AlertDialog uses native modal

### Android
- All components work natively
- Proper back button handling for AlertDialog
- Toast positioning accounts for status bar

### Web
- AlertDialog Overlay responds to Escape key
- Toasts use CSS transforms for positioning
- All interactions work with keyboard navigation
