import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { List } from "react-native-components";

export const NewsList = styled(List)(() => ({
    paddingHorizontal: 16,
    paddingTop: "5%",
}));

export const NewsSpacer = styled(View)(() => ({
    height: 16,
    width: "100%",
}));
