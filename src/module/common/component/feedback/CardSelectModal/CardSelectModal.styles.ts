import { IconButton, Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { NARVAR_HEIGHT } from "../../navigation/Navbar/Navbar.styles";

export const CardSelectModalNavbar = styled(Row)(() => ({
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: NARVAR_HEIGHT,
    padding: 20,
}));

export const ChevronUpIconRoot = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: 20,
    color: theme.palette.gray[theme.palette.mode === "light" ? "600" : "900"],
}));
