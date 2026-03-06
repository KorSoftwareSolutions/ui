import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Table, Typography } from "@korsolutions/ui";
import React from "react";

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
];

export default function TableScreen() {
  return (
    <ComponentScreenLayout title="Table">
      <UseCaseSection title="Default">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>
                <Typography>Invoice</Typography>
              </Table.Head>
              <Table.Head>
                <Typography>Status</Typography>
              </Table.Head>
              <Table.Head>
                <Typography>Method</Typography>
              </Table.Head>
              <Table.Head>
                <Typography>Amount</Typography>
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoices.map((invoice) => (
              <Table.Row key={invoice.id}>
                <Table.Cell>
                  <Typography>{invoice.id}</Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography>{invoice.status}</Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography>{invoice.method}</Typography>
                </Table.Cell>
                <Table.Cell>
                  <Typography>{invoice.amount}</Typography>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </UseCaseSection>
    </ComponentScreenLayout>
  );
}
