import { CreateGlobalStyles } from "@peersyst/react-native-components";

const globalStyles: CreateGlobalStyles = ({ theme }) => ({
    FormControlHint: {
        fontSize: 14,
    },
    FormControlError: {
        fontSize: 14,
    },
    Paper: {
        backgroundColor: theme.palette.paper,
    },
    Divider: {
        backgroundColor: theme.palette.overlay["8%"],
    },
    Typography: {
        light: {
            color: theme.palette.gray[300],
        },
    },
});

export default globalStyles;
