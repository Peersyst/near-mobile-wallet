import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const BackdropRoot = styled(View)(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: theme.zIndex.modal,

    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: "100%",
}));
