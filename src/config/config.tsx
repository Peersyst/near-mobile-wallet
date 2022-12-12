import { CreateConfig, createConfig } from "@peersyst/react-native-components";
import lightTheme from "./theme/lightTheme";
import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";
import stagingConfig from "./config.staging.json";
import baseConfig from "./config.base.json";
import globalStyles from "config/globalStyles";
import { ChevronDownIcon } from "icons";
import darkTheme from "config/theme/darkTheme";
import { AddressValidator } from "./validators/AddressValidator";
import { PrivateKeyValidator } from "./validators/PrivateKeyValidator";
import { RadioCheckedIcon } from "module/common/icons/RadioCheckedIcon";
import { RadioUncheckedIcon } from "module/common/icons/RadioUncheckedIcon";

const envConfigs: Record<string, CreateConfig> = {
    test: { ...baseConfig, ...devConfig },
    development: { ...baseConfig, ...devConfig },
    production: { ...baseConfig, ...prodConfig },
    staging: { ...baseConfig, ...stagingConfig },
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
                mainnetAddress: envConfig.mainnetExplorerLink + "address/",
                mainnetTx: envConfig.mainnetExplorerLink + "transaction/",
                testnetAddress: envConfig.testnetExplorerLink + "address/",
                testnetTx: envConfig.testnetExplorerLink + "transaction/",
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
                variant: "body3Strong",
                numberOfLines: 1,
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
        Select: {
            defaultProps: {
                icon: <ChevronDownIcon />,
            },
        },
        TextInput: {
            defaultProps: {
                errorElement: false,
            },
        },
        RadioButton: {
            defaultProps: {
                icon: <RadioUncheckedIcon />,
                checkedIcon: <RadioCheckedIcon />,
            },
        },
    },
    themes: {
        default: lightTheme,
        light: lightTheme,
        dark: darkTheme,
    },
    validators: {
        address: AddressValidator,
        privateKey: PrivateKeyValidator,
    },
    globalStyles,
});

export default config;
