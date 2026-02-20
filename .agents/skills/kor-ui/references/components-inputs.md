# Input Components Reference

This reference covers all input-related components in the Universal UI library, providing detailed API documentation, usage examples, and patterns for building forms and user input interfaces.

## Table of Contents

- [Input](#input)
- [NumericInput](#numericinput)
- [PhoneInput](#phoneinput)
- [Textarea](#textarea)
- [Checkbox](#checkbox)
- [Select](#select)
- [Field](#field)

---

## Input

A single-line text input component with support for different states (default, focused, disabled) and variants.

### When to Use

- Collecting short text values (name, email, username)
- Single-line form fields
- Search inputs
- When you need a simple, straightforward text input

**Do not use for**:

- Multi-line text (use Textarea instead)
- Numeric values with formatting (use NumericInput instead)
- Selecting from predefined options (use Select instead)

### API

#### Props

```typescript
interface InputProps extends Omit<TextInputProps, "onChange"> {
  // Styling
  variant?: "default" | "secondary";
  style?: StyleProp<ViewStyle>;

  // Value & Change
  value?: string;
  onChange?: (text: string) => void;
  defaultValue?: string;

  // States
  isDisabled?: boolean;
  readOnly?: boolean;

  // Display
  placeholder?: string;
  placeholderTextColor?: string;

  // Behavior
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "url";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: string;
  autoCorrect?: boolean;
  maxLength?: number;

  // Events
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;

  // Ref
  ref?: React.Ref<TextInput>;
}
```

#### States

The Input component automatically manages these internal states:

- **default**: Normal, unfocused state
- **focused**: When the input has focus
- **disabled**: When `isDisabled={true}`

#### Variants

- **default**: Standard input with border
- **secondary**: Alternative styling (project-specific)

### Basic Usage

```typescript
import { Input } from "@korsolutions/ui";
import { useState } from "react";

function BasicInput() {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={setValue}
      placeholder="Enter text"
    />
  );
}
```

### Advanced Usage

#### Controlled Input with Validation

```typescript
import { Input } from "@korsolutions/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function ValidatedInput() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !text.includes("@")) {
      setError("Please enter a valid email");
    } else {
      setError("");
    }
  };

  return (
    <View>
      <Input
        value={email}
        onChange={validateEmail}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      {error && <Text style={{ color: "red" }}>{error}</Text>}
    </View>
  );
}
```

#### Password Input

```typescript
import { Input } from "@korsolutions/ui";
import { useState } from "react";

function PasswordInput() {
  const [password, setPassword] = useState("");

  return (
    <Input
      value={password}
      onChange={setPassword}
      placeholder="Password"
      secureTextEntry
      autoCapitalize="none"
      autoComplete="password"
    />
  );
}
```

#### With Field Component

```typescript
import { Field, Input } from "@korsolutions/ui";
import { useState } from "react";

function FieldInput() {
  const [username, setUsername] = useState("");

  return (
    <Field.Root>
      <Field.Label>Username</Field.Label>
      <Field.Description>
        Choose a unique username for your account
      </Field.Description>
      <Input
        value={username}
        onChange={setUsername}
        placeholder="Enter username"
        autoCapitalize="none"
        maxLength={20}
      />
    </Field.Root>
  );
}
```

#### Disabled State

```typescript
<Input
  value="Cannot edit this"
  isDisabled
  placeholder="Disabled input"
/>
```

### Common Patterns

#### Focus Management

```typescript
import { Input } from "@korsolutions/ui";
import { useRef } from "react";
import { TextInput } from "react-native";

function FocusableInput() {
  const inputRef = useRef<TextInput>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Input
      ref={inputRef}
      placeholder="Click button to focus"
    />
  );
}
```

#### Character Counter

```typescript
import { Input } from "@korsolutions/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function CharacterCounter() {
  const [value, setValue] = useState("");
  const maxLength = 50;

  return (
    <View>
      <Input
        value={value}
        onChange={setValue}
        maxLength={maxLength}
        placeholder="Enter text"
      />
      <Text>{value.length}/{maxLength}</Text>
    </View>
  );
}
```

### Accessibility

- Uses native TextInput for full platform accessibility support
- Supports screen readers automatically
- When used with Field component, automatically connects to labels via `id`
- Properly announces disabled and read-only states

---

## NumericInput

A specialized input component for numeric values with automatic formatting, localization, and constraints. Built on top of the Input component with the `useNumericMask` hook.

### When to Use

- Currency input (USD, EUR, etc.)
- Percentage values
- Integer-only fields (quantity, age)
- Decimal numbers with specific precision
- Values that need min/max constraints

**Do not use for**:

- Free-form text (use Input instead)
- Phone numbers (use PhoneInput instead)
- Postal/zip codes (use Input)

### API

#### Props

```typescript
interface NumericInputProps extends Omit<InputProps, "value" | "onChange" | "keyboardType"> {
  // Value & Change
  value?: number | null;
  onChange?: (value: number | null) => void;

  // Format
  format?: "currency" | "decimal" | "integer" | "percentage";
  precision?: number; // Default: 2 for currency/decimal, 0 for integer

  // Localization
  locale?: string; // Default: "en-US"
  currency?: string; // Default: "USD", used when format="currency"

  // Constraints
  min?: number;
  max?: number;
  allowNegative?: boolean; // Default: true

  // Inherited from Input
  variant?: "default" | "secondary";
  isDisabled?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}
```

#### Format Types

- **currency**: Displays as currency (e.g., $1,234.56)
- **decimal**: Displays as decimal number (e.g., 1,234.56)
- **integer**: Whole numbers only (e.g., 1,234)
- **percentage**: Displays as percentage (e.g., 12.5%)

#### Behavior

- **While Focused**: Shows raw numeric value for easy editing
- **While Blurred**: Shows fully formatted value
- **Automatically**: Enforces min/max constraints on input
- **Keyboard**: Adapts keyboard type based on format (numeric, decimal-pad, number-pad)

### Basic Usage

```typescript
import { NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function BasicNumericInput() {
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <NumericInput
      value={amount}
      onChange={setAmount}
      format="currency"
      placeholder="$0.00"
    />
  );
}
```

### Advanced Usage

#### Currency with Different Locales

```typescript
import { NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function CurrencyExamples() {
  const [usd, setUsd] = useState<number | null>(1234.56);
  const [eur, setEur] = useState<number | null>(1234.56);
  const [jpy, setJpy] = useState<number | null>(1234);

  return (
    <>
      {/* USD - United States Dollar */}
      <NumericInput
        value={usd}
        onChange={setUsd}
        format="currency"
        currency="USD"
        locale="en-US"
        placeholder="$0.00"
      />

      {/* EUR - Euro */}
      <NumericInput
        value={eur}
        onChange={setEur}
        format="currency"
        currency="EUR"
        locale="de-DE"
        placeholder="€0,00"
      />

      {/* JPY - Japanese Yen (no decimals) */}
      <NumericInput
        value={jpy}
        onChange={setJpy}
        format="currency"
        currency="JPY"
        locale="ja-JP"
        precision={0}
        placeholder="¥0"
      />
    </>
  );
}
```

#### Percentage Input

```typescript
import { NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function PercentageInput() {
  const [discount, setDiscount] = useState<number | null>(15);

  return (
    <NumericInput
      value={discount}
      onChange={setDiscount}
      format="percentage"
      precision={1}
      min={0}
      max={100}
      placeholder="0.0%"
    />
  );
}
```

#### Integer Only (Quantity)

```typescript
import { NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function QuantityInput() {
  const [quantity, setQuantity] = useState<number | null>(1);

  return (
    <NumericInput
      value={quantity}
      onChange={setQuantity}
      format="integer"
      min={1}
      max={999}
      placeholder="Enter quantity"
    />
  );
}
```

#### Decimal with Custom Precision

```typescript
import { NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function PrecisionInput() {
  const [weight, setWeight] = useState<number | null>(null);

  return (
    <NumericInput
      value={weight}
      onChange={setWeight}
      format="decimal"
      precision={4}
      placeholder="0.0000"
    />
  );
}
```

#### Constrained Range

```typescript
import { NumericInput, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function RangeInput() {
  const [value, setValue] = useState<number | null>(50);

  return (
    <View>
      <NumericInput
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        placeholder="0-100"
      />
      <Typography>Value: {value ?? "null"}</Typography>
    </View>
  );
}
```

#### No Negative Values

```typescript
import { NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function PositiveOnly() {
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <NumericInput
      value={amount}
      onChange={setAmount}
      format="currency"
      allowNegative={false}
      min={0}
      placeholder="$0.00"
    />
  );
}
```

### Common Patterns

#### Price Calculator

```typescript
import { NumericInput, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function PriceCalculator() {
  const [price, setPrice] = useState<number | null>(99.99);
  const [quantity, setQuantity] = useState<number | null>(1);

  const total = (price ?? 0) * (quantity ?? 0);

  return (
    <View>
      <NumericInput
        value={price}
        onChange={setPrice}
        format="currency"
        placeholder="Price"
      />
      <NumericInput
        value={quantity}
        onChange={setQuantity}
        format="integer"
        min={1}
        placeholder="Quantity"
      />
      <Typography>Total: ${total.toFixed(2)}</Typography>
    </View>
  );
}
```

#### With Field Wrapper

```typescript
import { Field, NumericInput } from "@korsolutions/ui";
import { useState } from "react";

function FieldNumericInput() {
  const [salary, setSalary] = useState<number | null>(null);

  return (
    <Field.Root>
      <Field.Label>Expected Salary</Field.Label>
      <Field.Description>
        Enter your expected annual salary
      </Field.Description>
      <NumericInput
        value={salary}
        onChange={setSalary}
        format="currency"
        placeholder="$0.00"
      />
    </Field.Root>
  );
}
```

### Accessibility

- Inherits all accessibility features from Input
- Automatically sets appropriate keyboard type for format
- Announces numeric values correctly to screen readers
- Properly handles locale-specific number formatting

---

## PhoneInput

A phone number input component with an integrated country code selector. Formats phone numbers according to country-specific patterns and outputs values in E.164 format (e.g., `+12125551234`).

### When to Use

- Collecting phone numbers with international support
- Forms that need country-specific phone formatting
- When you need E.164 formatted phone values

**Do not use for**:

- Free-form text (use Input instead)
- Numeric values (use NumericInput instead)

### API

#### Props

```typescript
interface PhoneInputProps {
  // Value & Change (E.164 format)
  value?: string;
  onChange?: (e164Value: string) => void;

  // Country
  defaultCountry?: string; // ISO 3166-1 alpha-2 code, default: "US"
  countries?: CountryData[]; // Override built-in country list

  // Display
  placeholder?: string;

  // States
  isDisabled?: boolean;

  // Styling
  variant?: "default";
  style?: StyleProp<ViewStyle>;
}
```

#### CountryData

```typescript
interface CountryData {
  code: string;      // ISO 3166-1 alpha-2 code, e.g. "US"
  name: string;      // Display name, e.g. "United States"
  dialCode: string;  // Dial code without plus, e.g. "1"
  flag: string;      // Flag emoji, e.g. "🇺🇸"
  format: string;    // Format pattern, e.g. "(###) ###-####"
  priority: number;  // Priority for dial code conflicts
}
```

#### States

- **default**: Normal, unfocused state
- **focused**: When the text input has focus
- **disabled**: When `isDisabled={true}`

#### Visual Structure

The component renders as a single input-like row:

```
┌──────────────────────────────────┐
│ 🇺🇸 +1  │  (212) 555-1234        │
└──────────────────────────────────┘
  ↑ Country    ↑ Formatted phone
    button       number input
```

Tapping the country button opens a searchable dropdown picker.

### Basic Usage

```typescript
import { PhoneInput } from "@korsolutions/ui";
import { useState } from "react";

function BasicPhoneInput() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      placeholder="Phone number"
    />
  );
}
```

### Advanced Usage

#### With Default Country

```typescript
import { PhoneInput } from "@korsolutions/ui";
import { useState } from "react";

function GermanPhoneInput() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      defaultCountry="DE"
      placeholder="Telefonnummer"
    />
  );
}
```

#### Pre-filled Value

```typescript
import { PhoneInput } from "@korsolutions/ui";
import { useState } from "react";

function PrefilledPhoneInput() {
  const [phone, setPhone] = useState("+442071234567");

  return (
    <PhoneInput
      value={phone}
      onChange={setPhone}
      placeholder="Phone number"
    />
  );
  // Automatically detects UK (+44) and formats as "2071 234567"
}
```

#### Disabled State

```typescript
<PhoneInput
  value="+12125551234"
  isDisabled
  placeholder="Phone number"
/>
```

#### With Field Component

```typescript
import { Field, PhoneInput } from "@korsolutions/ui";
import { useState } from "react";

function PhoneField() {
  const [phone, setPhone] = useState("");

  return (
    <Field.Root>
      <Field.Label>Phone Number</Field.Label>
      <Field.Description>
        We'll use this to verify your account
      </Field.Description>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        placeholder="Phone number"
      />
    </Field.Root>
  );
}
```

### Common Patterns

#### Contact Form with Phone

```typescript
import { Field, Input, PhoneInput, Button } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={{ gap: 16 }}>
      <Field.Root>
        <Field.Label>Full Name</Field.Label>
        <Input value={name} onChange={setName} placeholder="John Doe" />
      </Field.Root>

      <Field.Root>
        <Field.Label>Phone Number</Field.Label>
        <PhoneInput
          value={phone}
          onChange={setPhone}
          placeholder="Phone number"
        />
      </Field.Root>

      <Button onPress={() => console.log({ name, phone })}>
        Submit
      </Button>
    </View>
  );
}
```

#### Display E.164 Value

```typescript
import { PhoneInput, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function PhoneWithValue() {
  const [phone, setPhone] = useState("");

  return (
    <View style={{ gap: 8 }}>
      <PhoneInput
        value={phone}
        onChange={setPhone}
        placeholder="Phone number"
      />
      <Typography variant="body-sm">
        E.164: {phone || "empty"}
      </Typography>
    </View>
  );
}
```

### Accessibility

- Uses native TextInput with `keyboardType="phone-pad"`
- Country picker is keyboard navigable with search
- Disabled state properly announced to screen readers
- Country button is accessible as a pressable element

---

## Textarea

A multi-line text input component for longer text content. Extends the Input component functionality with multiline support.

### When to Use

- Long-form text input (comments, descriptions, messages)
- Multi-paragraph content
- Any text that needs more than one line

**Do not use for**:

- Single-line inputs (use Input instead)
- Numeric values (use NumericInput instead)

### API

#### Props

```typescript
interface TextareaProps extends Omit<TextInputProps, "onChange"> {
  // Styling
  variant?: "default" | "secondary";
  style?: StyleProp<ViewStyle>;

  // Value & Change
  value?: string;
  onChange?: (text: string) => void;
  defaultValue?: string;

  // States
  isDisabled?: boolean;
  readOnly?: boolean;

  // Display
  placeholder?: string;
  placeholderTextColor?: string;
  numberOfLines?: number;

  // Behavior
  autoFocus?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  maxLength?: number;

  // Events
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;

  // Custom Rendering
  render?: (props: TextareaProps) => React.ReactNode;
}
```

#### States

- **default**: Normal, unfocused state
- **focused**: When the textarea has focus
- **disabled**: When `isDisabled={true}`

### Basic Usage

```typescript
import { Textarea } from "@korsolutions/ui";
import { useState } from "react";

function BasicTextarea() {
  const [message, setMessage] = useState("");

  return (
    <Textarea
      value={message}
      onChange={setMessage}
      placeholder="Enter your message..."
    />
  );
}
```

### Advanced Usage

#### With Character Limit

```typescript
import { Textarea, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function LimitedTextarea() {
  const [text, setText] = useState("");
  const maxLength = 500;

  return (
    <View>
      <Textarea
        value={text}
        onChange={setText}
        placeholder="Enter your comment..."
        maxLength={maxLength}
      />
      <Typography variant="body-sm">
        {text.length}/{maxLength} characters
      </Typography>
    </View>
  );
}
```

#### With Field Component

```typescript
import { Field, Textarea } from "@korsolutions/ui";
import { useState } from "react";

function FieldTextarea() {
  const [bio, setBio] = useState("");

  return (
    <Field.Root>
      <Field.Label>Biography</Field.Label>
      <Field.Description>
        Tell us about yourself. Maximum 500 characters.
      </Field.Description>
      <Textarea
        value={bio}
        onChange={setBio}
        placeholder="Tell us about yourself..."
        maxLength={500}
      />
    </Field.Root>
  );
}
```

#### Auto-Growing Textarea

```typescript
import { Textarea } from "@korsolutions/ui";
import { useState } from "react";

function AutoGrowTextarea() {
  const [text, setText] = useState("");

  return (
    <Textarea
      value={text}
      onChange={setText}
      placeholder="Enter message..."
      style={{ minHeight: 100, maxHeight: 300 }}
    />
  );
}
```

#### Disabled State

```typescript
import { Textarea } from "@korsolutions/ui";

function DisabledTextarea() {
  return (
    <Textarea
      value="This content cannot be edited"
      isDisabled
      placeholder="Disabled textarea"
    />
  );
}
```

### Common Patterns

#### Comment Form

```typescript
import { Button, Textarea } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function CommentForm() {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    setIsSubmitting(true);
    // Submit comment
    await submitComment(comment);
    setIsSubmitting(false);
    setComment("");
  };

  return (
    <View style={{ gap: 12 }}>
      <Textarea
        value={comment}
        onChange={setComment}
        placeholder="Write a comment..."
        isDisabled={isSubmitting}
      />
      <Button
        onPress={handleSubmit}
        isDisabled={!comment.trim() || isSubmitting}
        isLoading={isSubmitting}
      >
        Post Comment
      </Button>
    </View>
  );
}
```

#### Multi-Field Form

```typescript
import { Field, Input, Textarea, Button } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <View style={{ gap: 16 }}>
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Input
          value={name}
          onChange={setName}
          placeholder="Your name"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input
          value={email}
          onChange={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
        />
      </Field.Root>

      <Field.Root>
        <Field.Label>Feedback</Field.Label>
        <Textarea
          value={feedback}
          onChange={setFeedback}
          placeholder="Tell us what you think..."
        />
      </Field.Root>

      <Button onPress={() => {}}>
        Submit
      </Button>
    </View>
  );
}
```

### Accessibility

- Inherits all accessibility features from Input
- Supports multi-line content for screen readers
- Properly announces text area role
- When used with Field, connects to labels automatically

---

## Checkbox

A compound component for creating checkbox inputs with optional title and description. Supports hover states and multiple variants.

### When to Use

- Boolean choices (agree/disagree, enable/disable)
- Multiple selections from a list
- Toggle settings on/off
- Form consent fields

**Do not use for**:

- Single choice from multiple options (use Radio instead)
- Simple on/off toggles without labels (consider Switch)

### Sub-Components

- **Checkbox.Root** - Container and state manager
- **Checkbox.Indicator** - Visual checkbox box with checkmark
- **Checkbox.Content** - Wrapper for title and description
- **Checkbox.Title** - Main label text
- **Checkbox.Description** - Helper/description text

### API

#### Checkbox.Root

```typescript
interface CheckboxRootProps extends Omit<PressableProps, "children"> {
  // Required
  children: React.ReactNode;
  value: boolean;
  onChange: (value: boolean) => void;

  // Styling
  variant?: "default" | "outlined";
  style?: StyleProp<ViewStyle>;

  // State
  isDisabled?: boolean;
}
```

#### Checkbox.Indicator

```typescript
interface CheckboxIndicatorProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}
```

Automatically displays checkmark when `value={true}` on Root.

#### Checkbox.Content

```typescript
interface CheckboxContentProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

Container for Title and Description. Provides consistent spacing.

#### Checkbox.Title

```typescript
interface CheckboxTitleProps extends TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}
```

#### Checkbox.Description

```typescript
interface CheckboxDescriptionProps extends TextProps {
  children: string;
  style?: StyleProp<TextStyle>;
}
```

#### States

The Checkbox manages these internal states:

- **default**: Unchecked, normal state
- **checked**: When `value={true}`
- **hovered**: On pointer hover (web)
- **disabled**: When `isDisabled={true}`

### Basic Usage

```typescript
import { Checkbox } from "@korsolutions/ui";
import { useState } from "react";

function BasicCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Root value={checked} onChange={setChecked}>
      <Checkbox.Indicator />
    </Checkbox.Root>
  );
}
```

### Advanced Usage

#### With Title

```typescript
import { Checkbox } from "@korsolutions/ui";
import { useState } from "react";

function CheckboxWithTitle() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox.Root value={accepted} onChange={setAccepted}>
      <Checkbox.Indicator />
      <Checkbox.Title>Accept terms and conditions</Checkbox.Title>
    </Checkbox.Root>
  );
}
```

#### With Title and Description

```typescript
import { Checkbox } from "@korsolutions/ui";
import { useState } from "react";

function CheckboxWithDescription() {
  const [notifications, setNotifications] = useState(true);

  return (
    <Checkbox.Root value={notifications} onChange={setNotifications}>
      <Checkbox.Indicator />
      <Checkbox.Content>
        <Checkbox.Title>Enable notifications</Checkbox.Title>
        <Checkbox.Description>
          Receive updates and alerts about your account activity
        </Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}
```

#### Outlined Variant

```typescript
import { Checkbox } from "@korsolutions/ui";
import { useState } from "react";

function OutlinedCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox.Root value={checked} onChange={setChecked} variant="outlined">
      <Checkbox.Indicator />
      <Checkbox.Content>
        <Checkbox.Title>Subscribe to newsletter</Checkbox.Title>
        <Checkbox.Description>
          Get the latest news and updates delivered to your inbox
        </Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}
```

#### Disabled State

```typescript
import { Checkbox } from "@korsolutions/ui";
import { useState } from "react";

function DisabledCheckbox() {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox.Root value={checked} onChange={setChecked} isDisabled>
      <Checkbox.Indicator />
      <Checkbox.Content>
        <Checkbox.Title>This option is disabled</Checkbox.Title>
        <Checkbox.Description>
          You cannot change this setting
        </Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}
```

### Common Patterns

#### Checkbox List

```typescript
import { Checkbox, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function CheckboxList() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const options = [
    { id: "email", title: "Email notifications", description: "Receive email updates" },
    { id: "push", title: "Push notifications", description: "Receive mobile alerts" },
    { id: "sms", title: "SMS notifications", description: "Receive text messages" },
  ];

  const toggle = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
  };

  return (
    <View style={{ gap: 16 }}>
      <Typography variant="heading-lg">Notification Preferences</Typography>
      {options.map((option) => (
        <Checkbox.Root
          key={option.id}
          value={selected.has(option.id)}
          onChange={() => toggle(option.id)}
        >
          <Checkbox.Indicator />
          <Checkbox.Content>
            <Checkbox.Title>{option.title}</Checkbox.Title>
            <Checkbox.Description>{option.description}</Checkbox.Description>
          </Checkbox.Content>
        </Checkbox.Root>
      ))}
    </View>
  );
}
```

#### Select All Pattern

```typescript
import { Checkbox, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function SelectAll() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = selected.size === items.length;
  const someSelected = selected.size > 0 && selected.size < items.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items));
    }
  };

  const toggle = (item: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(item)) {
      newSelected.delete(item);
    } else {
      newSelected.add(item);
    }
    setSelected(newSelected);
  };

  return (
    <View style={{ gap: 12 }}>
      <Checkbox.Root value={allSelected} onChange={toggleAll}>
        <Checkbox.Indicator />
        <Checkbox.Title>
          Select All {someSelected && `(${selected.size}/${items.length})`}
        </Checkbox.Title>
      </Checkbox.Root>

      <View style={{ paddingLeft: 24, gap: 8 }}>
        {items.map((item) => (
          <Checkbox.Root
            key={item}
            value={selected.has(item)}
            onChange={() => toggle(item)}
          >
            <Checkbox.Indicator />
            <Checkbox.Title>{item}</Checkbox.Title>
          </Checkbox.Root>
        ))}
      </View>
    </View>
  );
}
```

#### With Form Field

```typescript
import { Field, Checkbox } from "@korsolutions/ui";
import { useState } from "react";

