const README = "README.md";
const SOURCE = "../README.md";

await Bun.write(README, Bun.file(SOURCE));

console.log("prepack complete");
