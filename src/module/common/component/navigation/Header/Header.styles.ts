import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { SettingsIcon as Settings } from "icons";

export const HeaderRoot = styled(View)(() => ({
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
}));

export const SettingsIcon = styled(Settings)(({ theme }) => ({
    color: theme.palette.black,
}));
