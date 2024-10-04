import { ElementStyler } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { View } from "react-native";

export const QuickActionsButtonPrimaryIcon = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.white,
    fontSize: 24,
}));

export const QuickActionsButtonPrimaryIconPositioner = styled(View)(() => ({
    position: "absolute",
    left: 0,
    zIndex: 2,
}));

export const QuickActionsButtonSoftIcon = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.primary,
    fontSize: 24,
}));
