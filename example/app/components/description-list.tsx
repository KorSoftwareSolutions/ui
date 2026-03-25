import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Badge, Button, Card, DescriptionList } from "@korsolutions/ui";
import React from "react";

export default function DescriptionListComponentScreen() {
  return (
    <ComponentScreenLayout title="Description List">
      <UseCaseSection title="Default">
        <DescriptionList.Root>
          <DescriptionList.Item>
            <DescriptionList.Term>Customer</DescriptionList.Term>
            <DescriptionList.Details>Michael Foster</DescriptionList.Details>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Email</DescriptionList.Term>
            <DescriptionList.Details>michael.foster@example.com</DescriptionList.Details>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Status</DescriptionList.Term>
            <DescriptionList.Details>Active</DescriptionList.Details>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Role</DescriptionList.Term>
            <DescriptionList.Details>Admin</DescriptionList.Details>
          </DescriptionList.Item>
        </DescriptionList.Root>
      </UseCaseSection>

      <UseCaseSection title="With Actions">
        <DescriptionList.Root>
          <DescriptionList.Item>
            <DescriptionList.Term>Full name</DescriptionList.Term>
            <DescriptionList.Details>Jane Smith</DescriptionList.Details>
            <DescriptionList.Actions>
              <Button variant="ghost" size="sm" onPress={() => {}}>
                Edit
              </Button>
            </DescriptionList.Actions>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Email</DescriptionList.Term>
            <DescriptionList.Details>jane@example.com</DescriptionList.Details>
            <DescriptionList.Actions>
              <Button variant="ghost" size="sm" onPress={() => {}}>
                Edit
              </Button>
            </DescriptionList.Actions>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Phone</DescriptionList.Term>
            <DescriptionList.Details>+1 (555) 123-4567</DescriptionList.Details>
            <DescriptionList.Actions>
              <Button variant="ghost" size="sm" onPress={() => {}}>
                Edit
              </Button>
            </DescriptionList.Actions>
          </DescriptionList.Item>
        </DescriptionList.Root>
      </UseCaseSection>

      <UseCaseSection title="Inside a Card">
        <Card.Root>
          <Card.Header>
            <Card.Title>Order Details</Card.Title>
          </Card.Header>
          <Card.Body>
            <DescriptionList.Root>
              <DescriptionList.Item>
                <DescriptionList.Term>Order number</DescriptionList.Term>
                <DescriptionList.Details>#12345</DescriptionList.Details>
              </DescriptionList.Item>
              <DescriptionList.Item>
                <DescriptionList.Term>Date</DescriptionList.Term>
                <DescriptionList.Details>March 25, 2026</DescriptionList.Details>
              </DescriptionList.Item>
              <DescriptionList.Item>
                <DescriptionList.Term>Amount</DescriptionList.Term>
                <DescriptionList.Details>$249.00</DescriptionList.Details>
              </DescriptionList.Item>
              <DescriptionList.Item>
                <DescriptionList.Term>Payment method</DescriptionList.Term>
                <DescriptionList.Details>Visa ending in 4242</DescriptionList.Details>
              </DescriptionList.Item>
            </DescriptionList.Root>
          </Card.Body>
        </Card.Root>
      </UseCaseSection>

      <UseCaseSection title="With Custom Content">
        <DescriptionList.Root>
          <DescriptionList.Item>
            <DescriptionList.Term>Name</DescriptionList.Term>
            <DescriptionList.Details>Jane Smith</DescriptionList.Details>
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Status</DescriptionList.Term>
            <DescriptionList.Details render={() => <Badge color="#10b981">Active</Badge>} />
          </DescriptionList.Item>
          <DescriptionList.Item>
            <DescriptionList.Term>Department</DescriptionList.Term>
            <DescriptionList.Details>Engineering</DescriptionList.Details>
          </DescriptionList.Item>
        </DescriptionList.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
