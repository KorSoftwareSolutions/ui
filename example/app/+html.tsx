import { ScrollViewStyleReset } from "expo-router/html";
import React from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* SEO */}
        <title>KorUI - Cross-Platform UI Components for React Native</title>
        <meta
          name="description"
          content="A minimal-dependency, cross-platform UI library for React Native and Expo. Flexible components with beautiful default styling."
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="KorUI - Cross-Platform UI Components for React Native"
        />
        <meta
          property="og:description"
          content="A minimal-dependency, cross-platform UI library for React Native and Expo. Flexible components with beautiful default styling."
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="KorUI - Cross-Platform UI Components for React Native"
        />
        <meta
          name="twitter:description"
          content="A minimal-dependency, cross-platform UI library for React Native and Expo. Flexible components with beautiful default styling."
        />

        {/* Disable body scrolling on web to make ScrollView work correctly */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}
`;
