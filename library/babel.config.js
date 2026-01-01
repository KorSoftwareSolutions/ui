module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["module:react-native-builder-bob/babel-preset"],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["./src"],
          alias: {
            "@": "./src",
          },
        },
      ],
    ],
  };
};
