import styled from "@peersyst/react-native-styled";
import { IconButton, Row, Typography } from "react-native-components";

export const NavbarRoot = styled(Row)(() => ({
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 40,
    width: "100%",
}));

export const BackIconRoot = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    left: 0,
    color: theme.palette.mode === "light" ? theme.palette.darkGray2 : theme.palette.text,
    fontSize: 30,
}));

export const Title = styled(Typography, { fontWeight: "bold", textTransform: "uppercase" })(({ theme }) => ({
    color: theme.palette.mode === "light" ? theme.palette.darkGray2 : theme.palette.text,
}));
