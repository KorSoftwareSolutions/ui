import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { useTheme } from "@korsolutions/ui";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ThemeScreen() {
  const theme = useTheme();

  const colorEntries = Object.entries(theme.colors) as [keyof typeof theme.colors, string][];

  return (
    <ComponentScreenLayout title="Theme" backHref="/">
      <Section title="Colors">
        <View style={s.colorGrid}>
          {colorEntries.map(([name, value]) => (
            <ColorSwatch key={name} name={name} value={value} />
          ))}
        </View>
      </Section>

      <Section title="Typography">
        <PropertyRow label="Font Family" value={theme.fontFamily} />
        <PropertyRow label="Font Size" value={`${theme.fontSize}px`} />
        <PropertyRow label="Letter Spacing" value={`${theme.letterSpacing}px`} />
      </Section>

      <Section title="Spacing & Shape">
        <PropertyRow label="Border Radius" value={`${theme.radius}px`} />
        <View style={s.radiusDemo}>
          <View
            style={[
              s.radiusBox,
              {
                borderRadius: theme.radius,
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
          <Text style={[s.radiusLabel, { color: theme.colors.mutedForeground }]}>Example with radius: {theme.radius}</Text>
        </View>
      </Section>

      <Section title="Color Scheme">
        <PropertyRow label="Current Scheme" value={theme.colorScheme} />
      </Section>
    </ComponentScreenLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={s.section}>
      <Text style={[s.sectionTitle, { color: theme.colors.foreground }]}>{title}</Text>
      <View style={s.sectionContent}>{children}</View>
    </View>
  );
}

function ColorSwatch({ name, value }: { name: string; value: string }) {
  const theme = useTheme();
  return (
    <View style={s.colorSwatch}>
      <View
        style={[
          s.colorBox,
          {
            backgroundColor: value,
            borderColor: theme.colors.border,
          },
        ]}
      />
      <View style={s.colorInfo}>
        <Text style={[s.colorName, { color: theme.colors.foreground }]}>{name}</Text>
        <Text style={[s.colorValue, { color: theme.colors.mutedForeground }]}>{value}</Text>
      </View>
    </View>
  );
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  const theme = useTheme();
  return (
    <View style={s.propertyRow}>
      <Text style={[s.propertyLabel, { color: theme.colors.foreground }]}>{label}</Text>
      <Text style={[s.propertyValue, { color: theme.colors.mutedForeground }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  sectionContent: {
    gap: 12,
  },
  colorGrid: {
    gap: 16,
  },
  colorSwatch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
  },
  colorInfo: {
    flex: 1,
    gap: 4,
  },
  colorName: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  colorValue: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  propertyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  propertyLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  propertyValue: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  radiusDemo: {
    marginTop: 12,
    alignItems: "center",
    gap: 12,
  },
  radiusBox: {
    width: 100,
    height: 100,
  },
  radiusLabel: {
    fontSize: 14,
  },
});
