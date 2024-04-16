import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const AlertCircle = styled(View)(({ theme }) => {
    return {
        position: "absolute",
        top: -1.25,
        right: -1.25,
        width: 11,
        height: 11,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: theme.palette.white,
        backgroundColor: theme.palette.status.error,
    };
});
