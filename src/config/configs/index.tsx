import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";
import testConfig from "./config.test.json";
import stagingConfig from "./config.staging.json";
import baseConfig from "./config.base.json";
import { CreateConfig } from "@peersyst/react-native-components";
import { EnvConfig } from "config/config.declarations";

export const envConfigs: Record<EnvConfig, CreateConfig> = {
    test: { ...baseConfig, ...testConfig },
    development: { ...baseConfig, ...devConfig },
    staging: { ...baseConfig, ...stagingConfig },
    production: { ...baseConfig, ...prodConfig },
};
