import { ElementStyler } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { Pressable } from "react-native";

export const AddNearModalOptionContentIcon = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.primary,
    fontSize: 22,
}));

export const AddNearModalOptionRoot = styled(Pressable)(() => ({
    flexDirection: "row",
    columnGap: 12,
    paddingVertical: 8,
}));
