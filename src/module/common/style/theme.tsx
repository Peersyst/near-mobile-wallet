import { createTheme, defaultTheme } from "react-native-components";
import { translate } from "locale";
import { CkbAddressValidator } from "module/common/validator/CkbAddressValidator";
import { EXPLORER_LINK } from "@env";

export const theme = createTheme({
    icons: {
        invalid: () => <></>,
    },
    palette: {
        background: "#dedede",
        primary: "#0B0D1E",
        white: "#FFFFFF",
        black: "#0B0D1E",
        fullBlack: "#000000",
        darkGray: "#707070",
        darkLightGray: "#B0B0B0",
        darkLightGray2: "#808080",
        darkGray2: "#444444",
        darkFont: "#343434",
        turquoise: "#15C8BD",
        gold: "#E4AF4C",
        violet: "#924AD9",
        blue: "#47B5D6",
        pink: "#FF66B0",
        purple: "#623EDF",
        darkerGray: "#141414",
        gray: "#999999",
        lightGray: "#F4F4F4",
        lighterGray: "#EFEFEF",
        red: "#FF0E0E",
        appbar: "#F4F4F4",
        paper: "#F4F4F4",
        status: {
            ...defaultTheme.palette.status,
            warning: "#ff9800",
            success: "#36b930",
        },
        wallet: ["#15C8BD", "#47B5D6", "#623EDF", "#924AD9", "#FF66B0", "#E4AF4C"],
    },
    typography: {
        h1: {
            fontSize: 22,
        },
        h2: {
            fontSize: 18,
        },
        h3: {
            fontSize: 16,
        },
        h4: undefined,
        h5: undefined,
        h6: undefined,
        subtitle1: undefined,
        subtitle2: undefined,
    },
    borderRadius: 24,
    translate,
    validators: {
        address: ({ message }) => new CkbAddressValidator(message),
    },
    blockchainLinks: {
        address: EXPLORER_LINK + "address/",
        tx: EXPLORER_LINK + "transaction/",
    },
});
