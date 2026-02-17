import { useTheme } from "../../themes";
import React, { useEffect } from "react";
import { Platform } from "react-native";

export type ScrollBarProps = {
  thumbColor?: string;
  trackColor?: string;
};

export function ScrollBar(params: ScrollBarProps) {
  const theme = useTheme();

  const { thumbColor = theme.colors.border, trackColor = "transparent" } = params;

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const styles = document.createElement("style");
    styles.id = "korsolutions-ui-scroll-bar-styles";
    styles.innerHTML = `
      :root {
        scrollbar-width: thin;
        scrollbar-color: ${thumbColor} ${trackColor};

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${trackColor};
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${thumbColor};
          border-radius: 4px;
          border: 2px solid ${trackColor};
        }
      }
    `;
    document.head.appendChild(styles);
    return () => {
      if (styles.parentNode) {
        document.head.removeChild(styles);
      }
    };
  }, [thumbColor, trackColor]);

  // Future plans for native custom scroll bar
  return <></>;
}
