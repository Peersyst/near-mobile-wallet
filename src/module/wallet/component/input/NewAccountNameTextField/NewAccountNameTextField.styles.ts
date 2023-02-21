import styled from "@peersyst/react-native-styled";
import TextField from "module/common/component/input/TextField/TextField";

export const NewAccountNameTextFieldRoot = styled(TextField)(({ theme }) => ({
    hint: {
        color: theme.palette.status.success,
    },
}));
