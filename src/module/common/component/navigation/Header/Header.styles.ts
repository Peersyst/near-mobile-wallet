import { IconButton, Toolbar } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const HeaderRoot = styled(Toolbar)(({ theme, safeAreaInsets }) => {
    return {
        zIndex: theme.zIndex.header,
        backgroundColor: theme.palette.background,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        marginTop: safeAreaInsets.top,
    };
});

export const HeaderSettingsButton = styled(IconButton)(({ theme }) => {
    const light = theme.palette.mode === "light";
    return {
        color: theme.palette.gray[light ? 600 : 900],
        fontSize: 24,
    };
});
