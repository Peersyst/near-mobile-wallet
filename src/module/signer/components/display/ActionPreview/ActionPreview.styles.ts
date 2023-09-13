import { ElementStyler, Image, Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";

export const PreviewLogo = styled(Image)(({ theme }) => ({
    width: 76,
    aspectRatio: 1,
    borderRadius: theme.borderRadiusSm,
    backgroundColor: theme.palette.overlay["8%"],
}));

export const ActionPreviewRoot = styled(Row)(() => ({
    paddingVertical: 8,
}));

export const ActionPreviewIcon = styled(ElementStyler)(({ theme }) => ({
    color: theme.palette.overlay["20%"],
    fontSize: 32,
}));
