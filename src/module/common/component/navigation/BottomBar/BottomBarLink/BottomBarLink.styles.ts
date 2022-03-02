import styled from "@peersyst/react-native-styled";
import { Pressable } from "react-native";
import { Icon, Typography } from "react-native-components";
import { LinkIconProps, LinkTextProps } from "../BottomBar.types";

export const LinkText = styled(Typography, { textAlign: "center" })<LinkTextProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.black : theme.palette.darkGray,
}))

export const LinkIcon = styled(Icon)<LinkIconProps>(({ theme, isActive }) => ({
    color: isActive ? theme.palette.black : theme.palette.darkGray,
    fontSize: 24,
}));

export const BottomBarLinkRoot = styled(Pressable)(() => ({
    flexDirection: "column",
    height: "100%",
    width: 60,
    alignItems: "center",
}))