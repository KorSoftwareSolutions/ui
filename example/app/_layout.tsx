import "react-native-reanimated";
import { Stack } from "expo-router";
import { UniversalUIProvider } from "@kor/ui";

export default function RootLayout() {
  return (
    <UniversalUIProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </UniversalUIProvider>
  );
}
