import { CreateConfig, createConfig } from "@peersyst/react-native-components";
import lightTheme from "./theme/lightTheme";
import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";
import stagingConfig from "./config.staging.json";
import { CkbAddressValidator } from "config/validators/CkbAddressValidator";
import globalStyles from "config/globalStyles";

const envConfigs: Record<string, CreateConfig> = {
    test: devConfig,
    development: devConfig,
    production: prodConfig,
    staging: stagingConfig,
};

const environment = process.env;
const envKey = environment.REACT_APP_ENV_CONFIG || environment.NODE_ENV!;

if (!(envKey in envConfigs)) throw new Error(`${envKey} is not a valid env config`);

const envConfig = envConfigs[envKey];

const config = createConfig({
    ...envConfig,
    components: {
        BlockchainAddress: {
            blockchainLinks: {
                address: envConfig.explorerLink + "accounts/",
                tx: envConfig.explorerLink + "transactions/",
            },
        },
        Button: {
            defaultProps: {
                variant: "primary",
                size: "lg",
            },
        },
        Label: {
            defaultProps: {
                variant: "body1",
            },
        },
        Modal: {
            defaultProps: {
                showCloseButton: false,
            },
        },
        NumericInput: {
            maxDecimals: envConfig.maxNumberOfDecimals,
        },
        TextInput: {
            defaultProps: {
                errorElement: false,
            },
        },
    },
    themes: {
        default: lightTheme,
    },
    validators: {
        address: CkbAddressValidator,
    },
    globalStyles,
});

export default config;
