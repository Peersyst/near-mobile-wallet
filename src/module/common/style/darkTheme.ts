import { createTheme } from "react-native-components";
import { deepmerge } from "@peersyst/react-utils";
import { theme } from "module/common/style/theme";

export const darkTheme = createTheme(
    deepmerge(theme, {
        palette: {
            mode: "dark",
            primary: "#FFFFFF",
            text: "#FFFFFF",
            background: "#141414",
            appbar: "#141414",
            paper: "#141414",
        },
    }),
);
