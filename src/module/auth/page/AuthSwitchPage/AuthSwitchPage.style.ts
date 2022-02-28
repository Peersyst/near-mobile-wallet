import styled from "@peersyst/react-native-styled";
import { Col, Typography } from "react-native-components";
import Button from "module/common/component/input/Button/Button";
import { TouchableTextProps } from "./AuthSwitchPage";

export const AuthSwitchPageRoot = styled(Col, { gap: "7%" })(() => ({
    paddingHorizontal: "7.5%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10%"
}));

export const ImportRoot = styled(Col)(() => ({}));

export const CreatWalletButton = styled(Button, { variant: "outlined", appearance: "light", fullWidth: true })(() => ({
    textTransform: "uppercase",
    width: "100%",
}));

export const InfoText = styled(Typography)(() => ({
    textAlign: "center",
}));

export const TouchableText = styled(Typography)<TouchableTextProps>(({pressed}) => ({
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: pressed ? "underline" : undefined,
}))