function CheckboxField() {
  const [agreed, setAgreed] = useState(false);

  return (
    <Field.Root>
      <Checkbox.Root value={agreed} onChange={setAgreed}>
        <Checkbox.Indicator />
        <Checkbox.Content>
          <Checkbox.Title>I agree to the terms</Checkbox.Title>
          <Checkbox.Description>
            By checking this box, you agree to our Terms of Service and Privacy Policy
          </Checkbox.Description>
        </Checkbox.Content>
      </Checkbox.Root>
      {!agreed && (
        <Field.Error>You must accept the terms to continue</Field.Error>
      )}
    </Field.Root>
  );
}
```

### Accessibility

- Uses Pressable for full touch/click support
- Supports hover states on web
- Checkmark announced to screen readers when checked
- Properly handles disabled state for assistive technologies
- Full keyboard navigation support

---

## Select

A compound component for creating dropdown select menus with a portal overlay. Integrates with the List component for rendering options.

### When to Use

- Selecting a single option from a list
- Dropdown menus with many options
- Filterable/searchable selects (combobox pattern)
- When you need a native-like select experience

**Do not use for**:

- Multiple selections (use Checkbox list instead)
- Very few options (2-3, consider Radio buttons)
- Navigation menus (use Menu component)

### Sub-Components

- **Select.Root** - Container and state manager
- **Select.Trigger** - Button that opens the select
- **Select.Portal** - Portal for overlay rendering
- **Select.Overlay** - Background overlay (closes on click)
- **Select.Content** - Container for options list
- **Select.Option** - Individual selectable option

### API

#### Select.Root

```typescript
interface SelectRootProps {
  // Value & Change
  value?: string;
  onChange?: (value: string) => void;

