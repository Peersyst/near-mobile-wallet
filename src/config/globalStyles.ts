import { CreateGlobalStyles } from "@peersyst/react-native-components";

const globalStyles: CreateGlobalStyles = ({ theme: { palette, typography } }) => ({
    Divider: {
        backgroundColor: palette.overlay["8%"],
    },
    DottedPagination: {
        gap: 6,
        dot: {
            width: 8,
            height: 8,
            backgroundColor: palette.overlay["8%"],
            active: {
                backgroundColor: palette.primary,
            },
        },
    },
    FormControlHint: {
        fontSize: 14,
        color: palette.gray[300],
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
        backgroundColor: palette.paper,
    },
    Typography: {
        light: {
            color: palette.gray[300],
            opacity: 1,
        },
    },
});

export default globalStyles;
