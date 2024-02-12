import { createTheme, Theme } from "@peersyst/react-native-components";
import { baseTheme } from "./baseTheme";
import { theme } from "./theme";

const gray: Theme["palette"]["gray"] = {
    "0": "#FFFFFF",
    "100": "#F6F6F6",
    "300": "#A7A7A7",
    "600": "#3F4246",
    "900": "#262626",
};

const overlay: Theme["palette"]["overlay"] = {
    "80%": "#262626CC",
    "60%": "#26262699",
    "40%": "#26262666",
    "20%": "#26262633",
    "12%": "#2626261F",
    "8%": "#26262614",
    "4%": "#2626260A",
};
const altOverlay: Theme["palette"]["altOverlay"] = {
    "80%": "#FFFFFFCC",
    "60%": "#FFFFFF99",
    "40%": "#FFFFFF66",
    "20%": "#FFFFFF33",
    "12%": "#FFFFFF1F",
    "8%": "#FFFFFF14",
    "4%": "#FFFFFF0A",
};

const lightTheme = createTheme({
    ...theme,
    palette: {
        ...baseTheme,
        mode: "light",
        background: gray[0],
        text: gray[600],
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

export default lightTheme;
