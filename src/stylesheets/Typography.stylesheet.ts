import { Typography } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const typographyStylesheet = stylesheet(Typography)(({ fromTheme }) => ({
    light: {
        opacity: 1,
        color: fromTheme("palette.gray[300]"),
    },
}));