  // Styling
  variant?: "default";
  style?: StyleProp<ViewStyle>;

  // State
  isDisabled?: boolean;

  // Content
  children?: React.ReactNode;

  // Custom Rendering
  render?: (props: SelectRootInjectedProps) => React.ReactElement;
}
```

#### Select.Trigger

```typescript
interface SelectTriggerProps {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}
```

Displays selected option label or placeholder. Automatically measures position for Content positioning.

#### Select.Portal

```typescript
interface SelectPortalProps {
  children: React.ReactNode;
}
```

Renders children in a portal overlay. Required for proper z-index layering.

#### Select.Overlay

```typescript
interface SelectOverlayProps {
  style?: StyleProp<ViewStyle>;
}
```

Background overlay. Clicking closes the select.

#### Select.Content

```typescript
interface SelectContentProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
```

Container for options. Positions itself relative to Trigger.

#### Select.Option

```typescript
interface SelectOptionProps {
  value: string;
  children?: React.ReactNode;
}
```

Individual option. Automatically registers with Root for value display. Closes select when clicked.

#### States

- **default**: Normal, closed state
- **disabled**: When `isDisabled={true}`
- **open**: When dropdown is open (internal)

#### Option States

- **default**: Normal option state
- **hovered**: On pointer hover (web)
- **selected**: When option value matches Select value
- **disabled**: Inherited from Select.Root

### Basic Usage

```typescript
import { Select, List } from "@korsolutions/ui";
import { useState } from "react";

