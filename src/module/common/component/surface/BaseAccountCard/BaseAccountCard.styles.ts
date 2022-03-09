import styled from "@peersyst/react-native-styled";
import { MAIN_SCREEN_PADDING } from "module/main/MainNavigatorGroup";
import { Dimensions } from "react-native";
import Card from "../Card/Card";

export const BaseAccountCardRoot = styled(Card)(() => {
    return {
        width: Dimensions.get("window").width - MAIN_SCREEN_PADDING * 2,
        height: 203,
    };
});
