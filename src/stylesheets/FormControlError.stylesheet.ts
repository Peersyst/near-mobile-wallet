import { FormControlError } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const formControlErrorStylesheet = stylesheet(FormControlError)(({ fromTheme }) => ({
    fontSize: fromTheme("typography.body3.fontSize"),
}));
