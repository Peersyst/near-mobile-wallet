import { CreateGlobalStyles } from "@peersyst/react-native-components";

const globalStyles: CreateGlobalStyles = ({ theme: { palette: p, typography } }) => ({
    Divider: {
        backgroundColor: p.overlay["8%"],
    },
    DottedPagination: {
        gap: 6,
        dot: {
            width: 8,
            height: 8,
            backgroundColor: p.overlay["8%"],
            active: {
                backgroundColor: p.primary,
            },
        },
    },
    FormControlHint: {
        fontSize: 14,
    },
    FormControlError: {
        fontSize: 14,
    },
    FormControlLabel: {
        label: {
            ...typography.body2Strong,
        },
    },
    Paper: {
        backgroundColor: p.paper,
    },
    Typography: {
        light: {
            color: p.gray[p.mode === "light" ? 300 : 900],
        },
    },
});

export default globalStyles;
