import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const AlertCircle = styled(View)(({ theme }) => {
    return {
        position: "absolute",
        top: -2,
        right: -2.7,
        width: 11,
        height: 11,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: theme.palette.status.error,
        backgroundColor: theme.palette.status.error,
    };
});
