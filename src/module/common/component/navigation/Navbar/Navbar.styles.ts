import styled from "@peersyst/react-native-styled";
import { IconButton, Row } from "@peersyst/react-native-components";
import { NavbarRootProps } from "./Navbar.types";

export const NARVAR_HEIGHT = 64;

export const NavbarRoot = styled(Row)<NavbarRootProps>(({ theme, titlePosition }) => ({
    width: "100%",
    alignItems: "center",
    justifyContent: titlePosition === "center" ? "center" : "flex-start",
    position: "relative",
    minHeight: NARVAR_HEIGHT,
    padding: 20,
    paddingLeft: titlePosition === "center" ? 0 : 30,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.component.navbar.borderColor,
}));

export const BackIconRoot = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    left: 20,
    color: theme.palette.gray[theme.palette.mode === "light" ? "600" : "900"],
}));
