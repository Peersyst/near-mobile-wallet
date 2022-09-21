import styled from "@peersyst/react-native-styled";
import { Pressable } from "react-native";
import { Icon, Typography } from "react-native-components";
import { LinkItemIconProps, LinkTextProps } from "../BottomBar.types";

export const LinkItemText = styled(Typography, { textAlign: "center" })<LinkTextProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.slate : theme.palette.gray,
}));

export const LinkItemIcon = styled(Icon)<LinkItemIconProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.slate : theme.palette.gray,
    fontSize: 20,
}));

export const BottomBarItemRoot = styled(Pressable)(() => ({
    flexDirection: "column",
    backgroundColor: "#fff",
    width: 60,
    alignItems: "center",
}));
