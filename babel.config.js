module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module:react-native-dotenv",
                {
                    "moduleName": "@env",
                    "path": ".env",
                    "blacklist": null,
                    "whitelist": null,
                    "safe": false,
                    "allowUndefined": true
                }
            ],
            [
                "babel-plugin-module-resolver",
                {
                    root: ["./src"],
                    alias: {
                        locale: "./src/locale",
                        asset: "./src/asset",
                        icons: "./src/module/common/icons",
                        module: "./src/module",
                        utils: "./src/utils",
                        "stack-navigator": "./src/Stack.ts",
                        "query-utils": "./src/query/react-query-overrides.ts",
                        "react-native-components": "./src/module/common/component/base"
                    },
                },
            ],
            ["@babel/plugin-proposal-async-generator-functions"],
        ],
    };
};
