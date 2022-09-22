import styled from "@peersyst/react-native-styled";
import { Pressable } from "react-native";
import { Icon, Typography } from "@peersyst/react-native-components";
import { LinkItemIconProps, LinkTextProps } from "../BottomBar.types";

export const LinkItemText = styled(Typography, { textAlign: "center" })<LinkTextProps>(({ theme, isActive }) => ({
    color: theme.palette.gray[isActive ? 600 : 300],
}));

export const LinkItemIcon = styled(Icon)<LinkItemIconProps>(({ theme, isActive }) => ({
    color: theme.palette.gray[isActive ? 600 : 300],
    fontSize: 20,
}));

export const BottomBarItemRoot = styled(Pressable)(() => ({
    width: 56,
}));
