// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver = {
    extraNodeModules: {
        locale: path.resolve(__dirname, "src/locale"),
        config: path.resolve(__dirname, "src/config"),
        images: path.resolve(__dirname, "src/asset/image"),
        icons: path.resolve(__dirname, "src/module/common/icons"),
        "near-peersyst-sdk": path.resolve(__dirname, "src/module/sdk"),
        "@peersyst/react-native-transak-sdk": path.resolve(__dirname, "src/module/transak"),
        module: path.resolve(__dirname, "src/module"),
        utils: path.resolve(__dirname, "src/utils"),
        "stack-navigator": path.resolve(__dirname, "src/Stack.ts"),
        "query-utils": path.resolve(__dirname, "src/query/react-query-overrides.ts"),
        "test-utils": path.resolve(__dirname, "test/utils/test-utils"),
        "test-mocks": path.resolve(__dirname, "test/__mocks__"),
        mocks: path.resolve(__dirname, "test/__mocks__"),
        crypto: path.resolve(__dirname, "src/polyfills/Crypto"),
        https: require.resolve("https-browserify"),
        stream: require.resolve("stream-browserify"),
        http: require.resolve("stream-http"),
        url: require.resolve("url"),
    },
};

module.exports = config;
