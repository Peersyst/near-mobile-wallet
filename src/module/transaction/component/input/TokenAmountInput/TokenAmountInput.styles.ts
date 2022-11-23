import styled from "@peersyst/react-native-styled";
import TextField from "module/common/component/input/TextField/TextField";

export const TokenAmountInputRoot = styled(TextField, { size: "lg" })(({ theme }) => ({
    component: {
        input: {
            ...theme.typography.body1Strong,
        },
    },
}));
