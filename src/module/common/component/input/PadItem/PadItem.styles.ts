import styled from "@peersyst/react-native-styled";
import { View, Text } from "react-native";
import { Icon } from "@peersyst/react-native-components";

export const PadItemRoot = styled(View)(() => ({
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
}));

export const Item = styled(Text)(({ theme }) => ({
    color: theme.palette.text,
    fontWeight: "bold",
    fontSize: 34,
}));

export const ItemIcon = styled(Icon)(({ theme }) => ({
    color: theme.palette.text,
    fontSize: 20,
}));
