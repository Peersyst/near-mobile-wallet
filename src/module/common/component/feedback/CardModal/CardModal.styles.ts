import styled from "@peersyst/react-native-styled";
import { Col } from "@peersyst/react-native-components";
import { KeyboardAvoidingView } from "react-native";

export const CARD_MODAL_PADDING = 20;

export const CardModalContent = styled(KeyboardAvoidingView)(({ theme, dimensions }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: dimensions.height * 0.9,
    borderTopStartRadius: theme.borderRadius,
    borderTopEndRadius: theme.borderRadius,
    backgroundColor: theme.palette.background,
}));

export const CardModalWrapper = styled(Col)(() => ({
    height: "100%",
}));

export const CardModalBodyWrapper = styled(Col)(({ safeAreaInsets }) => ({
    padding: CARD_MODAL_PADDING,
    paddingBottom: safeAreaInsets.bottom + CARD_MODAL_PADDING,
}));
