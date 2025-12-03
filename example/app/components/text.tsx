import React from "react";
import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Card, Link, Text } from "@korsolutions/ui/components";

export default function TextComponentScreen() {
  return (
    <ComponentScreenLayout title="Text">
      <UseCaseSection title="Default">
        <Card>
          <Text>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat
            massa quis enim.
          </Text>
        </Card>
      </UseCaseSection>
      <UseCaseSection title="With Link">
        <Card>
          <Text>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.{" "}
            <Link href="https://example.com">Press here to visit example.com.</Link>
          </Text>
        </Card>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
