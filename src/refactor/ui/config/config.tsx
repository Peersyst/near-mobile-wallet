import { createConfig } from "@peersyst/react-native-components";
import lightTheme from "./theme/lightTheme";
import { ChevronDownIcon } from "icons";
import darkTheme from "./theme/darkTheme";
import { AddressValidator } from "./validators/AddressValidator";
import { PrivateKeyValidator } from "./validators/PrivateKeyValidator";
import { RadioCheckedIcon } from "../../../module/common/icons/RadioCheckedIcon";
import { RadioUncheckedIcon } from "module/common/icons/RadioUncheckedIcon";
import Button from "../../../module/common/component/input/Button/Button";
import { config } from "refactor/common/config";

const uiConfig = createConfig({
    projectName: config.projectName,
    themes: {
        default: lightTheme,
        light: lightTheme,
        dark: darkTheme,
    },
    validators: {
        address: AddressValidator,
        privateKey: PrivateKeyValidator,
    },
    components: {
        BlockchainAddress: {
            blockchainLinks: {
                mainnetAddress: config.mainnetExplorerLink + "/accounts/",
                mainnetTx: config.mainnetExplorerLink + "/transactions/",
                testnetAddress: config.testnetExplorerLink + "/accounts/",
                testnetTx: config.testnetExplorerLink + "/transactions/",
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
});

export default uiConfig;
