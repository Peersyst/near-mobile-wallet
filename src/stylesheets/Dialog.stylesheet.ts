import { Dialog } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const dialogStylesheet = stylesheet(Dialog)(({ fromTheme }) => ({
    title: {
        textAlign: "center",
        paddingBottom: 10,
    },
    content: {
        textAlign: "center",
        paddingBottom: 20,
        color: fromTheme("palette.text"),
    },
}));
