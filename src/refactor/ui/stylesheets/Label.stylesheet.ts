import { Label } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const labelStylesheet = stylesheet(Label)(({ fromTheme }) => ({
    label: {
        fontSize: fromTheme("typography.body3Strong.fontSize"),
        fontFamily: fromTheme("typography.body3Strong.fontFamily"),
        lineHeight: fromTheme("typography.body3Strong.lineHeight"),
    },
}));
