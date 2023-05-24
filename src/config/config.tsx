import { CreateConfig, createConfig } from "@peersyst/react-native-components";
import lightTheme from "./theme/lightTheme";
import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";
import testConfig from "./config.test.json";
import stagingConfig from "./config.staging.json";
import baseConfig from "./config.base.json";
import globalStyles from "config/globalStyles";
import { ChevronDownIcon } from "icons";
import darkTheme from "config/theme/darkTheme";
import { AddressValidator } from "./validators/AddressValidator";
import { PrivateKeyValidator } from "./validators/PrivateKeyValidator";
import { RadioCheckedIcon } from "module/common/icons/RadioCheckedIcon";
import { RadioUncheckedIcon } from "module/common/icons/RadioUncheckedIcon";
import { EnvConfig } from "./config.declarations";
import Button from "module/common/component/input/Button/Button";
import { TransakEnviroment } from "module/transak";

const typedBaseConfig = {
    ...baseConfig,
    transak: baseConfig.transak as CreateConfig["transak"],
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
            environment: TransakEnviroment.PRODUCTION,
        },
    },
};

const environment = process.env;
const envKey = environment.REACT_APP_ENV_CONFIG || environment.NODE_ENV!;

if (!(envKey in envConfigs)) throw new Error(`${envKey} is not a valid env config`);

const envConfig = envConfigs[envKey as EnvConfig];

const config = createConfig({
    ...envConfig,
    components: {
        BlockchainAddress: {
            blockchainLinks: {
                mainnetAddress: envConfig.mainnetExplorerLink + "/address/",
                mainnetTx: envConfig.mainnetExplorerLink + "/transactions/",
                testnetAddress: envConfig.testnetExplorerLink + "/address/",
                testnetTx: envConfig.testnetExplorerLink + "/transactions/",
            },
        },
        Button: {
            defaultProps: {
                variant: "primary",
                size: "lg",
            },
        },
        Dialog: {
            defaultProps: {
                buttonsLayout: {
                    direction: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 15,
                },
            },
            actions: {
                variant: "filled",
                component: Button,
                fullWidth: true,
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
        Switch: {
            defaultProps: {
                LabelProps: {
                    alignment: "space-between",
                },
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
