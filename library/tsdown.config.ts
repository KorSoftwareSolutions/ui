import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.tsx", "./src/primitives/index.ts", "./src/components/index.ts", "./src/hooks/index.ts"],
  onSuccess() {
    console.info("🙏 Build succeeded!");
  },
});
