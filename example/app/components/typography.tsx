import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Card, Typography } from "@korsolutions/ui";
import { Link } from "@korsolutions/ui/components";
import React from "react";

export default function TextComponentScreen() {
  return (
    <ComponentScreenLayout title="Text">
      <UseCaseSection title="Default">
        <Card.Root>
          <Card.Body>
            <Typography variant="body-lg">Body lg</Typography>
            <Typography variant="body-md">Body md</Typography>
            <Typography variant="body-sm">Body sm</Typography>
            <Typography variant="heading-lg">Heading lg</Typography>
            <Typography variant="heading-md">Heading md</Typography>
            <Typography variant="heading-sm">Heading sm</Typography>
          </Card.Body>
        </Card.Root>
      </UseCaseSection>
      <UseCaseSection title="With Link">
        <Card.Root>
          <Card.Body>
            <Typography>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.{" "}
              <Link href="https://example.com">Press here to visit example.com.</Link>
            </Typography>
          </Card.Body>
        </Card.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
