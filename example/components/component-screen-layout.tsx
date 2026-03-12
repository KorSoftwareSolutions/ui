import { Separator, Typography } from "@korsolutions/ui";
import React, { createContext, useContext, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { SeoHead } from "./seo-head";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ComponentScreenLayout({ title, children }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);

  const contextValue: ScrollViewContextType = {
    scrollToEnd: () => scrollViewRef.current?.scrollToEnd({ animated: false }),
  };

  return (
    <ScrollViewContext.Provider value={contextValue}>
      <SeoHead title={title} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={s.container}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={s.content}
          style={s.container}
        >
          <Typography variant="heading" size="lg">
            {title}
          </Typography>
          <Separator />
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
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
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
  },
});
