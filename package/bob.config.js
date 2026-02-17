module.exports = {
  source: "src",
  output: "dist",
  targets: [
    [
      "module",
      {
        esm: true,
        configFile: true,
      },
    ],
    "typescript",
  ],
};
