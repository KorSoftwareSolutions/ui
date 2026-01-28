import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { DateInputDemo } from "@/components/date-input-demo";
import { UseCaseSection } from "@/components/use-case-section";
import { Input, NumericInput, Typography } from "@korsolutions/ui";
import React, { useState } from "react";

export default function InputComponentScreen() {
  const [inputValue, setInputValue] = useState<string>("");
  const [usdValue, setUsdValue] = useState<number | null>(null);
  const [eurValue, setEurValue] = useState<number | null>(1234.56);
  const [integerValue, setIntegerValue] = useState<number | null>(null);
  const [percentValue, setPercentValue] = useState<number | null>(null);
  const [decimalValue, setDecimalValue] = useState<number | null>(null);
  const [constrainedValue, setConstrainedValue] = useState<number | null>(50);

  return (
    <ComponentScreenLayout title="Input">
      <UseCaseSection title="Default">
        <Input value={inputValue} onChange={setInputValue} placeholder="Enter text" />
      </UseCaseSection>
      <UseCaseSection title="Disabled">
        <Input defaultValue="Sample text" isDisabled />
      </UseCaseSection>
      <UseCaseSection title="Currency (USD)">
        <NumericInput value={usdValue} onChange={setUsdValue} format="currency" placeholder="$0.00" precision={2} />
        <Typography variant="body-sm">Numeric value: {usdValue ?? "null"}</Typography>
      </UseCaseSection>

      <UseCaseSection title="Currency (EUR) with Initial Value">
        <NumericInput value={eurValue} onChange={setEurValue} format="currency" currency="EUR" locale="de-DE" placeholder="€0.00" />
        <Typography variant="body-sm">Numeric value: {eurValue ?? "null"}</Typography>
      </UseCaseSection>

      <UseCaseSection title="Integer Only">
        <NumericInput value={integerValue} onChange={setIntegerValue} format="integer" placeholder="Enter quantity" />
        <Typography variant="body-sm">Numeric value: {integerValue ?? "null"}</Typography>
      </UseCaseSection>

      <UseCaseSection title="Percentage">
        <NumericInput value={percentValue} onChange={setPercentValue} format="percentage" precision={1} placeholder="0.0%" />
        <Typography variant="body-sm">Numeric value: {percentValue ?? "null"}</Typography>
      </UseCaseSection>

      <UseCaseSection title="Decimal (4 digits)">
        <NumericInput value={decimalValue} onChange={setDecimalValue} format="decimal" precision={4} placeholder="0.0000" />
        <Typography variant="body-sm">Numeric value: {decimalValue ?? "null"}</Typography>
      </UseCaseSection>

      <UseCaseSection title="Constrained (Min: 0, Max: 100)">
        <NumericInput value={constrainedValue} onChange={setConstrainedValue} min={0} max={100} placeholder="$0.00" />
        <Typography variant="body-sm">Numeric value: {constrainedValue ?? "null"}</Typography>
      </UseCaseSection>

      <UseCaseSection title="Date Input (MM/DD/YYYY)">
        <DateInputDemo />
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
