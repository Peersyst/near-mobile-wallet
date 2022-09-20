import styled from "@peersyst/react-native-styled";
import { SettingsIcon } from "icons";
import { Toolbar } from "react-native-components";

export const HeaderRoot = styled(Toolbar)(({ theme }) => {
    return {
        zIndex: theme.zIndex.header,
        backgroundColor: theme.palette.background,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
    };
});

export const HeaderIcon = styled(SettingsIcon)(({ theme }) => {
    return {
        color: theme.palette.slate,
    };
});
