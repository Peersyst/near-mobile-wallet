import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";

export const RippleNumberRoot = styled(View)(() => ({
    height:70,
    width:70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
}));


export const TextNumber = styled(Text)(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
    fontSize:34
}));