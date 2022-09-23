import { CreateGlobalStyles } from "@peersyst/react-native-components";

const globalStyles: CreateGlobalStyles = ({ theme }) => ({
    Divider: {
        backgroundColor: theme.palette.overlay["8%"],
    },
    DottedPagination: {
        gap: 6,
        dot: {
            width: 8,
            height: 8,
            backgroundColor: theme.palette.overlay["8%"],
            active: {
                backgroundColor: theme.palette.primary,
            },
        },
    },
    FormControlHint: {
        fontSize: 14,
    },
    FormControlError: {
        fontSize: 14,
    },
    Paper: {
        backgroundColor: theme.palette.paper,
    },
    Typography: {
        light: {
            color: theme.palette.gray[300],
        },
    },
});

export default globalStyles;
