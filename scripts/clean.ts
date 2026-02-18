import { rmSync } from "node:fs";
import packageJson from "../package.json";

for (const workspace of packageJson.workspaces.packages) {
  const path = workspace.replace("/*", "");
  console.log(`Cleaning dist and node_modules for ${path}...`);
  rmSync(path + "/dist", { recursive: true, force: true });
  rmSync(path + "/node_modules", { recursive: true, force: true });
}

rmSync("dist", { recursive: true, force: true });
rmSync("node_modules", { recursive: true, force: true });

console.log("Clean complete.");
