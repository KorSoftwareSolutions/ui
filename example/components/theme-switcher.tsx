import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@korsolutions/ui";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

export function ThemeSwitcher() {
  const theme = useTheme();

  return (
    <Link href="/theme-selector" asChild>
      <TouchableOpacity>
        <MaterialCommunityIcons name="palette" size={24} color={theme.colors.foreground} />
      </TouchableOpacity>
    </Link>
  );
}
