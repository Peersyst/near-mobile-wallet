import styled from "@peersyst/react-native-styled";
import { BackIcon } from "icons";
import { Text, Pressable } from "react-native";
import { Row } from "react-native-components";

export const NavbarRoot = styled(Row)(() => ({
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
}));

export const BackIconRoot = styled(Pressable)(() => ({
    position: "absolute",
    left: 0,
}));

export const BackStyledIcon = styled(BackIcon)(({ theme }) => ({
    color: theme.palette.darkLightGray2,
    fontSize: 30,
}));

export const Title = styled(Text)(({ theme }) => ({
    color: theme.palette.darkGray2,
    fontSize: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
}));
