import { Row, Image } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { config } from "config";
import { ExternalLinkIcon, OptionsIcon } from "icons";

export const FavouriteDAppRoot = styled(Row)(() => ({
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    columnGap: 8,
}));

export const FavouriteDAppLinkIcon = styled(ExternalLinkIcon)(({ theme }) => ({
    color: theme.palette.gray[300],
}));

export const FavouriteDAppOptionsIcon = styled(OptionsIcon)(({ theme }) => ({
    color: theme.palette.gray[300],
}));

export const FavouriteDAppLogo = styled(Image, { fallback: { uri: config.signerFeature.dAppLogoFallback } })(({ theme }) => ({
    backgroundColor: theme.palette.overlay["8%"],
    borderRadius: theme.borderRadiusMd,
    width: 56,
    aspectRatio: 1,
}));
