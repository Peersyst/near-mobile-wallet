module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
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
                        "query-utils": "./src/query/react-query-overrides.ts"
                    },
                },
            ],
            ["babel-plugin-styled-components", { displayName: true }],
        ],
    };
};
