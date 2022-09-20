import styled from "@peersyst/react-native-styled";
import { Pressable } from "react-native";
import { Icon, Typography } from "@peersyst/react-native-components";
import { LinkItemIconProps, LinkTextProps } from "../BottomBar.types";

export const LinkItemText = styled(Typography, { textAlign: "center" })<LinkTextProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.black : theme.palette.darkGray,
    marginTop: -2,
}));

export const LinkItemIcon = styled(Icon)<LinkItemIconProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.black : theme.palette.darkGray,
    fontSize: 27,
}));

export const BottomBarItemRoot = styled(Pressable)(() => ({
    flexDirection: "column",
    height: "100%",
    width: 60,
    alignItems: "center",
    justifyContent: "flex-start",
}));
