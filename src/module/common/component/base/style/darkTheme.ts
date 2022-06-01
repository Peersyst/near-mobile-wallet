import { createTheme } from "./createTheme";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: "rgb(97, 219, 251)",
        disabled: "rgb(189, 189, 189)",
        background: "rgb(72, 72, 72)",
        backdrop: "rgba(0, 0, 0, 0.5)",
        text: "rgb(255, 255, 255)",
        status: {
            info: "rgb(2, 136, 209)",
            error: "rgb(211, 47, 47)",
            warning: "rgb(245, 124, 0)",
            success: "rgb(56, 142, 60)",
        },
    },
});