function BasicSelect() {
  const [value, setValue] = useState<string>();

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option value={item.value}>
                {item.label}
              </Select.Option>
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

### Advanced Usage

#### Custom Option Rendering

```typescript
import { Select, List, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function CustomOptionSelect() {
  const [value, setValue] = useState<string>();

  const options = [
    { value: "apple", label: "Apple", icon: "🍎", description: "A sweet red fruit" },
    { value: "banana", label: "Banana", icon: "🍌", description: "A long yellow fruit" },
    { value: "cherry", label: "Cherry", icon: "🍒", description: "A small red fruit" },
  ];

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select a fruit" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <List
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option value={item.value}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Typography>{item.icon}</Typography>
                  <View>
                    <Typography variant="heading-md">{item.label}</Typography>
                    <Typography variant="body-sm">{item.description}</Typography>
                  </View>
                </View>
              </Select.Option>
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

#### Combobox (Searchable Select)

```typescript
import { Select, List, Input } from "@korsolutions/ui";
import { useState } from "react";

function ComboboxSelect() {
  const [value, setValue] = useState<string>();
  const [search, setSearch] = useState("");

  const allOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
  ];

  const filteredOptions = allOptions.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Search fruits..." />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          <Input
            variant="secondary"
            value={search}
            onChange={setSearch}
            placeholder="Type to filter..."
            autoFocus
            style={{ marginBottom: 8 }}
          />
          <List
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Select.Option value={item.value}>
                {item.label}
              </Select.Option>
            )}
          />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

