import { ComponentScreenLayout } from "@/components/component-screen-layout";
import { UseCaseSection } from "@/components/use-case-section";
import { Button, Combobox, PhoneInput, Typography, useTheme } from "@korsolutions/ui";
import { router, usePathname } from "expo-router";
import { Globe, Monitor, Smartphone, Tv } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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

interface PhoneContact {
  value: string; // e164
  label: string; // display name
  subtitle: string; // formatted number for display
}

const PHONE_CONTACTS: PhoneContact[] = [
  { value: "+12125550101", label: "Alice Johnson", subtitle: "+1 (212) 555-0101" },
  { value: "+12125550182", label: "Bob Smith", subtitle: "+1 (212) 555-0182" },
  { value: "+14155550143", label: "Carol White", subtitle: "+1 (415) 555-0143" },
  { value: "+447700900123", label: "David Brown", subtitle: "+44 7700 900123" },
  { value: "+447700900456", label: "Emma Wilson", subtitle: "+44 7700 900456" },
  { value: "+4915901234567", label: "Felix Müller", subtitle: "+49 1590 1234567" },
  { value: "+919876543210", label: "Priya Patel", subtitle: "+91 98765 43210" },
  { value: "+61412345678", label: "Liam Chen", subtitle: "+61 412 345 678" },
  { value: "+817012345678", label: "Yuki Tanaka", subtitle: "+81 70-1234-5678" },
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
        <Combobox.Root items={frameworks} value={selectedFramework} onChange={setSelectedFramework}>
          <Combobox.Trigger placeholder="Select framework..." />
          <Combobox.Portal>
            <Combobox.Overlay />
            <Combobox.Content>
              <Combobox.List<Framework>
                renderItem={({ item }) => (
                  <Combobox.Option item={item}>
                    <Typography>{item.label}</Typography>
                  </Combobox.Option>
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
                  <Combobox.Option item={item}>
                    <Typography>{item.label}</Typography>
                  </Combobox.Option>
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

      <UseCaseSection title="Phone Autocomplete">
        <PhoneAutocompleteExample />
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
    <Combobox.Root items={platforms} value={selectedPlatform} onChange={setSelectedPlatform}>
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
              <Combobox.Option item={item}>
                <Typography>{item}</Typography>
              </Combobox.Option>
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

const filterContact = (contact: PhoneContact, query: string) => {
  const digits = query.replace(/\D/g, "");
  if (digits) {
    return contact.value.replace(/\D/g, "").includes(digits);
  }
  return contact.label.toLowerCase().includes(query.toLowerCase());
};

const PhoneAutocompleteExample = () => {
  const { colors } = useTheme();
  const [phone, setPhone] = useState("");
  const [selectedContact, setSelectedContact] = useState<PhoneContact | undefined>();

  const handleSelectContact = (contact: PhoneContact) => {
    setSelectedContact(contact);
    setPhone(contact.value);
  };

  return (
    <View style={styles.container}>
      <Combobox.Root
        items={PHONE_CONTACTS}
        value={selectedContact}
        onChange={handleSelectContact}
        getItemValue={(c) => c.value}
        getItemLabel={(c) => c.label}
        filter={filterContact}
      >
        <Combobox.Trigger
          render={({ open, setInputValue, inputRef }) => (
            <PhoneInput.Root
              value={phone}
              onChange={(e164) => {
                setPhone(e164);
                setInputValue(e164.replace(/\D/g, ""));
              }}
              countryCodes={["US", "CA", "GB", "DE", "IN", "AU", "JP"]}
              defaultCountry="US"
            >
              <PhoneInput.Input ref={inputRef} onFocus={open} />
            </PhoneInput.Root>
          )}
        />
        <Combobox.Portal>
          <Combobox.Overlay />
          <Combobox.Content>
            <Combobox.List<PhoneContact>
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Combobox.Option item={item}>
                  <View style={styles.contactRow}>
                    <Typography variant="heading" size="sm">
                      {item.label}
                    </Typography>
                    <Typography size="sm" style={{ color: colors.mutedForeground }}>
                      {item.subtitle}
                    </Typography>
                  </View>
                </Combobox.Option>
              )}
              renderEmpty={() => <Combobox.Empty>No contacts found.</Combobox.Empty>}
            />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox.Root>

      <Typography size="sm">E.164: {phone || "empty"}</Typography>
      {selectedContact && <Typography size="sm">Contact: {selectedContact.label}</Typography>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  contactRow: {
    gap: 2,
  },
});
