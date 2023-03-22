import styled from "@peersyst/react-native-styled";
import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import { View } from "react-native";

export const DarkChangeNetworkModalOverlay = styled(View)(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.altOverlay["80%"] : "transparent",
}));

export const ChangeNetworkModalRoot = styled(GradientPage, { gradient: true })(() => ({
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
}));
