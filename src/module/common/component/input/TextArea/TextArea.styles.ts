import styled from "@peersyst/react-native-styled";
import { TextArea } from "react-native-components";

export const TextAreaRoot = styled(TextArea)(({ theme }) => ({
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
}));
