# Universal UI Patterns & Recipes

A comprehensive reference of common patterns and real-world recipes for building applications with Universal UI. All examples are based on production patterns from the library's example app.

## Table of Contents

1. [Form Patterns](#form-patterns)
2. [Modal Patterns](#modal-patterns)
3. [List Patterns](#list-patterns)
4. [Navigation Patterns](#navigation-patterns)
5. [Feedback Patterns](#feedback-patterns)
6. [Icon Integration](#icon-integration)
7. [State Management Patterns](#state-management-patterns)
8. [Layout Patterns](#layout-patterns)

---

## Form Patterns

### Basic Form with Field + Input

The Field component provides accessible form structure with labels, descriptions, and error states.

```typescript
import { Field, Input } from "@korsolutions/ui";
import { useState } from "react";

function BasicForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Field.Root>
        <Field.Label for="username">Username</Field.Label>
        <Field.Description>
          Choose a unique username for your account.
        </Field.Description>
        <Input
          id="username"
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label for="password">Password</Field.Label>
        <Field.Description>
          Your password must be at least 8 characters long.
        </Field.Description>
        <Input
          id="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
      </Field.Root>
    </>
  );
}
```

### Form with Validation and Error States

```typescript
import { Field, Input, Button, Typography } from "@korsolutions/ui";
import { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

function ValidatedForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (value: string): string | undefined => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Invalid email address";
    }
    return undefined;
  };

  const validatePassword = (value: string): string | undefined => {
    if (!value) return "Password is required";
    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }
    return undefined;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    if (field === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    } else if (field === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    setTouched({ email: true, password: true });

    if (!emailError && !passwordError) {
      console.log("Form submitted:", { email, password });
    }
  };

  return (
    <>
      <Field.Root>
        <Field.Label for="email">Email</Field.Label>
        <Input
          id="email"
          value={email}
          onChange={setEmail}
          onBlur={() => handleBlur("email")}
          placeholder="Enter your email"
        />
        {touched.email && errors.email && (
          <Field.Error>{errors.email}</Field.Error>
        )}
      </Field.Root>

      <Field.Root>
        <Field.Label for="password">Password</Field.Label>
        <Input
          id="password"
          value={password}
          onChange={setPassword}
          onBlur={() => handleBlur("password")}
          placeholder="Enter your password"
          secureTextEntry
        />
        {touched.password && errors.password && (
          <Field.Error>{errors.password}</Field.Error>
        )}
      </Field.Root>

      <Button onPress={handleSubmit}>
        Sign In
      </Button>
    </>
  );
}
```

### Multi-Field Form Layout

```typescript
import { Field, Input } from "@korsolutions/ui";
import { View } from "react-native";

function MultiFieldLayout() {
  return (
    <View style={{ gap: 16 }}>
      {/* Row layout for first/last name */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Field.Root>
            <Field.Label for="firstName">First Name</Field.Label>
            <Input id="firstName" placeholder="John" />
          </Field.Root>
        </View>
        <View style={{ flex: 1 }}>
          <Field.Root>
            <Field.Label for="lastName">Last Name</Field.Label>
            <Input id="lastName" placeholder="Doe" />
          </Field.Root>
        </View>
      </View>

      {/* Full width email */}
      <Field.Root>
        <Field.Label for="email">Email</Field.Label>
        <Input id="email" placeholder="john@example.com" />
      </Field.Root>

      {/* Address fields */}
      <Field.Root>
        <Field.Label for="address">Street Address</Field.Label>
        <Input id="address" placeholder="123 Main St" />
      </Field.Root>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 2 }}>
          <Field.Root>
            <Field.Label for="city">City</Field.Label>
            <Input id="city" placeholder="New York" />
          </Field.Root>
        </View>
        <View style={{ flex: 1 }}>
          <Field.Root>
            <Field.Label for="state">State</Field.Label>
            <Input id="state" placeholder="NY" />
          </Field.Root>
        </View>
        <View style={{ flex: 1 }}>
          <Field.Root>
            <Field.Label for="zip">ZIP</Field.Label>
            <Input id="zip" placeholder="10001" />
          </Field.Root>
        </View>
      </View>
    </View>
  );
}
```

### Submit Button with Loading State

```typescript
import { Button, Field, Input, Toast } from "@korsolutions/ui";
import { useState } from "react";

function FormWithSubmit() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Toast.show({
        id: "form-success",
        variant: "success",
        title: "Success!",
        description: "Your form has been submitted.",
      });

      setEmail("");
    } catch (error) {
      Toast.show({
        id: "form-error",
        variant: "danger",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Field.Root>
        <Field.Label for="email">Email Address</Field.Label>
        <Input
          id="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          isDisabled={isLoading}
        />
      </Field.Root>

      <Button
        onPress={handleSubmit}
        isLoading={isLoading}
        isDisabled={!email}
      >
        
          {isLoading ? "Submitting..." : "Submit"}
        
      </Button>
    </>
  );
}
```

### Numeric Input Form Fields

```typescript
import { Field, NumericInput, Typography } from "@korsolutions/ui";
import { useState } from "react";

function NumericForm() {
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number | null>(null);

  const total = price && quantity
    ? price * quantity * (1 - (discount || 0) / 100)
    : 0;

  return (
    <>
      <Field.Root>
        <Field.Label for="price">Price</Field.Label>
        <NumericInput
          id="price"
          value={price}
          onChange={setPrice}
          format="currency"
          placeholder="$0.00"
          precision={2}
        />
      </Field.Root>

      <Field.Root>
        <Field.Label for="quantity">Quantity</Field.Label>
        <NumericInput
          id="quantity"
          value={quantity}
          onChange={setQuantity}
          format="integer"
          min={1}
          placeholder="Enter quantity"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label for="discount">Discount (%)</Field.Label>
        <NumericInput
          id="discount"
          value={discount}
          onChange={setDiscount}
          format="percentage"
          min={0}
          max={100}
          precision={0}
          placeholder="0%"
        />
      </Field.Root>

      <Typography variant="heading-md">
        Total: ${total.toFixed(2)}
      </Typography>
    </>
  );
}
```

---

## Modal Patterns

### Basic AlertDialog for Confirmations

```typescript
import { AlertDialog, Button } from "@korsolutions/ui";

function BasicConfirmation() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>
          Show Alert Dialog
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete
            your account and remove your data from our servers.
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

### Destructive Action Confirmation

```typescript
import { AlertDialog, Button } from "@korsolutions/ui";

function DestructiveConfirmation() {
  const handleDelete = () => {
    console.log("Account deleted");
    // Perform destructive action
  };

  const handleCancel = () => {
    console.log("Delete cancelled");
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="secondary">
          Delete Account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Account</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete
            your account and remove your data from our servers.
          </AlertDialog.Description>
          <AlertDialog.Footer>
            <AlertDialog.Cancel onPress={handleCancel}>
              Cancel
            </AlertDialog.Cancel>
            <AlertDialog.Action onPress={handleDelete}>
              Delete
            </AlertDialog.Action>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

### Async Dialog Pattern (Promise-based)

```typescript
import { AsyncAlertDialog, Button, Typography } from "@korsolutions/ui";
import { useState } from "react";

function AsyncDialogExample() {
  const [result, setResult] = useState<string>("");

  const handleAsyncAction = async () => {
    const response = await AsyncAlertDialog.show({
      title: "Async Confirmation",
      description: "This dialog uses async/await pattern. Click an action to see the result.",
      actionLabel: "Confirm",
      cancelLabel: "Cancel",
    });

    if (response.confirmed) {
      setResult("User confirmed!");
      // Proceed with action
      await performAsyncOperation();
    } else {
      setResult("User cancelled");
    }
  };

  const performAsyncOperation = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <>
      {result && (
        <Typography variant="body-md">Result: {result}</Typography>
      )}
      <Button onPress={handleAsyncAction}>
        Show Async Dialog
      </Button>
    </>
  );
}
```

### Form in Modal Pattern

```typescript
import { Portal, Button, Card, Input, Field } from "@korsolutions/ui";
import { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";

function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Form submitted:", { name, email });
    setIsOpen(false);
    setName("");
    setEmail("");
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>
        Add User
      </Button>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.overlay}>
          <Card.Root style={styles.modal}>
            <Card.Header>
              <Card.Title>Add New User</Card.Title>
              <Card.Description>
                Enter the user details below
              </Card.Description>
            </Card.Header>

            <Card.Content>
              <Field.Root>
                <Field.Label for="name">Name</Field.Label>
                <Input
                  id="name"
                  value={name}
                  onChange={setName}
                  placeholder="John Doe"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label for="email">Email</Field.Label>
                <Input
                  id="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="john@example.com"
                />
              </Field.Root>
            </Card.Content>

            <Card.Footer style={styles.footer}>
              <Button
                variant="secondary"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button onPress={handleSubmit}>
                Submit
              </Button>
            </Card.Footer>
          </Card.Root>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    width: "100%",
    maxWidth: 500,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
  },
});
```

---

## List Patterns

### Select with List Rendering

```typescript
import { Select, List } from "@korsolutions/ui";
import { useState } from "react";

const OPTIONS = [
  { value: "apple", children: "Apple" },
  { value: "banana", children: "Banana" },
  { value: "cherry", children: "Cherry" },
  { value: "date", children: "Date" },
  { value: "elderberry", children: "Elderberry" },
];

function BasicSelect() {
  const [value, setValue] = useState<string>();

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List
            data={OPTIONS}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option {...item} />
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

### Searchable Select (Combobox Pattern)

```typescript
import { Select, List, Input } from "@korsolutions/ui";
import { useState } from "react";

const OPTIONS = [
  { value: "apple", children: "Apple" },
  { value: "banana", children: "Banana" },
  { value: "cherry", children: "Cherry" },
  { value: "date", children: "Date" },
  { value: "elderberry", children: "Elderberry" },
  { value: "grape", children: "Grape" },
  { value: "honeydew", children: "Honeydew" },
];

function SearchableSelect() {
  const [value, setValue] = useState<string>();
  const [inputValue, setInputValue] = useState<string>("");

  const filteredOptions = OPTIONS.filter((option) =>
    option.children.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <Input
            variant="secondary"
            value={inputValue}
            onChange={setInputValue}
            placeholder="Type to filter..."
            style={{ marginBottom: 8 }}
            autoFocus
          />
          <List
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option {...item} />
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

### Custom Option Rendering

```typescript
import { Select, List, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

const OPTIONS = [
  {
    value: "apple",
    children: "Apple",
    icon: "🍎",
    description: "A sweet red fruit"
  },
  {
    value: "banana",
    children: "Banana",
    icon: "🍌",
    description: "A long yellow fruit"
  },
  {
    value: "cherry",
    children: "Cherry",
    icon: "🍒",
    description: "A small red fruit"
  },
];

function CustomOption(item: typeof OPTIONS[0]) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Typography>{item.icon}</Typography>
      <View style={{ flex: 1 }}>
        <Typography variant="heading-md">{item.children}</Typography>
        <Typography variant="body-sm">{item.description}</Typography>
      </View>
    </View>
  );
}

function CustomSelectOptions() {
  const [value, setValue] = useState<string>();

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List
            data={OPTIONS}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option {...item}>
                <CustomOption {...item} />
              </Select.Option>
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

### Empty States in Lists

```typescript
import { Card, Empty, Avatar, Button } from "@korsolutions/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";
import { View } from "react-native";

function EmptyStateWithAvatar() {
  return (
    <Card.Root>
      <Empty.Root>
        <Empty.Media>
          <Avatar.Root>
            <Avatar.Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/14353231",
              }}
            />
            <Avatar.Fallback>IK</Avatar.Fallback>
          </Avatar.Root>
        </Empty.Media>
        <Empty.Title>User offline</Empty.Title>
        <Empty.Description>
          This user is currently offline. You can leave a message to
          notify them or try again later.
        </Empty.Description>
        <Button>
          Send message
        </Button>
      </Empty.Root>
    </Card.Root>
  );
}

function EmptyStateWithIcon() {
  const theme = useTheme();

  return (
    <Card.Root>
      <Empty.Root>
        <Empty.Media>
          <MaterialCommunityIcons
            name="wifi-off"
            size={48}
            color={theme.colors.mutedForeground}
          />
        </Empty.Media>
        <Empty.Title>Network disconnected</Empty.Title>
        <Empty.Description>
          This device is not connected to the internet. Please check
          your network settings and try again.
        </Empty.Description>
        <View style={{ flexDirection: "row", gap: 16 }}>
          <Button>
            Retry connection
          </Button>
          <Button variant="secondary">
            Open settings
          </Button>
        </View>
      </Empty.Root>
    </Card.Root>
  );
}

function MinimalEmptyState() {
  return (
    <Card.Root>
      <Empty.Root>
        <Empty.Title>No notifications</Empty.Title>
        <Empty.Description>
          You have no new notifications at the moment. Check back
          later for updates.
        </Empty.Description>
      </Empty.Root>
    </Card.Root>
  );
}
```

---

## Navigation Patterns

### Tab Navigation

```typescript
import { Tabs } from "@korsolutions/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function TabNavigation() {
  const [value, setValue] = useState("profile");

  return (
    <View>
      <Tabs.Root value={value} onChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="profile">
            <Tabs.TriggerText value="profile">Profile</Tabs.TriggerText>
          </Tabs.Trigger>
          <Tabs.Trigger value="settings">
            <Tabs.TriggerText value="settings">Settings</Tabs.TriggerText>
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications">
            <Tabs.TriggerText value="notifications">
              Notifications
            </Tabs.TriggerText>
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      {/* Tab content */}
      <View style={{ padding: 16 }}>
        {value === "profile" && <Text>Profile Content</Text>}
        {value === "settings" && <Text>Settings Content</Text>}
        {value === "notifications" && <Text>Notifications Content</Text>}
      </View>
    </View>
  );
}
```

### Tab Navigation with Line Variant

```typescript
import { Tabs } from "@korsolutions/ui";
import { useState } from "react";

function LineTabNavigation() {
  const [value, setValue] = useState("overview");

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics" },
    { value: "reports", label: "Reports" },
  ];

  return (
    <Tabs.Root variant="line" value={value} onChange={setValue}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.value} value={tab.value}>
            <Tabs.TriggerText value={tab.value}>
              {tab.label}
            </Tabs.TriggerText>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
```

### Menu for Dropdowns

```typescript
import { Menu, Button } from "@korsolutions/ui";

function DropdownMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button>
          Open menu
        </Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Overlay />
        <Menu.Content>
          <Menu.Item onPress={() => console.log("Open clicked")}>
            Open
          </Menu.Item>
          <Menu.Item onPress={() => console.log("Rename clicked")}>
            Rename
          </Menu.Item>
          <Menu.Item onPress={() => console.log("Duplicate clicked")}>
            Duplicate
          </Menu.Item>
          <Menu.Item onPress={() => console.log("Download clicked")}>
            Download
          </Menu.Item>
          <Menu.Item onPress={() => console.log("Delete clicked")}>
            Delete
          </Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
}
```

### Link Routing with Expo Router

```typescript
import { Link } from "@korsolutions/ui";
import { View } from "react-native";

function NavigationLinks() {
  return (
    <View style={{ gap: 16 }}>
      {/* Basic navigation */}
      <Link href="/components/button">
        View Button Component
      </Link>

      {/* Navigation with params */}
      <Link href={`/user/${userId}`}>
        View User Profile
      </Link>

      {/* External link */}
      <Link href="https://example.com" external>
        Visit Website
      </Link>
    </View>
  );
}
```

---

## Feedback Patterns

### Success Toast

```typescript
import { Toast, Button } from "@korsolutions/ui";

function SuccessToast() {
  const showSuccess = () => {
    Toast.show({
      id: "success-toast",
      variant: "success",
      title: "Success",
      description: "Your action was completed successfully",
    });
  };

  return (
    <Button onPress={showSuccess}>
      Show Success
    </Button>
  );
}
```

### Error Toast

```typescript
import { Toast, Button } from "@korsolutions/ui";

function ErrorToast() {
  const showError = () => {
    Toast.show({
      id: "error-toast",
      variant: "danger",
      title: "Error",
      description: "Something went wrong. Please try again.",
    });
  };

  return (
    <Button onPress={showError}>
      Show Error
    </Button>
  );
}
```

### Toast with Custom Duration

```typescript
import { Toast, Button } from "@korsolutions/ui";

function CustomDurationToast() {
  const showQuickToast = () => {
    Toast.show({
      id: "quick-toast",
      title: "Quick Message",
      description: "This will disappear in 1 second",
      duration: 1000,
    });
  };

  const showLongToast = () => {
    Toast.show({
      id: "long-toast",
      title: "Important Message",
      description: "This will stay for 10 seconds",
      duration: 10000,
    });
  };

  return (
    <>
      <Button onPress={showQuickToast}>
        Show 1s Toast
      </Button>
      <Button onPress={showLongToast}>
        Show 10s Toast
      </Button>
    </>
  );
}
```

### Alert for Static Feedback

```typescript
import { Alert } from "@korsolutions/ui";
import { InfoIcon } from "lucide-react-native";

function AlertFeedback() {
  return (
    <>
      {/* Informational alert */}
      <Alert.Root>
        <Alert.Icon render={InfoIcon} />
        <Alert.Body>
          <Alert.Title>Information</Alert.Title>
          <Alert.Description>
            Here's some important information you should know.
          </Alert.Description>
        </Alert.Body>
      </Alert.Root>

      {/* Error alert */}
      <Alert.Root variant="destructive">
        <Alert.Icon render={InfoIcon} />
        <Alert.Body>
          <Alert.Title>Error</Alert.Title>
          <Alert.Description>
            Something went wrong. Please try again later.
          </Alert.Description>
        </Alert.Body>
      </Alert.Root>
    </>
  );
}
```

### Loading States

```typescript
import { Button, Progress, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function LoadingStates() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    setProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setIsLoading(false);
  };

  return (
    <View style={{ gap: 16 }}>
      <Button isLoading={isLoading} onPress={handleAsyncAction}>
        
          {isLoading ? "Processing..." : "Start Process"}
        
      </Button>

      {isLoading && (
        <>
          <Progress value={progress} />
          <Typography variant="body-sm">
            {progress}% complete
          </Typography>
        </>
      )}
    </View>
  );
}
```

---

## Icon Integration

### Using lucide-react-native

```typescript
import { Icon } from "@korsolutions/ui";
import {
  Heart,
  Settings,
  User,
  Star,
  Bell,
  MessageCircle
} from "lucide-react-native";
import { View } from "react-native";

function LucideIcons() {
  return (
    <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
      <Icon render={Heart} />
      <Icon render={Settings} />
      <Icon render={User} />
      <Icon render={Star} />
      <Icon render={Bell} />
      <Icon render={MessageCircle} />
    </View>
  );
}
```

### Icons with Custom Colors

```typescript
import { Icon, useTheme } from "@korsolutions/ui";
import { Heart, Check, Mail, Bell } from "lucide-react-native";
import { View } from "react-native";

function ColoredIcons() {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", gap: 16 }}>
      <Icon render={Heart} color={colors.danger} />
      <Icon render={Check} color={colors.success} />
      <Icon render={Mail} color={colors.primary} />
      <Icon render={Bell} color={colors.warning} />
    </View>
  );
}
```

### Icons with Custom Sizes

```typescript
import { Icon } from "@korsolutions/ui";
import { Home } from "lucide-react-native";
import { View } from "react-native";

function SizedIcons() {
  return (
    <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
      <Icon render={Home} size={16} />
      <Icon render={Home} size={24} />
      <Icon render={Home} size={32} />
      <Icon render={Home} size={48} />
      <Icon render={Home} size={64} />
    </View>
  );
}
```

### Using @expo/vector-icons

```typescript
import { Alert } from "@korsolutions/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";

function ExpoVectorIcons() {
  const { colors } = useTheme();

  return (
    <Alert.Root variant="destructive">
      <Alert.Icon
        render={(props) => (
          <MaterialCommunityIcons
            {...props}
            name="alert-circle"
          />
        )}
      />
      <Alert.Body>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>This action cannot be undone.</Alert.Description>
      </Alert.Body>
    </Alert.Root>
  );
}
```

### Icons in Buttons

```typescript
import { Button, Icon } from "@korsolutions/ui";
import { Heart, Download, Share, Trash } from "lucide-react-native";
import { View } from "react-native";

function ButtonsWithIcons() {
  return (
    <View style={{ gap: 12 }}>
      {/* Icon with label */}
      <Button>
        <Icon render={Heart} size={20} />
        Like
      </Button>

      {/* Icon only button */}
      <Button>
        <Icon render={Download} size={20} />
      </Button>

      {/* Multiple buttons in a row */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button variant="secondary">
          <Icon render={Share} size={18} />
          Share
        </Button>
        <Button variant="secondary">
          <Icon render={Trash} size={18} />
          Delete
        </Button>
      </View>
    </View>
  );
}
```

### Icons with Typography

```typescript
import { Icon, Typography } from "@korsolutions/ui";
import { Mail, Check, AlertCircle } from "lucide-react-native";
import { View } from "react-native";

function IconsWithText() {
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Icon render={Mail} />
        <Typography>You have new messages!</Typography>
      </View>

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Icon render={Check} color="#22c55e" />
        <Typography>Operation completed successfully</Typography>
      </View>

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Icon render={AlertCircle} color="#ef4444" />
        <Typography>Please review your settings</Typography>
      </View>
    </View>
  );
}
```

---

## State Management Patterns

### Controlled Component Pattern

```typescript
import { Input, Button } from "@korsolutions/ui";
import { useState } from "react";

function ControlledInput() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    console.log("Value:", value);
    setValue(""); // Clear after submit
  };

  return (
    <>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Enter text"
      />
      <Button onPress={handleSubmit}>
        Submit
      </Button>
    </>
  );
}
```

### Derived State Pattern

```typescript
import { Input, Typography } from "@korsolutions/ui";
import { useState } from "react";

function DerivedState() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Derived state
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

  return (
    <>
      <Input value={firstName} onChange={setFirstName} placeholder="First name" />
      <Input value={lastName} onChange={setLastName} placeholder="Last name" />
      <Typography>Full name: {fullName || "N/A"}</Typography>
      <Typography>Initials: {initials || "N/A"}</Typography>
    </>
  );
}
```

### Toggle State Pattern

```typescript
import { Checkbox, Button, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function ToggleState() {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={{ gap: 16 }}>
      <Checkbox.Root checked={isChecked} onChange={setIsChecked}>
        <Checkbox.Indicator />
        <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
      </Checkbox.Root>

      <Button
        onPress={() => setIsVisible(!isVisible)}
        isDisabled={!isChecked}
      >
        
          {isVisible ? "Hide" : "Show"} Details
        
      </Button>

      {isVisible && (
        <Typography>Additional details are visible</Typography>
      )}
    </View>
  );
}
```

---

## Layout Patterns

### Card Grid Layout

```typescript
import { Card, Typography } from "@korsolutions/ui";
import { View, StyleSheet } from "react-native";

function CardGrid() {
  const items = [
    { id: 1, title: "Card 1", description: "Description 1" },
    { id: 2, title: "Card 2", description: "Description 2" },
    { id: 3, title: "Card 3", description: "Description 3" },
    { id: 4, title: "Card 4", description: "Description 4" },
  ];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.id} style={styles.gridItem}>
          <Card.Root>
            <Card.Header>
              <Card.Title>{item.title}</Card.Title>
              <Card.Description>{item.description}</Card.Description>
            </Card.Header>
          </Card.Root>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  gridItem: {
    width: "48%", // Two columns on mobile
    // On larger screens, you might want to use useScreenSize
  },
});
```

### Responsive Container Pattern

```typescript
import { Card, useScreenSize } from "@korsolutions/ui";
import { View, StyleSheet } from "react-native";

function ResponsiveContainer() {
  const screenSize = useScreenSize();

  return (
    <View style={[
      styles.container,
      screenSize.isMobile && styles.containerMobile,
      screenSize.isTablet && styles.containerTablet,
      screenSize.isDesktop && styles.containerDesktop,
    ]}>
      <Card.Root>
        <Card.Content>
          {/* Your content */}
        </Card.Content>
      </Card.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  containerMobile: {
    maxWidth: "100%",
  },
  containerTablet: {
    maxWidth: 768,
    alignSelf: "center",
  },
  containerDesktop: {
    maxWidth: 1200,
    alignSelf: "center",
  },
});
```

This comprehensive reference covers the most common patterns and real-world recipes for building applications with Universal UI. All examples are based on production code from the library's example app and follow best practices for accessibility, performance, and maintainability.
