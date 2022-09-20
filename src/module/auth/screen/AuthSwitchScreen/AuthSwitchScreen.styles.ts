import styled from "@peersyst/react-native-styled";
import { Animated, Col } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { PressableText } from "@peersyst/react-native-components";

export const AnimatedAuthSwitchScreenRoot = styled(Animated.createAnimatedComponent.fade(Col, { duration: 200 }), { gap: "7%" })(() => ({
    flex: 1,
    paddingHorizontal: "7.5%",
    justifyContent: "flex-end",
    paddingBottom: "10%",
}));

export const CreatWalletButton = styled(Button, { variant: "outlined", appearance: "light", fullWidth: true })(() => ({
    textTransform: "uppercase",
}));

export const TouchableText = styled(PressableText)(() => ({
    fontWeight: "bold",
}));
