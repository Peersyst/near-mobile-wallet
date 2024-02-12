const commonConfig = require("../../../../jest.config.common.js");

module.exports = {
    ...commonConfig,
    rootDir: "../../",
    displayName: {
        name: "DOMAIN",
        color: "blue",
    },
    setupFilesAfterEnv: ["./test/domain/setup.ts"],
    testRegex: ".*\\.spec\\.ts$",
    testPathIgnorePatterns: ["test/ui/", "test/data-access/"],
};