#### Disabled State

```typescript
import { Select } from "@korsolutions/ui";

function DisabledSelect() {
  return (
    <Select.Root isDisabled>
      <Select.Trigger placeholder="Select an option" />
    </Select.Root>
  );
}
```

#### With Form Field

```typescript
import { Field, Select, List } from "@korsolutions/ui";
import { useState } from "react";

function SelectField() {
  const [country, setCountry] = useState<string>();

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  return (
    <Field.Root>
      <Field.Label>Country</Field.Label>
      <Field.Description>
        Select your country of residence
      </Field.Description>
      <Select.Root value={country} onChange={setCountry}>
        <Select.Trigger placeholder="Select country" />
        <Select.Portal>
          <Select.Overlay />
          <Select.Content>
            <List
              data={countries}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Select.Option value={item.value}>
                  {item.label}
                </Select.Option>
              )}
            />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}
```

### Common Patterns

#### Grouped Options

```typescript
import { Select, List, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function GroupedSelect() {
  const [value, setValue] = useState<string>();

  const groups = [
    {
      title: "Fruits",
      options: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
      ],
    },
    {
      title: "Vegetables",
      options: [
        { value: "carrot", label: "Carrot" },
        { value: "broccoli", label: "Broccoli" },
      ],
    },
  ];

  return (
    <Select.Root value={value} onChange={setValue}>
      <Select.Trigger placeholder="Select food" />
      <Select.Portal>
        <Select.Overlay />
        <Select.Content>
          {groups.map((group) => (
            <View key={group.title}>
              <Typography variant="heading-sm" style={{ padding: 8 }}>
                {group.title}
              </Typography>
              <List
                data={group.options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Select.Option value={item.value}>
                    {item.label}
                  </Select.Option>
                )}
              />
            </View>
          ))}
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
```

