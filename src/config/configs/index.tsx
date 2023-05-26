import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";
import testConfig from "./config.test.json";
import stagingConfig from "./config.staging.json";
import baseConfig from "./config.base.json";
import { SupportedPaymentMethods } from "module/transak";
import { Platform } from "react-native";
import { CreateConfig } from "@peersyst/react-native-components";
import { EnvConfig } from "config/config.declarations";

const typedBaseConfig: CreateConfig = {
    ...baseConfig,
    transak: {
        ...baseConfig.transak,
        disablePaymentMethods: Platform.OS !== "ios" ? SupportedPaymentMethods.APPLE_PAY : undefined,
    },
};

export const envConfigs: Record<EnvConfig, CreateConfig> = {
    test: { ...typedBaseConfig, ...testConfig },
    development: { ...typedBaseConfig, ...devConfig },
    staging: { ...typedBaseConfig, ...stagingConfig },
    production: {
        ...typedBaseConfig,
        ...prodConfig,
        transak: {
            ...typedBaseConfig.transak,
            apiKey: "d0f7c7f7-7f4a-4f4a-8b0a-4f4a7f4a7f4a",
            environment: "PRODUCTION",
        },
    },
};
