import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";
import { View } from "react-native";

export const MainNavigatorRoot = styled(View)(() => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
}));

export const MainNavigatorContent = styled(Col)(() => ({
    paddingBottom: 40,
    paddingHorizontal: 20,
}));
