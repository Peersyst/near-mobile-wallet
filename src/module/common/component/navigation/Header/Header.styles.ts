import { IconButton, Toolbar } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

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

export const HeaderSettingsButton = styled(IconButton)(({ theme }) => {
    return {
        color: theme.palette.gray[600],
        fontSize: 24,
    };
});
