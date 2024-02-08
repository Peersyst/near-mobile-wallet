import { FormControlHint } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const formControlHintStylesheet = stylesheet(FormControlHint)(({ fromTheme }) => ({
    fontSize: fromTheme("typography.body3.fontSize"),
    color: fromTheme("palette.gray.300"),
}));
