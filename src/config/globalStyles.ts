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
            backgroundColor: "rgba(38, 38, 38, 0.08)",
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
    Label: {
        label: {
            ...typography.body3Strong,
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
