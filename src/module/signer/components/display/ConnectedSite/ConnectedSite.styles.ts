import { Row, Image } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { config } from "refactor/common/config";

export const ConnectedSiteRoot = styled(Row)(() => ({
    height: 100,
    alignItems: "center",
}));

export const ConnectedSiteLogo = styled(Image, { fallback: { uri: config.signerFeature.dAppLogoFallback } })(({ theme }) => ({
    backgroundColor: theme.palette.overlay["8%"],
    borderRadius: theme.borderRadiusSm,
    width: 60,
    aspectRatio: 1,
}));
