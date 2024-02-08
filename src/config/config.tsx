import { createConfig } from "@peersyst/react-native-components";
import lightTheme from "./theme/lightTheme";
import { ChevronDownIcon } from "icons";
import darkTheme from "./theme/darkTheme";
import { AddressValidator } from "./validators/AddressValidator";
import { PrivateKeyValidator } from "./validators/PrivateKeyValidator";
import { RadioCheckedIcon } from "../module/common/icons/RadioCheckedIcon";
import { RadioUncheckedIcon } from "module/common/icons/RadioUncheckedIcon";
import { EnvConfig } from "./config.declarations";
import Button from "../module/common/component/input/Button/Button";
import { envConfigs } from "./configs";

const environment = process.env;

const envKey = process.env.CONFIG_ENV || environment.NODE_ENV!;

if (!(envKey in envConfigs)) throw new Error(`${envKey} is not a valid env config`);

const envConfig = envConfigs[envKey as EnvConfig];

const config = createConfig({
    ...envConfig,
    components: {
        BlockchainAddress: {
            blockchainLinks: {
                mainnetAddress: envConfig.mainnetExplorerLink + "/accounts/",
                mainnetTx: envConfig.mainnetExplorerLink + "/transactions/",
                testnetAddress: envConfig.testnetExplorerLink + "/accounts/",
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
});

export default config;
