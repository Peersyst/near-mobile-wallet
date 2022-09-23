import { CreateGlobalStyles } from "@peersyst/react-native-components";

const globalStyles: CreateGlobalStyles = ({ theme }) => ({
    Divider: {
        backgroundColor: theme.palette.overlay["8%"],
    },
    FormControlHint: {
        fontSize: 14,
    },
    FormControlError: {
        fontSize: 14,
    },
    FormControlLabel: {
        label: {
            ...theme.typography.body2Strong,
        },
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
