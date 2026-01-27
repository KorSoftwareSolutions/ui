import { useTheme } from "@korsolutions/ui";
import { Href } from "expo-router";
import React, { createContext, useContext, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "./screen-header";

interface Props {
  title: string;
  children: React.ReactNode;
  backHref?: Href;
}

export function ComponentScreenLayout({ title, children, backHref = "/" }: Props) {
  const theme = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  const contextValue: ScrollViewContextType = {
    scrollToEnd: () => scrollViewRef.current?.scrollToEnd({ animated: false }),
  };

  return (
    <ScrollViewContext.Provider value={contextValue}>
      <SafeAreaView edges={["top", "bottom"]} style={s.container}>
        <ScreenHeader title={title} backHref={backHref} />
        <View style={[s.divider, { backgroundColor: theme.colors.border }]} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={s.container}>
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={s.content}
            style={s.container}
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollViewContext.Provider>
  );
}

type ScrollViewContextType = {
  scrollToEnd: () => void;
};

const ScrollViewContext = createContext<ScrollViewContextType | null>(null);

export const useScrollView = () => {
  const scrollView = useContext(ScrollViewContext);
  if (!scrollView) {
    throw new Error("useScrollView must be used within a ScrollViewProvider");
  }
  return scrollView;
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },

  divider: {
    height: 1,
  },
});
