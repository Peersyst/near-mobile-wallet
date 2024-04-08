import styled from "@peersyst/react-native-styled";
import { ScrollView } from "react-native";

export const BaseTabsScreenScrollView = styled(ScrollView)(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
    padding: 0,
}));
