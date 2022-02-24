import { createTheme } from "react-native-components";
import { translate } from "locale";

export const theme = createTheme({
    palette: {
        primary: "#623EDF",
        white: "#FFFFFF",
        black: "#0B0D1E",
        fullBlack: "#000000",
        darkGray: "#707070",
        darkLightGray: "#7070707F",
        darkFont: "#343434",
        turquoise: "#15C8BD",
        gold: "#E4AF4C",
        violet: "#924AD9",
        blue: "#47B5D6",
        pink: "#FF66B0",
        purple: "#623EDF",
        darkerGray: "#141414",
        gray: "#00000069",
        lightGray: "#F9F9F966",
        lighterGray: "#F9F9F9D8",
        red: "#FF0E0E",
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
    translate,
});
