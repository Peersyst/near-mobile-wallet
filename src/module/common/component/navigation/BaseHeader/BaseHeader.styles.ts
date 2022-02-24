import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { SettingsIcon as Settings } from "icons";
import { getTextColor } from "utils/getTextColor";

export const BaseHeaderRoot = styled(View)(({ theme }) => ({
    width: "100%",
    height: 37,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    ...theme.shadows[7],
}));

export const SettingsIcon = styled(Settings)(({ theme }) => {
    const color = getTextColor(theme);
    return {
        color: color,
    };
});
