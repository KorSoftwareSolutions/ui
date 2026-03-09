import { Card, Progress, Typography, useTheme } from "@korsolutions/ui";
import React from "react";
import { View } from "react-native";
import { ShowcaseBlock } from "./showcase-block";

export function StatsShowcase() {
  const theme = useTheme();

  return (
    <ShowcaseBlock title="Progress & Metrics">
      <Card.Header>
        <Card.Title>Project Overview</Card.Title>
      </Card.Header>
      <Card.Body>
        <View style={{ gap: 20 }}>
          <View style={{ gap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body-sm" style={{ fontWeight: "500" }}>
                Design System
              </Typography>
              <Typography
                variant="body-sm"
                style={{ color: theme.colors.mutedForeground }}
              >
                85%
              </Typography>
            </View>
            <Progress.Root value={85}>
              <Progress.Indicator />
            </Progress.Root>
          </View>
          <View style={{ gap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body-sm" style={{ fontWeight: "500" }}>
                API Integration
              </Typography>
              <Typography
                variant="body-sm"
                style={{ color: theme.colors.mutedForeground }}
              >
                60%
              </Typography>
            </View>
            <Progress.Root value={60}>
              <Progress.Indicator />
            </Progress.Root>
          </View>
          <View style={{ gap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body-sm" style={{ fontWeight: "500" }}>
                Testing
              </Typography>
              <Typography
                variant="body-sm"
                style={{ color: theme.colors.mutedForeground }}
              >
                35%
              </Typography>
            </View>
            <Progress.Root value={35}>
              <Progress.Indicator />
            </Progress.Root>
          </View>
        </View>
      </Card.Body>
    </ShowcaseBlock>
  );
}
