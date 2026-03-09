import { Separator, Typography, useScreenSize } from "@korsolutions/ui";
import React, { createContext, useContext, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ComponentSidebar } from "./component-sidebar";
import { ScreenHeader } from "./screen-header";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ComponentScreenLayout({ title, children }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);
  const screenSize = useScreenSize();

  const shouldShowSidebar = screenSize.isDesktop;

  const contextValue: ScrollViewContextType = {
    scrollToEnd: () => scrollViewRef.current?.scrollToEnd({ animated: false }),
  };

  return (
    <ScrollViewContext.Provider value={contextValue}>
      <View style={s.wrapper}>
        <ScreenHeader />
        <Separator />
        <SafeAreaView edges={["top", "bottom"]} style={s.container}>
          {shouldShowSidebar && <ComponentSidebar />}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={s.wrapper}
          >
            <ScrollView
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              automaticallyAdjustKeyboardInsets
              contentContainerStyle={s.content}
              style={s.wrapper}
            >
              <Typography variant="heading-lg">{title}</Typography>
              <Separator />
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
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
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    flexDirection: "row",
  },

  content: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
  },
});
