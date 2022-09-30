import styled from "@peersyst/react-native-styled";
import { Pressable } from "react-native";
import { Icon, Typography } from "@peersyst/react-native-components";
import { LinkItemIconProps, LinkTextProps } from "../BottomBar.types";

export const LinkItemText = styled(Typography, { textAlign: "center" })<LinkTextProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.gray[theme.palette.mode === "light" ? 600 : 900] : theme.palette.overlay["40%"],
}));

export const LinkItemIcon = styled(Icon)<LinkItemIconProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.gray[theme.palette.mode === "light" ? 600 : 900] : theme.palette.overlay["40%"],
    fontSize: 20,
}));

export const BottomBarItemRoot = styled(Pressable)(() => ({
    width: "22%",
}));
