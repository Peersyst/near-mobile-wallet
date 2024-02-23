import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";
import testConfig from "./config.test.json";
import stagingConfig from "./config.staging.json";
import baseConfig from "./config.base.json";
import { Config } from "./config.types";

export const envConfigs: Record<string, Config> = {
    test: { ...baseConfig, ...testConfig } as Config,
    development: { ...baseConfig, ...devConfig } as Config,
    staging: { ...baseConfig, ...stagingConfig } as Config,
    production: { ...baseConfig, ...prodConfig } as Config,
};

const environment = process.env;

const envKey = process.env.CONFIG_ENV || environment.NODE_ENV || "development";

if (!(envKey in envConfigs)) throw new Error(`${envKey} is not a valid env config`);

const config = envConfigs[envKey];

export default config;
