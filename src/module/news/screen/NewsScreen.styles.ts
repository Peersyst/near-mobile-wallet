import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { List } from "@peersyst/react-native-components";

export const NewsList = styled(List)(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
})) as typeof List;

export const NewsSpacer = styled(View)(() => ({
    height: 16,
    width: "100%",
}));
