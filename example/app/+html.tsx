import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="color-scheme" content="light dark" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
html, body, #root {
  background-color: hsla(223.81, 100%, 100%, 1);
}
@media (prefers-color-scheme: dark) {
  html, body, #root {
    background-color: hsla(223.81, 0%, 3.94%, 1);
  }
  #root > * {
    opacity: 0;
    animation: fadeIn 0s ease-in 0.05s forwards;
  }
}
@keyframes fadeIn {
  to { opacity: 1; }
}
`;
