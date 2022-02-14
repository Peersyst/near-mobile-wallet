import { createTheme } from "react-native-components";
import { translate } from "locale";

export const theme = createTheme({
    palette: {
        primary: "#623EDF",
        white: "#FFFFFF",
        black: "#0B0D1E",
        darkGray: "#707070",
        turquoise: "#15C8BD",
        gold: "#E4AF4C",
        violet: "#924AD9",
        blue: "#47B5D6",
        pink: "#FF66B0",
        purple: "#623EDF",
        darkerGray: "#141414",
        gray: "#00000069",
        lightGray: "#F9F9F966",
        backgroundGray: "#F9F9F9DE",
        red: "#FF0E0E",
    },
    borderRadius: 24,
    translate,
});
