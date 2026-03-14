import { unlink } from "node:fs/promises";

const README = "README.md";

await unlink(README).catch(() => {});

console.log("postpack complete");
