import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { BaseBottomBarScreenRootProps } from "./BaseBottomBarScreen.types";
import Constants from "expo-constants";
import { TOOLBAR_HEIGHT } from "../Toolbar/Toolbar.styles";

export const BaseBottomBarScreenRoot = styled(View)<BaseBottomBarScreenRootProps>(({ watchStatusBar, header }) => {
    const statusBarHeight = watchStatusBar ? Constants.statusBarHeight : 0;

    return {
        flex: 1,
        paddingTop: header ? statusBarHeight + TOOLBAR_HEIGHT : statusBarHeight,
    };
});
