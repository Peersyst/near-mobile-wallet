import styled from "@peersyst/react-native-styled";
import { IconButton, Row } from "@peersyst/react-native-components";
import { NavbarPositionProps } from "./Navbar.types";

export const NARVAR_HEIGHT = 64;

export const NavbarRoot = styled(Row)<NavbarPositionProps>(({ theme, titlePosition }) => ({
    width: "100%",
    alignItems: "center",
    justifyContent: titlePosition === "center" ? "center" : "flex-start",
    position: "relative",
    minHeight: NARVAR_HEIGHT,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.component.navbar.borderColor,
    columnGap: 6,
}));

export const BackIconRoot = styled(IconButton)<NavbarPositionProps>(({ theme, titlePosition }) => ({
    ...(titlePosition === "center" && {
        position: "absolute",
        left: 20,
        zIndex: 1,
    }),
    color: theme.palette.gray[theme.palette.mode === "light" ? "600" : "900"],
}));

export const NavbarContent = styled(Row)<NavbarPositionProps>(({ titlePosition }) => ({
    justifyContent: titlePosition === "left" ? "flex-start" : "center",
    flex: 1,
}));
