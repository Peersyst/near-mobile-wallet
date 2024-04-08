import styled from "@peersyst/react-native-styled";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";

export const SettingsTabsRoot = styled(MainTabs)(({ theme: { palette } }) => ({
    tabGroup: {
        backgroundColor: palette.background,
    },
}));
