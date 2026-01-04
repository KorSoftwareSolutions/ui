import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Checkbox } from "@korsolutions/ui/components";
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

      <UseCaseSection title="Outlined with description">
        <OutlinedDescriptionExample />
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <DisabledExample />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}

function DefaultExample() {
  const [checked, setChecked] = React.useState(false);

  return <Checkbox value={checked} onChange={setChecked} />;
}

function TitleOnlyExample() {
  const [checked, setChecked] = React.useState(false);

  return <Checkbox value={checked} onChange={setChecked} title="Accept terms and conditions" />;
}

function TitleDescriptionExample() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Checkbox
      value={checked}
      onChange={setChecked}
      title="Enable notifications"
      description="Receive email notifications about your account activity"
    />
  );
}

function OutlinedExample() {
  const [checked, setChecked] = React.useState(false);

  return <Checkbox value={checked} onChange={setChecked} title="Subscribe to newsletter" variant="outlined" />;
}

function OutlinedDescriptionExample() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      value={checked}
      onChange={setChecked}
      title="Marketing communications"
      description="I agree to receive marketing emails and promotional content"
      variant="outlined"
    />
  );
}

function DisabledExample() {
  const [checked, setChecked] = React.useState(true);

  return <Checkbox value={checked} onChange={setChecked} title="This option is disabled" description="You cannot change this setting" isDisabled />;
}
