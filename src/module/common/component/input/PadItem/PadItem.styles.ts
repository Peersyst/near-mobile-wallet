import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { Icon } from "react-native-components";

export const PadItemRoot = styled(View)(() => ({
    height:70,
    width:70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
}));


export const Item = styled(Text)(({ theme }) => ({
    color: theme.palette.white,
    fontWeight: "bold",
    fontSize:34
}));

export const ItemIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.white,
    fontSize:23
}));