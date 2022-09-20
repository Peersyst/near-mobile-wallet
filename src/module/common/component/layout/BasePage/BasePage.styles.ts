import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import Constants from "expo-constants";
import { BasePageContentProps } from "module/common/component/layout/BasePage/BasePage.types";

export const BasePageRoot = styled(View)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background,
}));

export const BasePageContent = styled(View)<BasePageContentProps>(({ theme, header }) => ({
    flex: 1,
    paddingTop: header ? Constants.statusBarHeight + theme.toolbarHeight : Constants.statusBarHeight,
}));
