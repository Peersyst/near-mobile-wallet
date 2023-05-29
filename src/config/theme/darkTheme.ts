import { createTheme, Theme } from "@peersyst/react-native-components";
import { theme } from "./theme";
import { baseTheme } from "./baseTheme";

const gray: Theme["palette"]["gray"] = {
    "0": "#262626",
    "100": "#3F4246",
    "300": "#A7A7A7",
    "600": "#dcdcdc",
    "900": "#FFFFFF",
};

const overlay: Theme["palette"]["overlay"] = {
    "80%": "#FFFFFFCC",
    "60%": "#FFFFFF99",
    "40%": "#FFFFFF66",
    "20%": "#FFFFFF33",
    "12%": "#FFFFFF1F",
    "8%": "#FFFFFF14",
    "4%": "#FFFFFF0A",
};
const altOverlay: Theme["palette"]["altOverlay"] = {
    "80%": "#262626CC",
    "60%": "#26262699",
    "40%": "#26262666",
    "20%": "#26262633",
    "12%": "#2626261F",
    "8%": "#26262614",
    "4%": "#2626260A",
};

const darkTheme = createTheme({
    ...theme,
    palette: {
        ...baseTheme,
        mode: "dark",
        background: gray[0],
        text: gray[900],
        gray,
        overlay,
        backdrop: overlay["60%"],
        altOverlay,
        component: {
            appbar: {
                backgroundColor: gray[0],
            },
            navbar: {
                borderColor: overlay["8%"],
            },
            paper: gray[0],
        },
    },
});

export default darkTheme;
