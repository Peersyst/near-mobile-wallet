import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import Constants from "expo-constants";

export const BasePageRoot = styled(View)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background,
    paddingTop: Constants.statusBarHeight,
}));

export const BasePageContent = styled(View)(() => ({
    flex: 1,
}));
