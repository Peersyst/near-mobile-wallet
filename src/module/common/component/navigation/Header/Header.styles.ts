import styled from "@peersyst/react-native-styled";
import { Paper, Toolbar } from "react-native-components";
import Constants from "expo-constants";
export const HEADER_PADDING_BOTTOM = 12;
export const HeaderRoot = styled(Paper)(({ theme }) => {
    return {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: HEADER_PADDING_BOTTOM,
        zIndex: theme.zIndex.header,
        backgroundColor: theme.palette.black,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    };
});
export const HeaderToolbar = styled(Toolbar)(({ theme }) => {
    return {
        backgroundColor: theme.palette.black,
    };
});
