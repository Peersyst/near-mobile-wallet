import { View, Text } from "react-native";
import styled from "@peersyst/react-native-styled";

export const SelectItemRoot = styled(View)(() => ({
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
}));

export const SelectItemText = styled(Text)(({ theme }) => ({
    color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
}));
