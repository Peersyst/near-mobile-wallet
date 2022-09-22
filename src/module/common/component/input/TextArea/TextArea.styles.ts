import styled from "@peersyst/react-native-styled";
import { TextArea } from "@peersyst/react-native-components";

export const TextAreaRoot = styled(TextArea)(({ theme }) => ({
    component: {
        borderRadius: theme.borderRadiusSm,
        backgroundColor: theme.palette.background,
        color: theme.palette.text,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: theme.palette.overlay["12%"],
        input: {
            ...theme.typography.body2Strong,
            placeholderColor: theme.palette.overlay["12%"],
            highlightColor: theme.palette.primary,
        },
    },
}));
