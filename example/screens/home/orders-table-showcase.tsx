import { Avatar, Badge, Card, Table, Typography } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";
import { ShowcaseBlock } from "./showcase-block";

const orders = [
  { id: "#3210", customer: "Olivia Martin", amount: "$42.00", status: "Paid" },
  { id: "#3209", customer: "Ava Johnson", amount: "$74.99", status: "Pending" },
  { id: "#3208", customer: "Michael Chen", amount: "$125.00", status: "Paid" },
  { id: "#3207", customer: "Lisa Anderson", amount: "$89.00", status: "Paid" },
];

export function OrdersTableShowcase() {
  return (
    <ShowcaseBlock title="Data Display">
      <Card.Header>
        <Card.Title>Recent Orders</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>
                <Typography size="sm" style={{ fontWeight: "600" }}>
                  Order
                </Typography>
              </Table.Head>
              <Table.Head>
                <Typography size="sm" style={{ fontWeight: "600" }}>
                  Customer
                </Typography>
              </Table.Head>
              <Table.Head>
                <Typography size="sm" style={{ fontWeight: "600" }}>
                  Amount
                </Typography>
              </Table.Head>
              <Table.Head>
                <Typography size="sm" style={{ fontWeight: "600" }}>
                  Status
                </Typography>
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell>
                  <Typography size="sm" style={{ fontWeight: "500" }}>
                    {order.id}
                  </Typography>
                </Table.Cell>
                <Table.Cell>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Avatar.Root>
                      <Avatar.Fallback>
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <Typography size="sm">{order.customer}</Typography>
                  </View>
                </Table.Cell>
                <Table.Cell>
                  <Typography size="sm">{order.amount}</Typography>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={order.status === "Paid" ? "#10b981" : "#f59e0b"}>
                    {order.status}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card.Body>
    </ShowcaseBlock>
  );
}
