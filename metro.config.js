// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver = {
    extraNodeModules: {
        crypto: path.resolve(__dirname, "src/refactor/common/polyfills/Crypto"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        url: require.resolve("url"),
        refactor: path.resolve(__dirname, "src/refactor"),
    },
};

module.exports = config;
