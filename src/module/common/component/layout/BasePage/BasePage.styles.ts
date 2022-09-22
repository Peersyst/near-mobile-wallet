import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import Constants from "expo-constants";
import { BasePageContentProps } from "module/common/component/layout/BasePage/BasePage.types";
import { TOOLBAR_HEIGHT } from "module/common/component/layout/Toolbar/Toolbar.styles";

export const BasePageRoot = styled(View)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background,
}));

export const BasePageContent = styled(View)<BasePageContentProps>(({ header }) => ({
    flex: 1,
    paddingTop: header ? Constants.statusBarHeight + TOOLBAR_HEIGHT : Constants.statusBarHeight,
}));
