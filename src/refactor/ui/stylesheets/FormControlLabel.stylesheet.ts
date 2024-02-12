import { FormControlLabel } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const formControlLabelStylesheet = stylesheet(FormControlLabel)(({ fromTheme }) => ({
    label: {
        maxWidth: "100%",
        fontSize: fromTheme("typography.body2Strong.fontSize"),
        fontFamily: fromTheme("typography.body2Strong.fontFamily"),
        lineHeight: fromTheme("typography.body2Strong.lineHeight"),
    },
}));