#### Dependent Selects

```typescript
import { Select, List } from "@korsolutions/ui";
import { useState, useEffect } from "react";
import { View } from "react-native";

function DependentSelects() {
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ];

  const cities = {
    us: [
      { value: "ny", label: "New York" },
      { value: "la", label: "Los Angeles" },
    ],
    uk: [
      { value: "london", label: "London" },
      { value: "manchester", label: "Manchester" },
    ],
  };

  // Reset city when country changes
  useEffect(() => {
    setCity(undefined);
  }, [country]);

  return (
    <View style={{ gap: 16 }}>
      <Select.Root value={country} onChange={setCountry}>
        <Select.Trigger placeholder="Select country" />
        <Select.Portal>
          <Select.Overlay />
          <Select.Content>
            <List
              data={countries}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Select.Option value={item.value}>
                  {item.label}
                </Select.Option>
              )}
            />
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Select.Root
        value={city}
        onChange={setCity}
        isDisabled={!country}
      >
        <Select.Trigger placeholder="Select city" />
        <Select.Portal>
          <Select.Overlay />
          <Select.Content>
            <List
              data={country ? cities[country as keyof typeof cities] : []}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Select.Option value={item.value}>
                  {item.label}
                </Select.Option>
              )}
            />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </View>
  );
}
```

