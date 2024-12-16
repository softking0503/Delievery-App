// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: ["nativewind/babel"],
//   };
// };


module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", // This is necessary for importing variables from .env
          path: ".env",        // Path to your .env file
          allowlist: null,
          blocklist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
