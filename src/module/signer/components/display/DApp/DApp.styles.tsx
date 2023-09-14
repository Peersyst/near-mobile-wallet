import { Image, Typography, Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { ExternalLinkIcon } from "icons";

/**
 * Needed to hide red background from actionable
 */
export const DAppRoot = styled(Col)(({ theme }) => ({
    backgroundColor: theme.palette.background,
    borderRadius: theme.borderRadiusMd,
    padding: 12,
}));

export const DAppLogo = styled(Image)(({ theme }) => ({
    width: 64,
    height: 64,
    borderRadius: theme.borderRadiusSm,
}));

export const DAppTag = styled(Typography)(({ theme }) => ({
    color: theme.palette.blue,
}));

export const DAppLinkIcon = styled(ExternalLinkIcon)(({ theme }) => ({
    fontSize: 16,
    color: theme.palette.gray[300],
}));
