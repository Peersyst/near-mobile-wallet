import styled from "@peersyst/react-native-styled";
import { TabIndicatorStyles } from "./TabIndicator.types";
import { View } from "react-native";

export const TabIndicatorRoot = styled(View)<TabIndicatorStyles>(({ theme, position, width }) => ({
    position: "absolute",
    left: position,
    bottom: 0,
    zIndex: 2,
    height: 2,
    width,
    backgroundColor: theme.palette.primary,
}));
