import styled from "@peersyst/react-native-styled";
import { IconButton, Row } from "@peersyst/react-native-components";
import { NavbarAlign } from "./Navbar.types";

export const NARVAR_HEIGHT = 64;

export const NavbarRoot = styled(Row)<{ align: NavbarAlign }>(({ theme, align }) => ({
    width: "100%",
    alignItems: "center",
    justifyContent: align === "center" ? "center" : "flex-start",
    position: "relative",
    minHeight: NARVAR_HEIGHT,
    padding: 20,
    paddingLeft: align === "center" ? 0 : 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.component.navbar.borderColor,
}));

export const BackIconRoot = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    left: 20,
    color: theme.palette.gray[theme.palette.mode === "light" ? "600" : "900"],
}));
