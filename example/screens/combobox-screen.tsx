import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Combobox, List, Typography, useTheme } from "@korsolutions/ui";
import { Globe, Monitor, Smartphone, Tv } from "lucide-react-native";
import { router, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
  { value: "gatsby", label: "Gatsby" },
];

const ALL_CITIES = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "Charlotte",
  "Indianapolis",
  "San Francisco",
  "Seattle",
  "Denver",
  "Nashville",
];

function useAsyncSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(() => {
      const filtered = ALL_CITIES.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return { query, setQuery, results, isLoading };
}

const platforms = [
  {
    value: "web",
    label: "Web",
    description: "Browser-based apps",
    icon: Globe,
  },
  {
    value: "mobile",
    label: "Mobile",
    description: "iOS & Android",
    icon: Smartphone,
  },
  {
    value: "desktop",
    label: "Desktop",
    description: "Windows, Mac, Linux",
    icon: Monitor,
  },
  {
    value: "tv",
    label: "TV",
    description: "Smart TV apps",
    icon: Tv,
  },
];

export function ComboboxComponentScreen() {
  const { colors } = useTheme();
  const pathname = usePathname();
  const isModalScreen = pathname?.endsWith("/modal");

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [platformValue, setPlatformValue] = useState("");
  const [asyncValue, setAsyncValue] = useState("");
  const { setQuery, results, isLoading } = useAsyncSearch();

  return (
    <ComponentScreenLayout
      title={isModalScreen ? "Combobox modal" : "Combobox"}
      backHref={isModalScreen ? "/components/combobox" : undefined}
    >
      <UseCaseSection title="Default">
        <Combobox.Root value={value} onChange={setValue}>
          <Combobox.Trigger placeholder="Select framework..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              <Combobox.Empty>No framework found.</Combobox.Empty>
              {frameworks.map((fw) => (
                <Combobox.Option key={fw.value} value={fw.value}>
                  {fw.label}
                </Combobox.Option>
              ))}
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <Combobox.Root value="" isDisabled>
          <Combobox.Trigger placeholder="Select framework..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              {frameworks.map((fw) => (
                <Combobox.Option key={fw.value} value={fw.value}>
                  {fw.label}
                </Combobox.Option>
              ))}
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      <UseCaseSection title="With Keywords">
        <Combobox.Root value={value2} onChange={setValue2}>
          <Combobox.Trigger placeholder="Search languages..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              <Combobox.Empty>No language found.</Combobox.Empty>
              <Combobox.Option value="ts">TypeScript</Combobox.Option>
              <Combobox.Option value="py">Python</Combobox.Option>
              <Combobox.Option value="rs">Rust</Combobox.Option>
              <Combobox.Option value="go">Go</Combobox.Option>
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      <UseCaseSection title="Custom Items">
        <Combobox.Root value={platformValue} onChange={setPlatformValue}>
          <Combobox.Trigger placeholder="Select platform..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              <Combobox.Empty>No platform found.</Combobox.Empty>
              {platforms.map((platform) => (
                <Combobox.Option
                  key={platform.value}
                  value={platform.value}
                  label={platform.label}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                    }}
                  >
                    <platform.icon size={20} color={colors.foreground} />
                    <View>
                      <Typography variant="body-md">
                        {platform.label}
                      </Typography>
                      <Typography
                        variant="body-sm"
                        style={{ color: colors.mutedForeground }}
                      >
                        {platform.description}
                      </Typography>
                    </View>
                  </View>
                </Combobox.Option>
              ))}
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      <UseCaseSection title="Async Search">
        <Combobox.Root
          value={asyncValue}
          onChange={setAsyncValue}
          onSearchChange={setQuery}
          filter={() => true}
        >
          <Combobox.Trigger placeholder="Search cities..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              {isLoading ? (
                <Combobox.Empty>Loading...</Combobox.Empty>
              ) : (
                <List
                  data={results}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Combobox.Option key={item} value={item}>
                      {item}
                    </Combobox.Option>
                  )}
                  renderEmpty={() => (
                    <Combobox.Empty>No cities found.</Combobox.Empty>
                  )}
                />
              )}
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      {!isModalScreen && (
        <UseCaseSection title="In modal screen">
          <Button
            onPress={() => router.navigate("/components/combobox/modal")}
            variant="secondary"
          >
            Open Modal Screen
          </Button>
        </UseCaseSection>
      )}
    </ComponentScreenLayout>
  );
}
