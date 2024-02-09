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
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    modulePaths: [
        "node_modules",
        "utils", // a utility folder
        "__mocks__", // a utility folder
        __dirname, // the root directory
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testRegex: ".*\\.spec\\.(ts|tsx)$",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@peersyst|@ckb-lumos/hd/node_modules/uuid)",
    ],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: resolve(compilerOptions.baseUrl) }),
        uuid: "<rootDir>/test/__mocks__/fileMock.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
    },
};
