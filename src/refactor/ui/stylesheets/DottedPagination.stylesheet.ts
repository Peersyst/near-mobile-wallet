import { DottedPagination } from "@peersyst/react-native-components";
import { stylesheet } from "@peersyst/react-native-styled";

export const dottedPaginationStylesheet = stylesheet(DottedPagination)(({ fromTheme }) => ({
    gap: 6,
    dot: {
        width: 8,
        height: 8,
        backgroundColor: "rgba(38, 38, 38, 0.08)",
        active: {
            backgroundColor: fromTheme("palette.primary"),
        },
    },
}));
