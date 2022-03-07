/* eslint-disable @typescript-eslint/no-var-requires,no-undef */
const { resolve } = require("path");
// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest");
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require("./tsconfig.path");

module.exports = {
    testEnvironment: "jest-environment-jsdom",
    preset: "jest-expo",
    setupFilesAfterEnv: ["<rootDir>/test/unit/setup.ts", "@testing-library/jest-native"],
    moduleDirectories: [
        "node_modules",
        "utils", // a utility folder
        __dirname, // the root directory
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testRegex: ".*\\.spec\\.(ts|tsx)$",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    collectCoverageFrom: [
        "./src/**/*.(ts|js|tsx|jsx)",
        "!./src/**/index.(ts|js|tsx|jsx)",
        "!./src/**/*.d.ts",
        "!./src/**/mock/**/*",
        "!./src/module/api/**/*",
        "!./src/script/**/*",
        "!./src/**/*.(styles|types).(ts|js|tsx|jsx)",
        "!./src/module/common/icons/**/*",
        "!./src/module/common/style/**/*",
        "!./src/module/common/service/BaseStorageService.ts",
        "!./src/module/common/component/base/**/*",
        "!./src/module/common/hook/(useCachedResources.ts|useColorScheme.ts)",
        "!./src/Providers.tsx",
        "!./src/Navigator.tsx",
        "!./src/**/*NavigatorGroup.(tsx|ts)",
        "!./src/Stack.ts",
        "!./src/utils/(isWeb|extractTextStyles).ts",
    ],
    coverageDirectory: "./coverage",
    coverageThreshold: {
        global: {
            branches: 50,
            statements: 50,
        },
    },
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: resolve(compilerOptions.baseUrl) }),
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/unit/__mocks__/fileMock.js",
    },
};
