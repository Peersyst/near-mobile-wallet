import styled from "@peersyst/react-native-styled";
import { Col, Divider, Row } from "@peersyst/react-native-components";
import { NavBarHeight } from "../Navbar/Navbar.styles";

export const MainNavHPadding = "3%";

export const MainNavigatorRoot = styled(Col)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopStartRadius: theme.borderRadius,
    borderTopEndRadius: theme.borderRadius,
    backgroundColor: theme.palette.background,
}));

export const MainNavigatorNavWrapper = styled(Row)(() => ({
    paddingVertical: (90 - NavBarHeight) / 2,
    paddingHorizontal: MainNavHPadding,
}));

export const MainNavigatorContent = styled(Col)(() => ({
    paddingBottom: 20,
    paddingHorizontal: MainNavHPadding,
}));

export const MainNavigatorDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.overlay["8%"],
    height: 1,
}));