### Accessibility

- Trigger acts as button with proper ARIA attributes
- Options are keyboard navigable
- Screen readers announce selected value
- Supports Escape key to close
- Overlay click closes dropdown
- Properly manages focus when opening/closing

---

## Field

A compound component for wrapping form inputs with labels, descriptions, and error messages. Provides consistent field structure and accessibility.

### When to Use

- Any form input that needs a label
- Inputs requiring helper text or descriptions
- Form validation with error messages
- Creating accessible form layouts

**Always use for**:

- Labeled inputs in forms
- Accessibility compliance
- Consistent form field styling

### Sub-Components

- **Field.Root** - Container and context provider
- **Field.Label** - Label text (connects to input via `for`)
- **Field.Description** - Helper/description text
- **Field.Error** - Error message text

### API

#### Field.Root

```typescript
interface FieldRootProps {
  // Styling
  variant?: "default";
  style?: StyleProp<ViewStyle>;

  // Content
  children?: React.ReactNode;

  // Custom Rendering
  render?: (props: FieldRootProps) => React.ReactNode;
}
```

Generates unique ID for connecting label to input.

#### Field.Label

```typescript
interface FieldLabelProps {
  // Required
  children: string;

  // Styling
  style?: StyleProp<TextStyle>;

  // Connection
  for?: string; // Auto-generated from Root context if not provided

  // Custom Rendering
  render?: (props: FieldLabelProps) => React.ReactNode;
}
```

#### Field.Description

```typescript
interface FieldDescriptionProps {
  children: string;
  style?: StyleProp<TextStyle>;
}
```

#### Field.Error

```typescript
interface FieldErrorProps {
  children: string;
  style?: StyleProp<TextStyle>;
}
```

### Basic Usage

```typescript
import { Field, Input } from "@korsolutions/ui";
import { useState } from "react";

function BasicField() {
  const [value, setValue] = useState("");

  return (
    <Field.Root>
      <Field.Label>Username</Field.Label>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Enter username"
      />
    </Field.Root>
  );
}
```

### Advanced Usage

#### With Description

```typescript
import { Field, Input } from "@korsolutions/ui";
import { useState } from "react";

function FieldWithDescription() {
  const [username, setUsername] = useState("");

  return (
    <Field.Root>
      <Field.Label>Username</Field.Label>
      <Field.Description>
        Choose a unique username for your account. Must be 3-20 characters.
      </Field.Description>
      <Input
        value={username}
        onChange={setUsername}
        placeholder="Enter username"
        maxLength={20}
      />
    </Field.Root>
  );
}
```

#### With Validation Error

```typescript
import { Field, Input } from "@korsolutions/ui";
import { useState } from "react";

function FieldWithValidation() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (text: string) => {
    setEmail(text);
    if (text && !text.includes("@")) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  return (
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Field.Description>
        We'll never share your email with anyone else.
      </Field.Description>
      <Input
        value={email}
        onChange={validateEmail}
        placeholder="your@email.com"
        keyboardType="email-address"
      />
      {error && <Field.Error>{error}</Field.Error>}
    </Field.Root>
  );
}
```

#### With Textarea

```typescript
import { Field, Textarea } from "@korsolutions/ui";
import { useState } from "react";

function TextareaField() {
  const [bio, setBio] = useState("");

  return (
    <Field.Root>
      <Field.Label>Biography</Field.Label>
      <Field.Description>
        Tell us about yourself. Maximum 500 characters.
      </Field.Description>
      <Textarea
        value={bio}
        onChange={setBio}
        placeholder="Tell us about yourself..."
        maxLength={500}
      />
    </Field.Root>
  );
}
```

#### With Select

```typescript
import { Field, Select, List } from "@korsolutions/ui";
import { useState } from "react";

function SelectField() {
  const [country, setCountry] = useState<string>();

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  return (
    <Field.Root>
      <Field.Label>Country</Field.Label>
      <Field.Description>
        Select your country of residence
      </Field.Description>
      <Select.Root value={country} onChange={setCountry}>
        <Select.Trigger placeholder="Select country" />
        <Select.Portal>
          <Select.Overlay />
          <Select.Content>
            <List
              data={countries}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Select.Option value={item.value}>
                  {item.label}
                </Select.Option>
              )}
            />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}
```

### Common Patterns

#### Complete Form

