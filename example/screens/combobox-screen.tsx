import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Combobox, Typography, useTheme } from "@korsolutions/ui";
import { router, usePathname } from "expo-router";
import { Globe, Monitor, Smartphone, Tv } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

interface Framework {
  value: string;
  label: string;
}

const frameworks: Framework[] = [
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

interface Platform {
  value: string;
  label: string;
  description: string;
  icon: typeof Globe;
}

const platforms: Platform[] = [
  { value: "web", label: "Web", description: "Browser-based apps", icon: Globe },
  { value: "mobile", label: "Mobile", description: "iOS & Android", icon: Smartphone },
  { value: "desktop", label: "Desktop", description: "Windows, Mac, Linux", icon: Monitor },
  { value: "tv", label: "TV", description: "Smart TV apps", icon: Tv },
];

export function ComboboxComponentScreen() {
  const pathname = usePathname();
  const isModalScreen = pathname?.endsWith("/modal");

  const [selectedFramework, setSelectedFramework] = useState<Framework | undefined>();

  return (
    <ComponentScreenLayout title={isModalScreen ? "Combobox modal" : "Combobox"}>
      <UseCaseSection title="Default">
        <Combobox.Root
          items={frameworks}
          value={selectedFramework}
          onChange={setSelectedFramework}
        >
          <Combobox.Trigger placeholder="Select framework..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              <Combobox.List<Framework>
                renderItem={({ item }) => (
                  <Combobox.Option item={item}>{item.label}</Combobox.Option>
                )}
                renderEmpty={() => <Combobox.Empty>No framework found.</Combobox.Empty>}
              />
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      <UseCaseSection title="Disabled">
        <Combobox.Root items={frameworks} isDisabled>
          <Combobox.Trigger placeholder="Select framework..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              <Combobox.List<Framework>
                renderItem={({ item }) => (
                  <Combobox.Option item={item}>{item.label}</Combobox.Option>
                )}
              />
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      </UseCaseSection>

      <UseCaseSection title="Custom Items">
        <CustomItemsExample />
      </UseCaseSection>

      <UseCaseSection title="Async Search">
        <AsyncSearchExample />
      </UseCaseSection>

      {!isModalScreen && (
        <UseCaseSection title="In modal screen">
          <Button onPress={() => router.navigate("/components/combobox/modal")} variant="secondary">
            Open Modal Screen
          </Button>
        </UseCaseSection>
      )}
    </ComponentScreenLayout>
  );
}

const CustomItemsExample = () => {
  const { colors } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | undefined>();

  return (
    <Combobox.Root
      items={platforms}
      value={selectedPlatform}
      onChange={setSelectedPlatform}
    >
      <Combobox.Trigger placeholder="Select platform..." />
      <Combobox.Portal>
        <Combobox.Overlay />
        <Combobox.Content>
          <Combobox.List<Platform>
            renderItem={({ item: platform }) => (
              <Combobox.Option item={platform}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <platform.icon size={20} color={colors.foreground} />
                  <View>
                    <Typography>{platform.label}</Typography>
                    <Typography size="sm" style={{ color: colors.mutedForeground }}>
                      {platform.description}
                    </Typography>
                  </View>
                </View>
              </Combobox.Option>
            )}
            renderEmpty={() => <Combobox.Empty>No platform found.</Combobox.Empty>}
          />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};

const AsyncSearchExample = () => {
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const { setQuery, results, isLoading } = useAsyncSearch();

  return (
    <Combobox.Root
      items={results}
      value={selectedCity}
      onChange={setSelectedCity}
      filter={null}
      onInputChange={setQuery}
    >
      <Combobox.Trigger placeholder="Search cities..." />
      <Combobox.Portal>
        <Combobox.Overlay />
        <Combobox.Content>
          <Combobox.List<string>
            renderItem={({ item }) => (
              <Combobox.Option item={item}>{item}</Combobox.Option>
            )}
            renderEmpty={() => (
              <Combobox.Empty>{isLoading ? "Loading..." : "No city found."}</Combobox.Empty>
            )}
          />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
