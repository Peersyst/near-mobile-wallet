import { Divider } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const dividerStylesheet = stylesheet(Divider)(({ fromTheme }) => ({
    backgroundColor: fromTheme("palette.overlay[8%]"),
}));
