import { Avatar, Badge, Card, Separator, Typography, useTheme } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";
import { ShowcaseBlock } from "./showcase-block";

const members = [
  { name: "Sarah Wilson", email: "sarah@example.com", role: "Admin" },
  { name: "James Miller", email: "james@example.com", role: "Member" },
  { name: "Emily Davis", email: "emily@example.com", role: "Member" },
];

export function TeamMembersShowcase() {
  const theme = useTheme();

  return (
    <ShowcaseBlock title="Team Management">
      <Card.Header>
        <Card.Title>Team Members</Card.Title>
      </Card.Header>
      <Card.Body>
        <View style={{ gap: 12 }}>
          {members.map((member, i) => (
            <React.Fragment key={member.email}>
              {i > 0 && <Separator />}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Avatar.Root>
                  <Avatar.Fallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar.Fallback>
                </Avatar.Root>
                <View style={{ flex: 1 }}>
                  <Typography variant="body-sm" style={{ fontWeight: "500" }}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body-sm"
                    style={{ color: theme.colors.mutedForeground }}
                  >
                    {member.email}
                  </Typography>
                </View>
                <Badge variant="secondary">{member.role}</Badge>
              </View>
            </React.Fragment>
          ))}
        </View>
      </Card.Body>
    </ShowcaseBlock>
  );
}
