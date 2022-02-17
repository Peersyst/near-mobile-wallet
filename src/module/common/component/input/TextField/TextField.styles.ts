import styled from "@peersyst/react-native-styled";
import TextField from "module/common/component/base/input/TextInput/TextField";

export const TextFieldRoot = styled(TextField)(({ theme }) => {
    return {
        borderRadius: 45,
        height: 45,
        backgroundColor: theme.palette.lighterGray,
        borderColor: "transparent",
        focused: {
            borderColor: theme.palette.gray,
        },
        input: {
            placeholderColor: theme.palette.darkGray,
            paddingHorizontal: 15,
        },
    };
});
