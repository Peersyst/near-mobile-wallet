import { CreateGlobalStyles } from "@peersyst/react-native-components";

const globalStyles: CreateGlobalStyles = ({ theme: { palette, typography } }) => ({
    Dialog: {
        title: {
            textAlign: "center",
            paddingBottom: 10,
        },
        content: {
            textAlign: "center",
            paddingBottom: 20,
            color: palette.gray[600],
        },
    },
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
            maxWidth: "100%",
        },
    },
    Label: {
        label: {
            ...typography.body3Strong,
            maxWidth: "60%",
        },
    },
    Paper: {
        backgroundColor: palette.component.paper,
    },
    Typography: {
        light: {
            color: palette.gray[300],
            opacity: 1,
        },
    },
});

export default globalStyles;
