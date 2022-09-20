import styled from "@peersyst/react-native-styled";
import { TextArea } from "@peersyst/react-native-components";

export const TextAreaRoot = styled(TextArea)(({ theme }) => ({
    component: {
        borderRadius: 16,
        backgroundColor: theme.palette.lighterGray,
        borderColor: "transparent",
        focused: {
            borderColor: "transparent",
        },
        input: {
            placeholderColor: theme.palette.darkGray,
            highlightColor: theme.palette.text,
        },
        ...theme.shadows[7],
    },
}));
