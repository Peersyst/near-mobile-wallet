import styled from "@peersyst/react-native-styled";
import { Col } from "react-native-components";
import Button from "module/common/component/input/Button/Button";
import PressableText from "module/common/component/base/input/PressableText/PressableText";

export const AuthSwitchPageRoot = styled(Col, { gap: "7%" })(() => ({
    paddingHorizontal: "7.5%",
    paddingBottom: "10%",
}));

export const CreatWalletButton = styled(Button, { variant: "outlined", appearance: "light", fullWidth: true })(() => ({
    textTransform: "uppercase",
}));

export const TouchableText = styled(PressableText)(() => ({
    fontWeight: "bold",
}));
