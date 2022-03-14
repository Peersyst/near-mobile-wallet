import { createTheme, defaultTheme } from "react-native-components";
import { translate } from "locale";

export const theme = createTheme({
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
            success: "#36b930",
        },
    },
    typography: {
        h1: {
            fontSize: 24,
        },
        h2: {
            fontSize: 20,
        },
        h3: {
            fontSize: 18,
        },
        h4: undefined,
        h5: undefined,
        h6: undefined,
        subtitle1: undefined,
        subtitle2: undefined,
    },
    borderRadius: 24,
    toolbarHeight: 55,
    translate,
});
