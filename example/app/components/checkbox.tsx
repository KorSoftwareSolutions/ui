import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Checkbox } from "@korsolutions/ui";
import React from "react";

export default function CheckboxComponentScreen() {
  return (
    <ComponentScreenLayout title="Checkbox">
      <UseCaseSection title="Default variant">
        <DefaultExample />
      </UseCaseSection>

      <UseCaseSection title="With title only">
        <TitleOnlyExample />
      </UseCaseSection>

      <UseCaseSection title="With title and description">
        <TitleDescriptionExample />
      </UseCaseSection>

      <UseCaseSection title="Outlined variant">
        <OutlinedExample />
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <DisabledExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox.Root value={checked} onChange={setChecked}>
      <Checkbox.Indicator />
    </Checkbox.Root>
  );
}

function TitleOnlyExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox.Root value={checked} onChange={setChecked}>
      <Checkbox.Indicator />
      <Checkbox.Title>Accept terms and conditions</Checkbox.Title>
    </Checkbox.Root>
  );
}

function TitleDescriptionExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Checkbox.Root value={checked} onChange={setChecked}>
      <Checkbox.Indicator />
      <Checkbox.Content>
        <Checkbox.Title>Enable notifications</Checkbox.Title>
        <Checkbox.Description>Receive updates and alerts about your account activity</Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}

function OutlinedExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox.Root value={checked} onChange={setChecked} variant="outlined">
      <Checkbox.Indicator />
      <Checkbox.Content>
        <Checkbox.Title>Subscribe to newsletter</Checkbox.Title>
        <Checkbox.Description>Get the latest news and updates delivered to your inbox</Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}

function DisabledExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Checkbox.Root value={checked} onChange={setChecked} isDisabled>
      <Checkbox.Indicator />
      <Checkbox.Content>
        <Checkbox.Title>This option is disabled</Checkbox.Title>
        <Checkbox.Description>You cannot change this setting</Checkbox.Description>
      </Checkbox.Content>
    </Checkbox.Root>
  );
}
