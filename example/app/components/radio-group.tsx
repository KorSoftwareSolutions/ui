import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { RadioGroup } from "@korsolutions/ui";
import React from "react";

export default function RadioGroupComponentScreen() {
  return (
    <ComponentScreenLayout title="Radio Group">
      <UseCaseSection title="Default variant">
        <DefaultExample />
      </UseCaseSection>

      <UseCaseSection title="With title and description">
        <TitleDescriptionExample />
      </UseCaseSection>

      <UseCaseSection title="Outlined variant">
        <OutlinedExample />
      </UseCaseSection>

      <UseCaseSection title="Disabled group">
        <DisabledGroupExample />
      </UseCaseSection>

      <UseCaseSection title="Disabled item">
        <DisabledItemExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  const [value, setValue] = React.useState("a");

  return (
    <RadioGroup.Root value={value} onChange={setValue}>
      <RadioGroup.Item value="a">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Option A</RadioGroup.Title>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="b">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Option B</RadioGroup.Title>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="c">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Option C</RadioGroup.Title>
        </RadioGroup.Content>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}

function TitleDescriptionExample() {
  const [value, setValue] = React.useState("monthly");

  return (
    <RadioGroup.Root value={value} onChange={setValue}>
      <RadioGroup.Item value="monthly">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Monthly billing</RadioGroup.Title>
          <RadioGroup.Description>Pay month-to-month, cancel anytime</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="annual">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Annual billing</RadioGroup.Title>
          <RadioGroup.Description>Save 20% with a yearly subscription</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}

function OutlinedExample() {
  const [value, setValue] = React.useState("standard");

  return (
    <RadioGroup.Root value={value} onChange={setValue} variant="outlined">
      <RadioGroup.Item value="standard">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Standard shipping</RadioGroup.Title>
          <RadioGroup.Description>5–7 business days</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="express">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Express shipping</RadioGroup.Title>
          <RadioGroup.Description>2–3 business days</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="overnight">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Overnight shipping</RadioGroup.Title>
          <RadioGroup.Description>Next business day delivery</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}

function DisabledGroupExample() {
  const [value, setValue] = React.useState("b");

  return (
    <RadioGroup.Root value={value} onChange={setValue} isDisabled>
      <RadioGroup.Item value="a">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Option A</RadioGroup.Title>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="b">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Option B</RadioGroup.Title>
        </RadioGroup.Content>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}

function DisabledItemExample() {
  const [value, setValue] = React.useState("free");

  return (
    <RadioGroup.Root value={value} onChange={setValue}>
      <RadioGroup.Item value="free">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Free plan</RadioGroup.Title>
          <RadioGroup.Description>Up to 3 projects</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="pro">
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Pro plan</RadioGroup.Title>
          <RadioGroup.Description>Unlimited projects</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
      <RadioGroup.Item value="enterprise" isDisabled>
        <RadioGroup.Indicator />
        <RadioGroup.Content>
          <RadioGroup.Title>Enterprise plan</RadioGroup.Title>
          <RadioGroup.Description>Contact sales to enable</RadioGroup.Description>
        </RadioGroup.Content>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}
