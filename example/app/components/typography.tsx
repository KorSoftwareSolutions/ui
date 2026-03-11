import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Card, Link, Typography } from "@korsolutions/ui";
import React from "react";

export default function TextComponentScreen() {
  return (
    <ComponentScreenLayout title="Text">
      <UseCaseSection title="Default">
        <Card.Root>
          <Card.Body>
            <Typography variant="heading" size="lg">Heading lg</Typography>
            <Typography variant="heading">Heading md</Typography>
            <Typography variant="heading" size="sm">Heading sm</Typography>
            <Typography size="lg">Body lg</Typography>
            <Typography>Body md (default)</Typography>
            <Typography size="sm">Body sm</Typography>
          </Card.Body>
        </Card.Root>
      </UseCaseSection>
      <UseCaseSection title="With Link">
        <Card.Root>
          <Card.Body>
            <Typography>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
              dolor. Aenean massa.{" "}
              <Link href="https://example.com">Press here to visit example.com.</Link>
            </Typography>
          </Card.Body>
        </Card.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
