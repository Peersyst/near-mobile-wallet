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
});

export default globalStyles;
