import "react-native-reanimated";
import { Stack } from "expo-router";
import { UniversalUIProvider } from "@kor/ui";

export default function RootLayout() {
  return (
    <UniversalUIProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="components" />
      </Stack>
    </UniversalUIProvider>
  );
}