```typescript
import { Field, Input, Textarea, Select, Button, List } from "@korsolutions/ui";
import { useState } from "react";
import { View, ScrollView } from "react-native";

function CompleteForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<string>();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!country) {
      newErrors.country = "Please select a country";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit form
      console.log({ name, email, country, message });
    }
  };

  return (
    <ScrollView>
      <View style={{ gap: 20, padding: 16 }}>
        <Field.Root>
          <Field.Label>Full Name</Field.Label>
          <Field.Description>
            Enter your first and last name
          </Field.Description>
          <Input
            value={name}
            onChange={setName}
            placeholder="John Doe"
          />
          {errors.name && <Field.Error>{errors.name}</Field.Error>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Email Address</Field.Label>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Field.Error>{errors.email}</Field.Error>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Country</Field.Label>
          <Select.Root value={country} onChange={setCountry}>
            <Select.Trigger placeholder="Select country" />
            <Select.Portal>
              <Select.Overlay />
              <Select.Content>
                <List
                  data={countries}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <Select.Option value={item.value}>
                      {item.label}
                    </Select.Option>
                  )}
                />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          {errors.country && <Field.Error>{errors.country}</Field.Error>}
        </Field.Root>

        <Field.Root>
          <Field.Label>Message (Optional)</Field.Label>
          <Textarea
            value={message}
            onChange={setMessage}
            placeholder="Tell us more..."
          />
        </Field.Root>

        <Button onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </ScrollView>
  );
}
```

#### Required Field Indicator

```typescript
import { Field, Input, Typography } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function RequiredField() {
  const [value, setValue] = useState("");

  return (
    <Field.Root>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <Field.Label>Email Address</Field.Label>
        <Typography style={{ color: "red" }}>*</Typography>
      </View>
      <Input
        value={value}
        onChange={setValue}
        placeholder="your@email.com"
      />
    </Field.Root>
  );
}
```

#### Inline Label and Input

```typescript
import { Field, Input } from "@korsolutions/ui";
import { useState } from "react";
import { View } from "react-native";

function InlineField() {
  const [value, setValue] = useState("");

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Field.Label>Name:</Field.Label>
      <View style={{ flex: 1 }}>
        <Input
          value={value}
          onChange={setValue}
          placeholder="Enter name"
        />
      </View>
    </View>
  );
}
```

### Accessibility

- Automatically generates unique IDs for label-input connection
- Label properly associates with input via `for` attribute
- Screen readers announce label when focusing input
- Error messages are semantically marked
- Descriptions provide helpful context for assistive technologies
- Full keyboard navigation support

---

## Best Practices

### General Guidelines

1. **Always use Field for labeled inputs**

   ```typescript
   // Good
   <Field.Root>
     <Field.Label>Username</Field.Label>
     <Input />
   </Field.Root>

   // Avoid
   <Input placeholder="Username" />  // No accessible label
   ```

2. **Provide helpful descriptions**

   ```typescript
   <Field.Root>
     <Field.Label>Password</Field.Label>
     <Field.Description>
       Must be at least 8 characters with one uppercase letter
     </Field.Description>
     <Input secureTextEntry />
   </Field.Root>
   ```

3. **Show validation errors clearly**

   ```typescript
   <Field.Root>
     <Field.Label>Email</Field.Label>
     <Input value={email} onChange={setEmail} />
     {error && <Field.Error>{error}</Field.Error>}
   </Field.Root>
   ```

4. **Use appropriate input types**
   - Text → Input
   - Numbers with formatting → NumericInput
   - Phone numbers → PhoneInput
   - Multi-line → Textarea
   - Selection → Select
   - Boolean → Checkbox

5. **Disable during submission**
   ```typescript
   <Input isDisabled={isSubmitting} />
   <Button isLoading={isSubmitting}>
     Submit
   </Button>
   ```

### Performance Tips

1. **Debounce expensive operations**

   ```typescript
   import { useDebouncedCallback } from 'use-debounce';

   const debouncedSearch = useDebouncedCallback((value) => {
     performSearch(value);
   }, 300);

   <Input onChange={debouncedSearch} />
   ```

2. **Optimize large Select lists**
   - Use virtual scrolling with List component
   - Implement search/filter for many options
   - Consider pagination for 100+ items

3. **Memoize callback functions**
   ```typescript
   const handleChange = useCallback((value: string) => {
     setValue(value);
   }, []);
   ```

### Common Pitfalls

1. **Don't use Input for numeric values**

   ```typescript
   // Bad
   <Input
     value={amount.toString()}
     onChange={(text) => setAmount(Number(text))}
     keyboardType="numeric"
   />

   // Good
   <NumericInput
     value={amount}
     onChange={setAmount}
     format="currency"
   />
   ```

2. **Don't forget onChange handler**

   ```typescript
   // Bad - won't update
   <Input value={value} />

   // Good
   <Input value={value} onChange={setValue} />
   ```

3. **Don't skip Field for accessibility**

   ```typescript
   // Bad - not accessible
   <View>
     <Text>Username</Text>
     <Input />
   </View>

   // Good - accessible
   <Field.Root>
     <Field.Label>Username</Field.Label>
     <Input />
   </Field.Root>
   ```

---

## Related Components

- **Button** - For form submission
- **Typography** - For additional text styling
- **Card** - For grouping form sections
- **List** - For rendering Select options
- **Menu** - For dropdown menus (not form inputs)

## Additional Resources

- [React Native TextInput](https://reactnative.dev/docs/textinput)
- [Expo Router](https://expo.github.io/router/docs/)
