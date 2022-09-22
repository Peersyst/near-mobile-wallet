import styled from "@peersyst/react-native-styled";
import { Col, Divider } from "@peersyst/react-native-components";

export const CARD_NAVIGATOR_PADDING = 20;

export const CardNavigatorRoot = styled(Col)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopStartRadius: theme.borderRadius,
    borderTopEndRadius: theme.borderRadius,
    backgroundColor: theme.palette.background,
}));

export const CardNavigatorContent = styled(Col)(() => ({
    padding: CARD_NAVIGATOR_PADDING,
}));

export const CardNavigatorDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.overlay["8%"],
    height: 1,
}));
