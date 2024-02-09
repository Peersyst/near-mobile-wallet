import { Paper } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const paperStylesheet = stylesheet(Paper)(({ fromTheme }) => ({
    backgroundColor: fromTheme("palette.component.paper"),
}));
