import styled from "@peersyst/react-native-styled";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import { ScrollView } from "react-native";

export const BaseTabsScreenScrollView = styled(ScrollView)(({ theme }) => ({
    backgroundColor: theme.palette.gray[100],
    padding: 0,
}));

export const BaseTabs = styled(MainTabs)(({ theme: { palette } }) => ({
    tabGroup: {
        backgroundColor: palette.background,
    },
}));
