import styled from "@peersyst/react-native-styled";
import { Animated, Col } from "react-native-components";
import Button from "module/common/component/input/Button/Button";
import PressableText from "module/common/component/base/input/PressableText/PressableText";

export const AnimatedAuthSwitchPageRoot = styled(Animated.createAnimatedComponent.fade(Col, { duration: 200 }), { gap: "7%" })(() => ({
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
